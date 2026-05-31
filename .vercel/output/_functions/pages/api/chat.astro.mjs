export { renderers } from '../../renderers.mjs';

const prerender = false;
const CEREBRAS_ENDPOINT = "https://api.cerebras.ai/v1/chat/completions";
const MODEL = "llama3.1-8b";
const MAX_TOKENS = 500;
const TEMPERATURE = 0.7;
const SYSTEM_PROMPT = `You are the AI receptionist for NextReach Studio. Your job is to answer questions about our AI receptionist service for pet grooming salons and vet clinics.

Key info:
- We build custom AI receptionists that answer calls and chat 24/7
- Setup: $299 one-time + $49/month (Starter) or $499 + $49/month (Business)
- Goes live in 3 days
- Works on any website (WordPress, Wix, Squarespace, Shopify, custom HTML)
- Trained on each salon's specific services, breeds, pricing, and hours
- Never misses a call, answers FAQs, books appointments automatically
- Pilot salons recovered 12-16 missed calls per week

When asked about booking: direct to https://tally.so/r/1AMoR1
Email: hello@nextreachstudio.com

Be helpful, concise, and friendly. If you don't know something, say so honestly.`;
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
      return new Response(JSON.stringify({ reply: "Sorry, I'm having trouble thinking right now. Please try again or email hello@nextreachstudio.com." }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const reply = data.choices?.[0]?.message?.content;
    return new Response(JSON.stringify({ reply: reply || "I'm not sure how to answer that. Please email hello@nextreachstudio.com." }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ reply: "I'm having trouble connecting. Please email hello@nextreachstudio.com." }), {
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
