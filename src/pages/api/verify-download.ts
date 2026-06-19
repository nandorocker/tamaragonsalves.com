import type { APIRoute } from "astro";
import {
  buildDownloadCookie,
  downloadCookieMaxAgeSeconds,
  tokenStorageHash,
  verifyDownloadToken,
} from "../../lib/download-gate";
import {
  ensureDownloadSchema,
  findSubscriberById,
  findUsableDownloadToken,
  markDownloadTokenUsed,
  markSubscriberVerified,
} from "../../lib/download-db";

export const prerender = false;

const cookieName = "tg_download_gate";

function redirect(location: string, status = 302, headersInit?: HeadersInit) {
  const headers = new Headers(headersInit);
  headers.set("Location", location);
  return new Response(null, { status, headers });
}

function buildCookieHeader(value: string, requestUrl: URL): string {
  const secure = requestUrl.protocol === "https:" ? "; Secure" : "";
  return `${cookieName}=${value}; Max-Age=${downloadCookieMaxAgeSeconds}; Path=/; HttpOnly; SameSite=Lax${secure}`;
}

export const GET: APIRoute = async ({ request }) => {
  const requestUrl = new URL(request.url);
  const token = requestUrl.searchParams.get("token");
  const cookieSecret = (import.meta as any).env?.DOWNLOAD_COOKIE_SECRET || process.env?.DOWNLOAD_COOKIE_SECRET;

  if (!token || !cookieSecret) return redirect("/en/publications?download=invalid");

  await ensureDownloadSchema();

  const payload = await verifyDownloadToken<{ subscriberId?: string; articleId?: string; lang?: "en" | "pt"; exp?: number }>(
    token,
    cookieSecret,
  );

  if (!payload?.subscriberId || !payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) {
    return redirect("/en/publications?download=invalid");
  }

  const storedToken = await findUsableDownloadToken(tokenStorageHash(token));
  if (!storedToken) return redirect(`/${payload.lang ?? "en"}/publications?download=expired`);

  const subscriber = await findSubscriberById(payload.subscriberId);
  if (!subscriber) return redirect(`/${payload.lang ?? "en"}/publications?download=invalid`);

  await markSubscriberVerified(subscriber.id);
  await markDownloadTokenUsed(storedToken.id);

  const cookie = await buildDownloadCookie(subscriber.email, cookieSecret);
  const redirectPath = storedToken.redirect_path ?? `/${payload.lang ?? "en"}/publications`;

  const headers = new Headers();
  headers.append("Set-Cookie", buildCookieHeader(cookie, requestUrl));
  return redirect(redirectPath, 302, headers);
};
