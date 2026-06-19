import type { APIRoute } from "astro";
import { verifyDownloadGateCookie } from "../../lib/download-gate";

export const prerender = false;

const cookieName = "tg_download_gate";

function getCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function json(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export const GET: APIRoute = async ({ request }) => {
  const cookieSecret =
    (import.meta as any).env?.DOWNLOAD_COOKIE_SECRET || process.env?.DOWNLOAD_COOKIE_SECRET;
  const cookie = getCookie(request, cookieName);

  if (!cookie || !cookieSecret) return json({ ok: false }, 401);

  const gate = await verifyDownloadGateCookie(cookie, cookieSecret);
  if (!gate) return json({ ok: false }, 401);

  return json({ ok: true }, 200);
};
