import type { APIRoute } from "astro";
import { get } from "@vercel/blob";
import articlesData from "../../data/articles.json";
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

function normalizeLang(value: string | null): "en" | "pt" {
  return value === "pt" ? "pt" : "en";
}

function redirect(location: string, status = 302) {
  return new Response(null, { status, headers: { Location: location } });
}

export const GET: APIRoute = async ({ request }) => {
  const requestUrl = new URL(request.url);
  const articleId = requestUrl.searchParams.get("articleId");
  const lang = normalizeLang(requestUrl.searchParams.get("lang"));
  const cookieSecret = process.env.DOWNLOAD_COOKIE_SECRET;
  const cookie = getCookie(request, cookieName);

  if (!articleId || !cookieSecret || !cookie) return redirect(`/${lang}/publications?download=gate`);

  const gate = await verifyDownloadGateCookie(cookie, cookieSecret);
  if (!gate) return redirect(`/${lang}/publications?download=expired`);

  const article = articlesData.find((item) => item.id === articleId);
  if (!article?.file) return redirect(`/${lang}/publications?download=missing`);

  const isDev = process.env.NODE_ENV === "development";

  if (isDev && !process.env.BLOB_READ_WRITE_TOKEN) {
    return redirect(`/files/publications/${article.file}`);
  }

  try {
    const result = await get(`publications/${article.file}`, {
      access: "public",
    });

    if (result && result.statusCode === 200) {
      return new Response(result.stream, {
        status: 200,
        headers: {
          "Content-Type": result.blob.contentType || "application/pdf",
          "Content-Disposition": `attachment; filename="${article.file}"`,
        },
      });
    }
  } catch (err) {
    console.error("Blob fetch failed:", err);
    if (!isDev) return redirect(`/${lang}/publications?download=error`);
  }

  if (isDev) return redirect(`/files/publications/${article.file}`);
  return redirect(`/${lang}/publications?download=missing`);
};
