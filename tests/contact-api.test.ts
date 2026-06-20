import { describe, expect, test, mock, beforeEach } from "bun:test";

const sendMock = mock(() => Promise.resolve({ data: { id: "msg_1" }, error: null }));

mock.module("resend", () => ({
  Resend: class MockResend {
    emails = { send: sendMock };
  },
}));

const originalEnv = { ...process.env };

beforeEach(() => {
  sendMock.mockClear();
  process.env = { ...originalEnv };
  process.env.RESEND_API_KEY = "re_test_key";
});

function buildRequest(body: Record<string, unknown>): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validPayload = {
  name: "Jane Doe",
  email: "jane@example.com",
  inquiryType: "Speaking",
  message: "I would like to invite Tamara to speak at our event.",
};

async function callPost(body: Record<string, unknown>) {
  const { POST } = await import("../src/pages/api/contact");
  const url = new URL("http://localhost/api/contact");
  return POST({ request: buildRequest(body), url } as any);
}

describe("contact API validation", () => {
  test("rejects missing name", async () => {
    const res = await callPost({ ...validPayload, name: "" });
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toContain("required");
  });

  test("rejects missing email", async () => {
    const res = await callPost({ ...validPayload, email: "" });
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toContain("required");
  });

  test("rejects invalid email", async () => {
    const res = await callPost({ ...validPayload, email: "not-an-email" });
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toContain("valid email");
  });

  test("rejects missing inquiry type", async () => {
    const res = await callPost({ ...validPayload, inquiryType: "" });
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toContain("required");
  });

  test("rejects invalid inquiry type", async () => {
    const res = await callPost({ ...validPayload, inquiryType: "Pizza delivery" });
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toContain("valid inquiry type");
  });

  test("rejects missing message", async () => {
    const res = await callPost({ ...validPayload, message: "" });
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toContain("required");
  });

  test("rejects honeypot submissions", async () => {
    const res = await callPost({ ...validPayload, company: "spam-bot" });
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toContain("Spam");
  });

  test("rejects overlong name", async () => {
    const res = await callPost({ ...validPayload, name: "A".repeat(201) });
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toContain("length");
  });

  test("rejects overlong message", async () => {
    const res = await callPost({ ...validPayload, message: "A".repeat(5001) });
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toContain("length");
  });
});

describe("contact API success", () => {
  test("sends email to info@tamaragonsalves.com", async () => {
    const res = await callPost(validPayload);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(sendMock).toHaveBeenCalledTimes(1);

    const call = sendMock.mock.calls[0][0];
    expect(call.to).toBe("info@tamaragonsalves.com");
    expect(call.from).toContain("info@tamaragonsalves.com");
    expect(call.replyTo).toBe("jane@example.com");
    expect(call.subject).toContain("Speaking");
    expect(call.html).toContain("Jane Doe");
    expect(call.html).toContain("jane@example.com");
    expect(call.html).toContain("I would like to invite Tamara");
  });

  test("includes inquiry type in subject and body", async () => {
    await callPost(validPayload);

    const call = sendMock.mock.calls[0][0];
    expect(call.subject).toContain("Speaking");
    expect(call.html).toContain("Speaking");
    expect(call.html).toContain("Jane Doe");
    expect(call.html).toContain("jane@example.com");
    expect(call.html).toContain("I would like to invite Tamara");
  });

  test("normalizes email to lowercase", async () => {
    await callPost({ ...validPayload, email: "Jane@Example.COM" });

    const call = sendMock.mock.calls[0][0];
    expect(call.replyTo).toBe("jane@example.com");
  });

  test("sets reply-to to visitor email", async () => {
    await callPost(validPayload);

    const call = sendMock.mock.calls[0][0];
    expect(call.replyTo).toBe("jane@example.com");
  });
});

describe("contact API error handling", () => {
  test("returns 500 when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;

    const res = await callPost(validPayload);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toContain("not configured");
  });
});
