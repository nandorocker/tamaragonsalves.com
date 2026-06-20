import type { APIRoute } from "astro";
import { Resend } from "resend";
import articlesData from "../../data/articles.json";
import enArticles from "../../i18n/en/articles.json";
import ptArticles from "../../i18n/pt/articles.json";
import {
  buildDownloadCookie,
  buildDownloadEmail,
  buildPreferencesUpdatedEmail,
  buildVerifyDownloadUrl,
  downloadCookieMaxAgeSeconds,
  signDownloadToken,
  tokenStorageHash,
  type DownloadLanguage,
} from "../../lib/download-gate";
import {
  createDownloadToken,
  createSubscriber,
  ensureDownloadSchema,
  findSubscriberByEmail,
  updateSubscriberPreferences,
} from "../../lib/download-db";

export const prerender = false;

const cookieName = "tg_download_gate";

function json(body: Record<string, unknown>, status = 200, headersInit?: HeadersInit) {
  const headers = new Headers(headersInit);
  headers.set("Content-Type", "application/json");
  return new Response(JSON.stringify(body), { status, headers });
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizeLang(lang: unknown): DownloadLanguage {
  return lang === "pt" ? "pt" : "en";
}

function getArticleTitle(articleId: string, lang: DownloadLanguage): string {
  const translations = lang === "pt" ? ptArticles : enArticles;
  return translations[articleId as keyof typeof translations]?.title ?? "Publication";
}

function getRequiredEnv() {
  const resendApiKey = (import.meta as any).env?.RESEND_API_KEY || process.env?.RESEND_API_KEY;
  const cookieSecret = (import.meta as any).env?.DOWNLOAD_COOKIE_SECRET || process.env?.DOWNLOAD_COOKIE_SECRET;
  if (!resendApiKey || !cookieSecret) return null;
  return { resendApiKey, cookieSecret };
}

function buildCookieHeader(value: string, requestUrl: URL): string {
  const secure = requestUrl.protocol === "https:" ? "; Secure" : "";
  return `${cookieName}=${value}; Max-Age=${downloadCookieMaxAgeSeconds}; Path=/; HttpOnly; SameSite=Lax${secure}`;
}

async function sendEmail(resend: Resend, input: { to: string; subject: string; html: string }) {
  const result = await resend.emails.send({
    from: "Tamara Amoroso Gonsalves <info@tamaragonsalves.com>",
    to: input.to,
    subject: input.subject,
    html: input.html,
  });
  if (result.error) throw result.error;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
    const articleId = typeof body.articleId === "string" ? body.articleId : "";
    const acceptPrivacy = Boolean(body.acceptPrivacy);
    const acceptsUpdates = Boolean(body.acceptUpdates);
    const preferredLang = normalizeLang(body.lang);

    if (!email) return json({ error: "Email is required." }, 400);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return json({ error: "Please enter a valid email address." }, 400);
    if (!acceptPrivacy) return json({ error: "You must accept the privacy policy and terms." }, 400);
    if (!articleId) return json({ error: "Article ID is required." }, 400);

    const article = articlesData.find((a) => a.id === articleId);
    if (!article?.file) return json({ error: "Article not found or no file available." }, 404);

    const env = getRequiredEnv();
    if (!env) {
      console.error("RESEND_API_KEY or DOWNLOAD_COOKIE_SECRET is not set");
      return json({ error: "Download service is not configured." }, 500);
    }

    await ensureDownloadSchema();

    const resend = new Resend(env.resendApiKey);
    const existingSubscriber = await findSubscriberByEmail(email);

    if (existingSubscriber?.verified_at) {
      const preferenceChanged =
        existingSubscriber.preferred_lang !== preferredLang ||
        existingSubscriber.accepts_updates !== acceptsUpdates;

      if (preferenceChanged) {
        await updateSubscriberPreferences(existingSubscriber.id, { preferredLang, acceptsUpdates });
        const changes: { preferredLang?: { from: "en" | "pt"; to: "en" | "pt" }; acceptsUpdates?: { from: boolean; to: boolean } } = {};
        if (existingSubscriber.preferred_lang !== preferredLang) {
          changes.preferredLang = { from: existingSubscriber.preferred_lang, to: preferredLang };
        }
        if (existingSubscriber.accepts_updates !== acceptsUpdates) {
          changes.acceptsUpdates = { from: existingSubscriber.accepts_updates, to: acceptsUpdates };
        }
        const preferencesEmail = buildPreferencesUpdatedEmail(preferredLang, changes);
        await sendEmail(resend, { to: email, ...preferencesEmail });
      }

      const cookie = await buildDownloadCookie(email, env.cookieSecret);
      const headers = new Headers();
      headers.append("Set-Cookie", buildCookieHeader(cookie, new URL(request.url)));
      return json(
        { success: true, redirectUrl: `/api/download?articleId=${encodeURIComponent(articleId)}` },
        200,
        headers,
      );
    }

    const subscriber = existingSubscriber
      ? await updateSubscriberPreferences(existingSubscriber.id, { preferredLang, acceptsUpdates })
      : await createSubscriber({ email, preferredLang, acceptsUpdates });

    const now = new Date();
    const expiresAt = new Date(now.getTime() + downloadCookieMaxAgeSeconds * 1000);
    const token = await signDownloadToken(
      {
        subscriberId: subscriber.id,
        articleId,
        lang: preferredLang,
        exp: Math.floor(expiresAt.getTime() / 1000),
      },
      env.cookieSecret,
    );

    await createDownloadToken({
      subscriberId: subscriber.id,
      tokenHash: tokenStorageHash(token),
      articleId,
      redirectPath: `/${preferredLang}/publications?download=${encodeURIComponent(articleId)}`,
      expiresAt,
    });

    const confirmUrl = buildVerifyDownloadUrl(token, request.url);
    const confirmationEmail = buildDownloadEmail({
      lang: preferredLang,
      articleTitle: getArticleTitle(articleId, preferredLang),
      confirmUrl,
      hasDownloadContext: true,
    });
    await sendEmail(resend, { to: email, ...confirmationEmail });

    return json({ success: true, confirmationRequired: true });
  } catch (err) {
    console.error("Request error:", err);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
};
