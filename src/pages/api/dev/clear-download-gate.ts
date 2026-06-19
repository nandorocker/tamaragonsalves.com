import type { APIRoute } from "astro";

export const prerender = false;

const cookieName = "tg_download_gate";

function isDev(): boolean {
  const env = (import.meta as any).env;
  if (env?.DEV === true) return true;
  if (process.env?.NODE_ENV === "development") return true;
  return false;
}

function notFound(): Response {
  return new Response("Not found", {
    status: 404,
    headers: { "Cache-Control": "no-store" },
  });
}

export const GET: APIRoute = async ({ request }) => {
  if (!isDev()) {
    console.warn(`[dev] clear-download-gate blocked: not in dev (${request.url})`);
    return notFound();
  }

  const requestUrl = new URL(request.url);
  const secure = requestUrl.protocol === "https:" ? "; Secure" : "";
  const clearCookie = `${cookieName}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax${secure}`;

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Set-Cookie": clearCookie,
    },
  });
};
