import { describe, expect, test } from "bun:test";
import {
  buildDownloadCookie,
  buildDownloadEmail,
  buildPreferencesUpdatedEmail,
  signDownloadToken,
  verifyDownloadGateCookie,
  verifyDownloadCookie,
  verifyDownloadToken,
} from "../src/lib/download-gate";

const secret = "test-secret-with-enough-entropy";

describe("download gate tokens", () => {
  test("verifies a signed token payload", async () => {
    const token = await signDownloadToken({ subscriberId: "sub_1", articleId: "8" }, secret);

    const payload = await verifyDownloadToken(token, secret);

    expect(payload?.subscriberId).toBe("sub_1");
    expect(payload?.articleId).toBe("8");
  });

  test("rejects a tampered token", async () => {
    const token = await signDownloadToken({ subscriberId: "sub_1", articleId: "8" }, secret);

    const payload = await verifyDownloadToken(`${token}x`, secret);

    expect(payload).toBeNull();
  });
});

describe("download gate cookie", () => {
  test("accepts a fresh signed cookie for the same email", async () => {
    const now = new Date("2026-06-19T12:00:00Z");
    const cookie = await buildDownloadCookie("reader@example.com", secret, now);

    const valid = await verifyDownloadCookie(cookie, "reader@example.com", secret, now);

    expect(valid).toBe(true);
  });

  test("rejects an expired cookie", async () => {
    const issuedAt = new Date("2026-06-19T12:00:00Z");
    const afterExpiry = new Date("2026-06-22T12:00:00Z");
    const cookie = await buildDownloadCookie("reader@example.com", secret, issuedAt);

    const valid = await verifyDownloadCookie(cookie, "reader@example.com", secret, afterExpiry);

    expect(valid).toBe(false);
  });

  test("returns the payload for a fresh gate cookie", async () => {
    const now = new Date("2026-06-19T12:00:00Z");
    const cookie = await buildDownloadCookie("reader@example.com", secret, now);

    const payload = await verifyDownloadGateCookie(cookie, secret, now);

    expect(payload?.emailHash).toBeString();
    expect(payload?.exp).toBeGreaterThan(Math.floor(now.getTime() / 1000));
  });
});

describe("download emails", () => {
  test("builds a Portuguese confirm-and-download email", () => {
    const email = buildDownloadEmail({
      lang: "pt",
      articleTitle: "Aborto e Religião",
      confirmUrl: "https://example.com/api/verify-download?token=abc",
      hasDownloadContext: true,
    });

    expect(email.subject).toBe("Confirme seu email para baixar seu trecho");
    expect(email.html).toContain("Tamara Amoroso Gonsalves");
    expect(email.html).toContain("Confirmar email e baixar trecho");
    expect(email.html).toContain("Aborto e Religião");
    expect(email.html).toContain("border: 2px solid #be185d");
    expect(email.html).not.toContain("#4a2083");
  });

  test("builds a generic English confirmation email without download copy", () => {
    const email = buildDownloadEmail({
      lang: "en",
      articleTitle: null,
      confirmUrl: "https://example.com/api/verify-download?token=abc",
      hasDownloadContext: false,
    });

    expect(email.subject).toBe("Confirm your email");
    expect(email.html).toContain("Confirm email");
    expect(email.html).not.toContain("download the excerpt");
  });

  test("builds localized preferences updated email", () => {
    const email = buildPreferencesUpdatedEmail("pt", {
      preferredLang: { from: "en", to: "pt" },
      acceptsUpdates: { from: false, to: true },
    });

    expect(email.subject).toBe("Suas preferências foram atualizadas");
    expect(email.html).toContain("Tamara Amoroso Gonsalves");
    expect(email.html).toContain("foram atualizadas");
    expect(email.html).toContain("Idioma");
    expect(email.html).toContain("Atualizações por email");
    expect(email.html).toContain("entre em contato conosco");
    expect(email.html).toContain('href="mailto:info@tamaragonsalves.com"');
    expect(email.html).toContain("de <strong>Inglês</strong> para <strong>Português</strong>");
    expect(email.html).toContain("de <strong>desativado</strong> para <strong>ativado</strong>");
    expect(email.html).not.toContain(">info@tamaragonsalves.com<");
  });

  test("preferences email lists what changed in English", () => {
    const email = buildPreferencesUpdatedEmail("en", {
      preferredLang: { from: "pt", to: "en" },
      acceptsUpdates: { from: true, to: false },
    });

    expect(email.subject).toBe("Your preferences have been updated");
    expect(email.html).toContain("Language");
    expect(email.html).toContain("Email updates");
    expect(email.html).toContain("from <strong>Portuguese</strong> to <strong>English</strong>");
    expect(email.html).toContain("from <strong>enabled</strong> to <strong>disabled</strong>");
    expect(email.html).toContain('href="mailto:info@tamaragonsalves.com"');
    expect(email.html).toContain("contact us");
    expect(email.html).not.toContain(">info@tamaragonsalves.com<");
  });

  test("preferences email only lists changed fields", () => {
    const email = buildPreferencesUpdatedEmail("en", {
      acceptsUpdates: { from: false, to: true },
    });

    expect(email.html).toContain("Email updates");
    expect(email.html).not.toContain("from <strong>English</strong> to <strong>English</strong>");
    expect(email.html).not.toContain(">Language<");
  });
});
