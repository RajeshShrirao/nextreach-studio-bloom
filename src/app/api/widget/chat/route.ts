import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONFIG_DIR = path.join(process.cwd(), "data", "demo-configs");

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface Config {
  business_name: string;
  business_type?: string;
  greeting?: string;
  hours?: string;
  location?: string;
  phone?: string;
  website?: string;
  owner_name?: string;
  services?: Array<{ name: string; price: string; duration: string }>;
  faq?: Array<{ q: string; a: string }>;
  escalation?: string;
  theme?: Record<string, string>;
  system_prompt?: string;
}

function buildSystemPrompt(cfg: Config): string {
  const lines: string[] = [];

  lines.push(
    `You are the AI receptionist for ${cfg.business_name}. Respond as a warm, knowledgeable representative of this business.`
  );
  lines.push("");

  if (cfg.location) lines.push(`Location: ${cfg.location}`);
  if (cfg.hours) lines.push(`Hours: ${cfg.hours}`);
  if (cfg.phone) lines.push(`Phone: ${cfg.phone}`);
  if (cfg.website) lines.push(`Website: ${cfg.website}`);
  if (cfg.owner_name) lines.push(`Owner: ${cfg.owner_name}`);
  lines.push("");

  if (cfg.services && cfg.services.length > 0) {
    lines.push("Services offered:");
    cfg.services.forEach((s) => {
      lines.push(`- ${s.name}: ${s.price} (${s.duration})`);
    });
    lines.push("");
  }

  if (cfg.faq && cfg.faq.length > 0) {
    lines.push("Frequently asked questions:");
    cfg.faq.forEach((f) => {
      lines.push(`Q: ${f.q}`);
      lines.push(`A: ${f.a}`);
      lines.push("");
    });
  }

  if (cfg.escalation) {
    lines.push(`If you cannot answer a question, say: "${cfg.escalation}"`);
  }

  lines.push("");
  lines.push("Important rules:");
  lines.push("- Do NOT make up information not provided above");
  lines.push("- Keep responses to 2-3 sentences maximum");
  lines.push("- Be warm, friendly, and helpful — like a real receptionist");
  lines.push("- If someone wants to book, collect their name, pet info, and preferred date/time");
  lines.push("- Do not discuss other businesses or topics unrelated to this business");

  return lines.join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { client_id, messages } = body as {
      client_id?: string;
      messages?: ChatMessage[];
    };

    if (!client_id || !messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Missing client_id or messages array" },
        { status: 400 }
      );
    }

    // Load config
    const filePath = path.join(CONFIG_DIR, `${client_id}.json`);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Config not found" }, { status: 404 });
    }
    const cfg: Config = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const systemPrompt = cfg.system_prompt || buildSystemPrompt(cfg);

    // Call Cerebras API
    const response = await fetch(
      "https://api.cerebras.ai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CEREBRAS_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3.1-8b",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Cerebras API error:", err);
      return NextResponse.json(
        { error: "AI service unavailable" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ??
      "Sorry, I had trouble processing that. Can you try again?";

    return NextResponse.json(
      { reply },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (err) {
    console.error("Widget chat API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
