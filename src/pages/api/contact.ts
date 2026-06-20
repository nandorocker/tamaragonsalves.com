import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

function json(body: Record<string, unknown>, status = 200, headersInit?: HeadersInit) {
  const headers = new Headers(headersInit);
  headers.set("Content-Type", "application/json");
  return new Response(JSON.stringify(body), { status, headers });
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const INQUIRY_TYPES = [
  "Speaking",
  "Consulting or training",
  "Media/interview",
  "Legal or policy collaboration",
  "Academic/research",
  "Other",
] as const;

type InquiryType = (typeof INQUIRY_TYPES)[number];

function isValidInquiryType(value: string): value is InquiryType {
  return (INQUIRY_TYPES as readonly string[]).includes(value);
}

function maxLength(value: string, limit: number): boolean {
  return value.length <= limit;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const name = normalizeString(body.name);
    const email = normalizeString(body.email).toLowerCase();
    const inquiryType = normalizeString(body.inquiryType);
    const message = normalizeString(body.message);
    const honeypot = normalizeString(body.company);
    const lang = normalizeString(body.lang) === 'pt' ? 'pt' : 'en';

    const messages = {
      pt: {
        spam: 'Spam detectado.',
        required: 'Todos os campos obrigatórios devem ser preenchidos.',
        email: 'Insira um endereço de email válido.',
        inquiry: 'Selecione um tipo de consulta válido.',
        length: 'Um ou mais campos excedem o tamanho permitido.',
        config: 'O serviço de contato não está configurado.',
        generic: 'Algo deu errado. Tente novamente.',
      },
      en: {
        spam: 'Spam detected.',
        required: 'All required fields must be filled.',
        email: 'Please enter a valid email address.',
        inquiry: 'Please select a valid inquiry type.',
        length: 'One or more fields exceed the allowed length.',
        config: 'Contact service is not configured.',
        generic: 'Something went wrong. Please try again.',
      },
    };

    const msg = messages[lang];

    if (honeypot) return json({ error: msg.spam }, 400);

    if (!name || !email || !inquiryType || !message) {
      return json({ error: msg.required }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return json({ error: msg.email }, 400);
    }

    if (!isValidInquiryType(inquiryType)) {
      return json({ error: msg.inquiry }, 400);
    }

    if (
      !maxLength(name, 200) ||
      !maxLength(email, 320) ||
      !maxLength(message, 5000)
    ) {
      return json({ error: msg.length }, 400);
    }

    const resendApiKey =
      (import.meta as any).env?.RESEND_API_KEY || process.env?.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set");
      return json({ error: msg.config }, 500);
    }

    const resend = new Resend(resendApiKey);

    const subject = `New contact inquiry: ${inquiryType}`;

    const rows: string[] = [];
    rows.push(`<tr><td style="padding:4px 12px 4px 0;vertical-align:top;color:#6b7280;">Name</td><td style="padding:4px 0;vertical-align:top;">${escapeHtml(name)}</td></tr>`);
    rows.push(`<tr><td style="padding:4px 12px 4px 0;vertical-align:top;color:#6b7280;">Email</td><td style="padding:4px 0;vertical-align:top;"><a href="mailto:${escapeHtml(email)}" style="color:#be185d;text-decoration:underline;">${escapeHtml(email)}</a></td></tr>`);
    rows.push(`<tr><td style="padding:4px 12px 4px 0;vertical-align:top;color:#6b7280;">Inquiry</td><td style="padding:4px 0;vertical-align:top;">${escapeHtml(inquiryType)}</td></tr>`);

    const tableHtml = `<table style="border-collapse:collapse;font-size:15px;line-height:1.6;margin:0 0 20px;">${rows.join("")}</table>`;
    const messageHtml = `<p style="font-size:15px;line-height:1.6;margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>`;

    const html = `
      <div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h1 style="font-size:20px;line-height:1.3;margin:0 0 16px;color:#111827;">New contact inquiry</h1>
        ${tableHtml}
        <h2 style="font-size:16px;line-height:1.3;margin:0 0 8px;color:#111827;">Message</h2>
        ${messageHtml}
      </div>
    `;

    const result = await resend.emails.send({
      from: "Tamara Amoroso Gonsalves <info@tamaragonsalves.com>",
      to: "info@tamaragonsalves.com",
      replyTo: email,
      subject,
      html,
    });

    if (result.error) throw result.error;

    return json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return json({ error: msg.generic }, 500);
  }
};
