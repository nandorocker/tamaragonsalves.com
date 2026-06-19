import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
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

function resolveFilePath(articleFile: string): string {
  const here = dirname(fileURLToPath(import.meta.url));
  return resolve(here, "../../../public/files/publications", articleFile);
}

export const GET: APIRoute = async ({ request }) => {
  const requestUrl = new URL(request.url);
  const articleId = requestUrl.searchParams.get("articleId");
  const lang = normalizeLang(requestUrl.searchParams.get("lang"));
  const cookieSecret = (import.meta as any).env?.DOWNLOAD_COOKIE_SECRET || process.env?.DOWNLOAD_COOKIE_SECRET;
  const cookie = getCookie(request, cookieName);

  if (!articleId || !cookieSecret || !cookie) return redirect(`/${lang}/publications?download=gate`);

  const gate = await verifyDownloadGateCookie(cookie, cookieSecret);
  if (!gate) return redirect(`/${lang}/publications?download=expired`);

  const article = articlesData.find((item) => item.id === articleId);
  if (!article?.file) return redirect(`/${lang}/publications?download=missing`);

  try {
    const filePath = resolveFilePath(article.file);
    const data = await readFile(filePath);
    const filename = article.file.split("/").pop() || "download.pdf";

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (err) {
    console.error("Download read error:", err);
    return redirect(`/${lang}/publications?download=missing`);
  }
};
