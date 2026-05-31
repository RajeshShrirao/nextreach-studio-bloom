export { renderers } from '../../renderers.mjs';

const prerender = false;
const CEREBRAS_ENDPOINT = "https://api.cerebras.ai/v1/chat/completions";
const MODEL = "llama3.1-8b";
const MAX_TOKENS = 500;
const TEMPERATURE = 0.7;
const SYSTEM_PROMPT = `You are a helpful AI assistant. Answer questions clearly and concisely. If you don't know something, say so honestly.`;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { messages } = body;
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const apiKey = "csk-c2fe5k5hk529dxdd3f4px8m8tct8dmfec8m689cmkp2pwr6m";
    if (!apiKey) ;
    const response = await fetch(CEREBRAS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages
        ],
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE
      })
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("Cerebras API error:", data);
      return new Response(JSON.stringify({ reply: "Sorry, I'm having trouble thinking right now. Please try again." }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const reply = data.choices?.[0]?.message?.content;
    return new Response(JSON.stringify({ reply: reply || "I'm not sure how to answer that." }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ reply: "I'm having trouble connecting. Please try again." }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
