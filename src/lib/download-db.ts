import { sql } from "@vercel/postgres";
import { randomUUID } from "node:crypto";

function getPostgresUrl(): string {
  const fromMeta = (import.meta as any).env?.POSTGRES_URL;
  if (fromMeta) return fromMeta;
  if (typeof process !== "undefined" && process.env?.POSTGRES_URL) {
    return process.env.POSTGRES_URL;
  }
  throw new Error("POSTGRES_URL is not set in import.meta.env or process.env");
}

const initialPostgresUrl = getPostgresUrl();
if (initialPostgresUrl && typeof process !== "undefined" && !process.env.POSTGRES_URL) {
  process.env.POSTGRES_URL = initialPostgresUrl;
}

export type DownloadSubscriber = {
  id: string;
  email: string;
  preferred_lang: "en" | "pt";
  accepts_updates: boolean;
  verified_at: string | null;
};

export type DownloadToken = {
  id: string;
  subscriber_id: string;
  article_id: string | null;
  redirect_path: string | null;
  expires_at: string;
  used_at: string | null;
};

type SubscriberInput = {
  email: string;
  preferredLang: "en" | "pt";
  acceptsUpdates: boolean;
};

let schemaReady = false;

export async function ensureDownloadSchema() {
  if (schemaReady) return;

  const url = getPostgresUrl();
  if (!url) {
    throw new Error("POSTGRES_URL is not configured");
  }

  await sql`
    CREATE TABLE IF NOT EXISTS download_subscribers (
      id text PRIMARY KEY,
      email text UNIQUE NOT NULL,
      preferred_lang text NOT NULL,
      accepts_updates boolean NOT NULL DEFAULT false,
      verified_at timestamptz,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS download_tokens (
      id text PRIMARY KEY,
      subscriber_id text NOT NULL REFERENCES download_subscribers(id) ON DELETE CASCADE,
      token_hash text UNIQUE NOT NULL,
      purpose text NOT NULL,
      article_id text,
      redirect_path text,
      expires_at timestamptz NOT NULL,
      used_at timestamptz,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  schemaReady = true;
}

export async function findSubscriberByEmail(email: string): Promise<DownloadSubscriber | null> {
  const result = await sql<DownloadSubscriber>`
    SELECT id, email, preferred_lang, accepts_updates, verified_at
    FROM download_subscribers
    WHERE email = ${email}
    LIMIT 1
  `;
  return result.rows[0] ?? null;
}

export async function findSubscriberById(id: string): Promise<DownloadSubscriber | null> {
  const result = await sql<DownloadSubscriber>`
    SELECT id, email, preferred_lang, accepts_updates, verified_at
    FROM download_subscribers
    WHERE id = ${id}
    LIMIT 1
  `;
  return result.rows[0] ?? null;
}

export async function createSubscriber(input: SubscriberInput): Promise<DownloadSubscriber> {
  const result = await sql<DownloadSubscriber>`
    INSERT INTO download_subscribers (id, email, preferred_lang, accepts_updates)
    VALUES (${randomUUID()}, ${input.email}, ${input.preferredLang}, ${input.acceptsUpdates})
    RETURNING id, email, preferred_lang, accepts_updates, verified_at
  `;
  return result.rows[0];
}

export async function updateSubscriberPreferences(id: string, input: Omit<SubscriberInput, "email">): Promise<DownloadSubscriber> {
  const result = await sql<DownloadSubscriber>`
    UPDATE download_subscribers
    SET preferred_lang = ${input.preferredLang}, accepts_updates = ${input.acceptsUpdates}, updated_at = now()
    WHERE id = ${id}
    RETURNING id, email, preferred_lang, accepts_updates, verified_at
  `;
  return result.rows[0];
}

export async function markSubscriberVerified(id: string): Promise<DownloadSubscriber> {
  const result = await sql<DownloadSubscriber>`
    UPDATE download_subscribers
    SET verified_at = COALESCE(verified_at, now()), updated_at = now()
    WHERE id = ${id}
    RETURNING id, email, preferred_lang, accepts_updates, verified_at
  `;
  return result.rows[0];
}

export async function createDownloadToken(input: {
  subscriberId: string;
  tokenHash: string;
  articleId: string | null;
  redirectPath: string | null;
  expiresAt: Date;
}): Promise<DownloadToken> {
  const result = await sql<DownloadToken>`
    INSERT INTO download_tokens (id, subscriber_id, token_hash, purpose, article_id, redirect_path, expires_at)
    VALUES (${randomUUID()}, ${input.subscriberId}, ${input.tokenHash}, 'confirm_email', ${input.articleId}, ${input.redirectPath}, ${input.expiresAt.toISOString()})
    RETURNING id, subscriber_id, article_id, redirect_path, expires_at, used_at
  `;
  return result.rows[0];
}

export async function findUsableDownloadToken(tokenHash: string): Promise<DownloadToken | null> {
  const result = await sql<DownloadToken>`
    SELECT id, subscriber_id, article_id, redirect_path, expires_at, used_at
    FROM download_tokens
    WHERE token_hash = ${tokenHash}
      AND used_at IS NULL
      AND expires_at > now()
    LIMIT 1
  `;
  return result.rows[0] ?? null;
}

export async function markDownloadTokenUsed(id: string): Promise<void> {
  await sql`
    UPDATE download_tokens
    SET used_at = now()
    WHERE id = ${id}
  `;
}
