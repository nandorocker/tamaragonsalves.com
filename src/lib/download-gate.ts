import { createHmac, createHash, timingSafeEqual } from "node:crypto";

export type DownloadLanguage = "en" | "pt";

type SignedPayload = Record<string, unknown>;

type DownloadEmailInput = {
  lang: DownloadLanguage;
  articleTitle: string | null;
  confirmUrl: string;
  hasDownloadContext: boolean;
};

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 48;

function base64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

function fromBase64url(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  return aBuffer.length === bBuffer.length && timingSafeEqual(aBuffer, bBuffer);
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function hashEmail(email: string): string {
  return createHash("sha256").update(normalizeEmail(email)).digest("hex");
}

export async function signDownloadToken(payload: SignedPayload, secret: string): Promise<string> {
  const encodedPayload = base64url(JSON.stringify(payload));
  return `${encodedPayload}.${sign(encodedPayload, secret)}`;
}

export async function verifyDownloadToken<T extends SignedPayload>(token: string, secret: string): Promise<T | null> {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expected = sign(encodedPayload, secret);
  if (!safeEqual(signature, expected)) return null;

  try {
    return JSON.parse(fromBase64url(encodedPayload)) as T;
  } catch {
    return null;
  }
}

export async function buildDownloadCookie(email: string, secret: string, now = new Date()): Promise<string> {
  const exp = Math.floor(now.getTime() / 1000) + COOKIE_MAX_AGE_SECONDS;
  return signDownloadToken({ emailHash: hashEmail(email), exp }, secret);
}

export function tokenStorageHash(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function verifyDownloadGateCookie(cookie: string, secret: string, now = new Date()): Promise<{ emailHash: string; exp: number } | null> {
  const payload = await verifyDownloadToken<{ emailHash?: string; exp?: number }>(cookie, secret);
  if (!payload?.emailHash || !payload.exp) return null;
  if (payload.exp <= Math.floor(now.getTime() / 1000)) return null;
  return { emailHash: payload.emailHash, exp: payload.exp };
}

export async function verifyDownloadCookie(cookie: string, email: string, secret: string, now = new Date()): Promise<boolean> {
  const payload = await verifyDownloadGateCookie(cookie, secret, now);
  if (!payload) return false;
  return payload.emailHash === hashEmail(email);
}

function templateShell(lang: DownloadLanguage, body: string): string {
  const preview = lang === "pt" ? "Tamara Amoroso Gonsalves" : "Tamara Amoroso Gonsalves";
  return `
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preview}</div>
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px 20px; color: #374151;">
      <header style="border-bottom: 1px solid #f3d4df; padding-bottom: 18px; margin-bottom: 24px;">
        <div style="font-size: 24px; line-height: 1.2; font-weight: 700; color: #be185d;">Tamara Amoroso Gonsalves</div>
      </header>
      ${body}
    </div>
  `;
}

function outlineButton(label: string, href: string): string {
  return `
    <p style="margin: 28px 0;">
      <a href="${href}" style="display: inline-block; background: transparent; border: 2px solid #be185d; color: #be185d; padding: 12px 22px; border-radius: 10px; font-weight: 700; text-decoration: none;">${label}</a>
    </p>
  `;
}

export function buildDownloadEmail(input: DownloadEmailInput): { subject: string; html: string } {
  const isPortuguese = input.lang === "pt";
  const subject = input.hasDownloadContext
    ? isPortuguese
      ? "Confirme seu email para baixar seu trecho"
      : "Confirm your email to download your excerpt"
    : isPortuguese
      ? "Confirme seu email"
      : "Confirm your email";

  const heading = isPortuguese ? "Confirme seu email" : "Confirm your email";
  const message = input.hasDownloadContext
    ? isPortuguese
      ? `Obrigada por se cadastrar. Confirme seu email para continuar. Depois da confirmação, você será redirecionado para baixar o trecho solicitado.<br><strong>${input.articleTitle ?? ""}</strong>`
      : `Thank you for signing up. Please confirm your email to continue. After confirming, you'll be redirected to download the excerpt you requested.<br><strong>${input.articleTitle ?? ""}</strong>`
    : isPortuguese
      ? "Obrigada por se cadastrar. Confirme seu email para continuar."
      : "Thank you for signing up. Please confirm your email to continue.";
  const buttonLabel = input.hasDownloadContext
    ? isPortuguese
      ? "Confirmar email e baixar trecho"
      : "Confirm email and download excerpt"
    : isPortuguese
      ? "Confirmar email"
      : "Confirm email";

  return {
    subject,
    html: templateShell(input.lang, `
      <h1 style="font-size: 22px; line-height: 1.3; margin: 0 0 12px; color: #111827;">${heading}</h1>
      <p style="font-size: 16px; line-height: 1.65; margin: 0;">${message}</p>
      ${outlineButton(buttonLabel, input.confirmUrl)}
      <p style="font-size: 13px; line-height: 1.6; color: #6b7280; margin-top: 28px; border-top: 1px solid #f3f4f6; padding-top: 16px;">${isPortuguese ? "Se você não solicitou este email, pode ignorá-lo." : "If you did not request this email, you can ignore it."}</p>
    `),
  };
}

type PreferenceChange<T> = { from: T; to: T };

type PreferencesUpdatedInput = {
  preferredLang?: PreferenceChange<DownloadLanguage>;
  acceptsUpdates?: PreferenceChange<boolean>;
};

const CONTACT_EMAIL = "info@tamaragonsalves.com";

function langLabel(value: DownloadLanguage, lang: DownloadLanguage): string {
  const inPortuguese = lang === "pt";
  if (value === "pt") return inPortuguese ? "Português" : "Portuguese";
  return inPortuguese ? "Inglês" : "English";
}

function boolLabel(value: boolean, lang: DownloadLanguage): string {
  const inPortuguese = lang === "pt";
  if (value) return inPortuguese ? "ativado" : "enabled";
  return inPortuguese ? "desativado" : "disabled";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildPreferencesList(input: PreferencesUpdatedInput, lang: DownloadLanguage): string {
  const isPortuguese = lang === "pt";
  const fromWord = isPortuguese ? "de" : "from";
  const toWord = isPortuguese ? "para" : "to";
  const items: string[] = [];

  if (input.preferredLang) {
    const label = isPortuguese ? "Idioma" : "Language";
    const from = langLabel(input.preferredLang.from, lang);
    const to = langLabel(input.preferredLang.to, lang);
    items.push(
      `<li style="margin: 0 0 8px;"><strong>${escapeHtml(label)}:</strong> ${fromWord} <strong>${escapeHtml(from)}</strong> ${toWord} <strong>${escapeHtml(to)}</strong></li>`,
    );
  }

  if (input.acceptsUpdates) {
    const label = isPortuguese ? "Atualizações por email" : "Email updates";
    const from = boolLabel(input.acceptsUpdates.from, lang);
    const to = boolLabel(input.acceptsUpdates.to, lang);
    items.push(
      `<li style="margin: 0 0 8px;"><strong>${escapeHtml(label)}:</strong> ${fromWord} <strong>${escapeHtml(from)}</strong> ${toWord} <strong>${escapeHtml(to)}</strong></li>`,
    );
  }

  if (items.length === 0) {
    return "";
  }

  return `<ul style="margin: 16px 0 24px; padding-left: 20px; font-size: 16px; line-height: 1.65;">${items.join("")}</ul>`;
}

export function buildPreferencesUpdatedEmail(lang: DownloadLanguage, changes: PreferencesUpdatedInput = {}): { subject: string; html: string } {
  const isPortuguese = lang === "pt";
  const changesList = buildPreferencesList(changes, lang);
  const intro = isPortuguese
    ? "Suas preferências para Tamara Amoroso Gonsalves foram atualizadas:"
    : "Your preferences for Tamara Amoroso Gonsalves have been updated:";
  const contactLabel = isPortuguese ? "entre em contato conosco" : "contact us";
  const contactLine = isPortuguese
    ? `Se você não solicitou esta alteração, <a href="mailto:${CONTACT_EMAIL}" style="color: #be185d; text-decoration: underline;">${contactLabel}</a>.`
    : `If you did not request this change, please <a href="mailto:${CONTACT_EMAIL}" style="color: #be185d; text-decoration: underline;">${contactLabel}</a>.`;

  return {
    subject: isPortuguese ? "Suas preferências foram atualizadas" : "Your preferences have been updated",
    html: templateShell(lang, `
      <h1 style="font-size: 22px; line-height: 1.3; margin: 0 0 12px; color: #111827;">${isPortuguese ? "Preferências atualizadas" : "Preferences updated"}</h1>
      <p style="font-size: 16px; line-height: 1.65; margin: 0;">${intro}</p>
      ${changesList}
      <p style="font-size: 16px; line-height: 1.65; margin: 0;">${contactLine}</p>
    `),
  };
}

export function getEnvSiteUrl(): string | undefined {
  const raw =
    (typeof process !== "undefined" && process.env?.SITE_URL) ||
    (typeof import.meta !== "undefined" && (import.meta as any).env?.SITE_URL);
  if (typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  return trimmed ? trimmed.replace(/\/+$/, "") : undefined;
}

export function buildVerifyDownloadUrl(token: string, requestUrl: URL | string): string {
  const origin = getEnvSiteUrl() || new URL(requestUrl).origin;
  return new URL(`/api/verify-download?token=${encodeURIComponent(token)}`, `${origin}/`).toString();
}

export const downloadCookieMaxAgeSeconds = COOKIE_MAX_AGE_SECONDS;
