import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { GET } from "../src/pages/api/download";
import { buildDownloadCookie } from "../src/lib/download-gate";

const originalSecret = process.env.DOWNLOAD_COOKIE_SECRET;
const originalNodeEnv = process.env.NODE_ENV;

beforeAll(() => {
  process.env.DOWNLOAD_COOKIE_SECRET = "test-secret-with-enough-entropy";
  process.env.NODE_ENV = "development";
});

afterAll(() => {
  if (originalSecret === undefined) {
    delete process.env.DOWNLOAD_COOKIE_SECRET;
  } else {
    process.env.DOWNLOAD_COOKIE_SECRET = originalSecret;
  }
  if (originalNodeEnv === undefined) {
    delete process.env.NODE_ENV;
  } else {
    process.env.NODE_ENV = originalNodeEnv;
  }
});

function makeRequest(articleId: string, lang: string, cookie: string | null): Request {
  const headers = new Headers();
  if (cookie) headers.set("cookie", `tg_download_gate=${cookie}`);
  return new Request(`https://example.com/api/download?articleId=${articleId}&lang=${lang}`, { headers });
}

describe("GET /api/download", () => {
  test("redirects to the static PDF when gate cookie is valid", async () => {
    const cookie = await buildDownloadCookie("reader@example.com", process.env.DOWNLOAD_COOKIE_SECRET!);
    const response = await GET({
      request: makeRequest("8", "en", cookie),
    } as any);

    expect(response.status).toBe(302);
    const location = response.headers.get("Location");
    expect(location).toBeTruthy();
    expect(location).toContain("/files/publications/");
  });

  test("redirects to localized publications page on missing cookie", async () => {
    const response = await GET({
      request: makeRequest("8", "pt", null),
    } as any);

    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/pt/publications?download=gate");
  });

  test("redirects to localized publications page on tampered cookie", async () => {
    const cookie = await buildDownloadCookie("reader@example.com", process.env.DOWNLOAD_COOKIE_SECRET!);
    const response = await GET({
      request: makeRequest("8", "pt", `${cookie}xx`),
    } as any);

    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/pt/publications?download=expired");
  });

  test("falls back to /en/publications when no lang is given", async () => {
    const headers = new Headers();
    const response = await GET({
      request: new Request("https://example.com/api/download?articleId=8", { headers }),
    } as any);

    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/en/publications?download=gate");
  });
});
