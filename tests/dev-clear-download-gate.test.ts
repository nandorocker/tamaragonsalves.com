import { afterAll, beforeAll, describe, expect, test } from "bun:test";

const originalNodeEnv = process.env.NODE_ENV;
const originalDevFlag = (process.env as any).ASTRO_DEV;

beforeAll(() => {
  process.env.NODE_ENV = "test";
  delete (process.env as any).ASTRO_DEV;
});

afterAll(() => {
  process.env.NODE_ENV = originalNodeEnv;
  if (originalDevFlag === undefined) {
    delete (process.env as any).ASTRO_DEV;
  } else {
    (process.env as any).ASTRO_DEV = originalDevFlag;
  }
});

describe("GET /api/dev/clear-download-gate in non-dev", () => {
  test("returns 404 with no Set-Cookie header", async () => {
    const { GET } = await import("../src/pages/api/dev/clear-download-gate");
    const response = await GET({ request: new Request("https://example.com/api/dev/clear-download-gate") } as any);

    expect(response.status).toBe(404);
    expect(response.headers.get("Set-Cookie")).toBeNull();
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });
});
