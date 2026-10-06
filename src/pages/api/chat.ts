import type { APIRoute } from "astro";

export const prerender = false;

const CEREBRAS_ENDPOINT = "https://api.cerebras.ai/v1/chat/completions";
const MODEL = "llama3.1-8b";
const MAX_TOKENS = 500;
const TEMPERATURE = 0.7;

const MAX_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;
const TIMEOUT_MS = 15_000;

const rateMap = new Map<string, { count: number; resetAt: number }>();

function getClientIP(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT - entry.count };
}

function checkOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const allowed = [
    "https://www.nextreachstudio.in",
    "https://nextreachstudio.in",
    // Legacy origins — safe to drop once the vercel.app -> .in redirect is confirmed live.
    "https://nextreachstudio.vercel.app",
    "https://nextreach-studio.vercel.app",
    "https://nextreach-studio-bloom.vercel.app",
  ];

  if (!origin && !referer) return true;
  if (origin && allowed.some((a) => origin.startsWith(a))) return true;
  if (referer && allowed.some((a) => referer.startsWith(a))) return true;
  return false;
}

export const POST: APIRoute = async ({ request }) => {
  if (!checkOrigin(request)) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ip = getClientIP(request);
  const { allowed, remaining } = checkRateLimit(ip);

  if (!allowed) {
    return new Response(JSON.stringify({ reply: "Too many requests. Please wait a moment before sending another message." }), {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": "60",
        "X-RateLimit-Remaining": "0",
      },
    });
  }

  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (messages.length > MAX_MESSAGES) {
      return new Response(JSON.stringify({ error: "Too many messages" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    for (const msg of messages) {
      if (typeof msg.content !== "string" || msg.content.length > MAX_MESSAGE_LENGTH) {
        return new Response(JSON.stringify({ error: "Message too long" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    const apiKey = import.meta.env.CEREBRAS_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ reply: "The AI assistant is not available right now. Please check back later." }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": String(remaining),
        },
      });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(CEREBRAS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You are a helpful AI assistant for NextReach Studio. Answer questions about AI development, software engineering, and business automation. Be concise and honest." },
          ...messages,
        ],
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await response.json();

    if (!response.ok) {
      console.error("Cerebras API error:", data);
      return new Response(JSON.stringify({ reply: "I'm having trouble thinking right now. Please try again." }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": String(remaining),
        },
      });
    }

    const reply = data.choices?.[0]?.message?.content;

    return new Response(JSON.stringify({ reply: reply || "I'm not sure how to answer that." }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Remaining": String(remaining),
      },
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return new Response(JSON.stringify({ reply: "The request timed out. Please try again with a shorter message." }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ reply: "I'm having trouble connecting. Please try again." }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
