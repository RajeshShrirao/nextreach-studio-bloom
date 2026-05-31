import type { APIRoute } from "astro";

export const prerender = false;

const CEREBRAS_ENDPOINT = "https://api.cerebras.ai/v1/chat/completions";
const MODEL = "llama3.1-8b";
const MAX_TOKENS = 500;
const TEMPERATURE = 0.7;

const SYSTEM_PROMPT = `You are a helpful AI assistant. Answer questions clearly and concisely. If you don't know something, say so honestly.`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = import.meta.env.CEREBRAS_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ reply: "The AI is not configured yet." }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch(CEREBRAS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cerebras API error:", data);
      return new Response(JSON.stringify({ reply: "Sorry, I'm having trouble thinking right now. Please try again." }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const reply = data.choices?.[0]?.message?.content;

    return new Response(JSON.stringify({ reply: reply || "I'm not sure how to answer that." }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ reply: "I'm having trouble connecting. Please try again." }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
