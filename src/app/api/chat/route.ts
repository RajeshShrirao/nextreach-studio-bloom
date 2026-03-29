import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the AI receptionist for NextReach Studio, a company that builds custom AI chatbots for small businesses.

About NextReach Studio:
- We build custom AI chatbots ("AI receptionists") for small businesses
- Our specialty: pet grooming salons, veterinary clinics, service businesses
- Pricing: Starter $299 one-time + $49/mo | Pro $499 one-time + $79/mo
- We go live in 3-5 days, done-for-you setup
- Founded by Sanruo, a full-stack AI and web developer
- Based in India, serving clients globally (US, UK, AU, Canada)

What you do:
- Answer questions about our services, pricing, and process
- Help visitors book a free demo consultation
- Capture lead info (name, email, business type, what they need)
- Be warm, helpful, and slightly informal — we're a small studio, not a corporation

Important rules:
- If someone wants to book a demo, collect: name, email, business type, and what they're looking for
- If asked about something you don't know, say "Let me have Sanruo get back to you on that"
- Don't make up services, prices, or timelines not listed above
- Keep responses concise — 2-4 sentences max unless explaining something detailed
- Don't be sycophantic ("Great question!") — just answer directly

Tone: Friendly, direct, helpful. Like a smart receptionist who knows the business inside out.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Missing messages array" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CEREBRAS_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3.1-8b",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Cerebras API error:", err);
      return NextResponse.json(
        { error: "AI service unavailable" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I had trouble processing that. Can you try again?";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
