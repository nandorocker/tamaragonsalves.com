import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { GET } from "../src/pages/api/download-status";
import { buildDownloadCookie } from "../src/lib/download-gate";

const originalSecret = process.env.DOWNLOAD_COOKIE_SECRET;

beforeAll(() => {
  process.env.DOWNLOAD_COOKIE_SECRET = "test-secret-with-enough-entropy";
});

afterAll(() => {
  if (originalSecret === undefined) {
    delete process.env.DOWNLOAD_COOKIE_SECRET;
  } else {
    process.env.DOWNLOAD_COOKIE_SECRET = originalSecret;
  }
});

function makeRequest(cookieValue: string | null): Request {
  const headers = new Headers();
  if (cookieValue) headers.set("cookie", `tg_download_gate=${cookieValue}`);
  return new Request("https://example.com/api/download-status", { headers });
}

describe("GET /api/download-status", () => {
  test("returns ok: true for a valid gate cookie", async () => {
    const cookie = await buildDownloadCookie("reader@example.com", process.env.DOWNLOAD_COOKIE_SECRET!);
    const response = await GET({ request: makeRequest(cookie) } as any);

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    const body = await response.json();
    expect(body.ok).toBe(true);
  });

  test("returns 401 when the cookie is missing", async () => {
    const response = await GET({ request: makeRequest(null) } as any);

    expect(response.status).toBe(401);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    const body = await response.json();
    expect(body.ok).toBe(false);
  });

  test("returns 401 when the cookie is tampered", async () => {
    const cookie = await buildDownloadCookie("reader@example.com", process.env.DOWNLOAD_COOKIE_SECRET!);
    const response = await GET({ request: makeRequest(`${cookie}xx`) } as any);

    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.ok).toBe(false);
  });
});
