import { useState, useCallback } from "react";

const FORMATS = [
  {
    id: "raw",
    label: "Raw Text",
    description: "Plain raw system & user text concatenation",
    convert: (sys: string, user: string) =>
      sys ? `${sys}\n\n${user}` : user,
  },
  {
    id: "chatml",
    label: "ChatML Format",
    description: "Used by OpenAI & compatible open-source models",
    convert: (sys: string, user: string) => {
      let out = "";
      if (sys) out += `<|im_start|>system\n${sys}<|im_end|>\n`;
      out += `<|im_start|>user\n${user}<|im_end|>\n<|im_start|>assistant\n`;
      return out;
    },
  },
  {
    id: "llama3",
    label: "Llama 3 / 3.1",
    description: "Meta Llama Instruct model standard template",
    convert: (sys: string, user: string) => {
      let out = "<|begin_of_text|>";
      if (sys) out += `<|start_header_id|>system<|end_header_id|>\n\n${sys}<|eot_id|>\n`;
      out += `<|start_header_id|>user<|end_header_id|>\n\n${user}<|eot_id|>\n<|start_header_id|>assistant<|end_header_id|>\n\n`;
      return out;
    },
  },
  {
    id: "mistral",
    label: "Mistral",
    description: "Mistral & Mixtral instruction brackets",
    convert: (sys: string, user: string) => {
      const combined = sys ? `${sys}\n\n${user}` : user;
      return `[INST] ${combined} [/INST]`;
    },
  },
  {
    id: "gemma",
    label: "Gemma 2",
    description: "Google Gemma instruct conversation wraps",
    convert: (sys: string, user: string) => {
      const combined = sys ? `${sys}\n\n${user}` : user;
      return `<start_of_turn>user\n${combined}<end_of_turn>\n<start_of_turn>model\n`;
    },
  },
  {
    id: "phi3",
    label: "Phi-3 / 3.5",
    description: "Microsoft Phi instruct tag formatting",
    convert: (sys: string, user: string) => {
      let out = "";
      if (sys) out += `<|system|>\n${sys}<|end|>\n`;
      out += `<|user|>\n${user}<|end|>\n<|assistant|>\n`;
      return out;
    },
  },
  {
    id: "anthropic",
    label: "Claude Messages",
    description: "Anthropic API structured JSON messages payload",
    convert: (sys: string, user: string) => {
      const payload: Record<string, unknown> = {
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [{ role: "user", content: user }],
      };
      if (sys) payload.system = sys;
      return JSON.stringify(payload, null, 2);
    },
  },
  {
    id: "openai",
    label: "GPT Chat API",
    description: "OpenAI Chat Completions API JSON payload",
    convert: (sys: string, user: string) => {
      const messages: { role: string; content: string }[] = [];
      if (sys) messages.push({ role: "system", content: sys });
      messages.push({ role: "user", content: user });
      return JSON.stringify({ model: "gpt-4o", messages }, null, 2);
    },
  },
];

export default function PromptFormatter() {
  const [systemPrompt, setSystemPrompt] = useState("You are an expert technical editor auditing technical docs for flow.");
  const [userMessage, setUserMessage] = useState("Review this chapter and suggest adjustments.");
  const [targetFormat, setTargetFormat] = useState("chatml");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "raw">("preview");

  const selectedFormat = FORMATS.find((f) => f.id === targetFormat)!;
  const formatted = selectedFormat.convert(systemPrompt, userMessage);

  const handleCopy = useCallback(async () => {
    if (!formatted) return;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [formatted]);

  return (
    <div className="space-y-6">
      {/* Format Selector Grid */}
      <div className="card-studio p-6">
        <h2 className="text-xs uppercase tracking-wider text-[#6E6862] font-bold mb-4">Select Target Format</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {FORMATS.map((f) => (
            <button
              key={f.id}
              onClick={() => setTargetFormat(f.id)}
              className={`rounded-xl p-3.5 text-left border transition-all duration-200 cursor-pointer ${
                targetFormat === f.id
                  ? "bg-[#C76B50]/10 border-[#C76B50]/40 text-[#C76B50]"
                  : "bg-[#FAF8F5] border-[#1F1F23]/8 text-[#6E6862] hover:text-[#1F1F23] hover:bg-[#FAF8F5]/80"
              }`}
            >
              <p className="text-xs font-semibold">{f.label}</p>
              <p className="text-[11px] text-[#6E6862] mt-1 leading-tight">{f.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main workspace layout split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column inputs */}
        <div className="space-y-4">
          <div className="card-studio p-6">
            <label htmlFor="sys-prompt" className="form-label-premium flex justify-between items-center">
              <span className="text-[#1F1F23] font-semibold text-xs uppercase tracking-wider">System Prompt</span>
              <span className="text-[11px] text-[#6E6862] font-semibold normal-case">Optional</span>
            </label>
            <textarea
              id="sys-prompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="You are a professional assistant..."
              rows={6}
              className="form-textarea-premium font-mono text-xs leading-relaxed"
            />
          </div>

          <div className="card-studio p-6">
            <label htmlFor="user-message" className="form-label-premium text-[#1F1F23] font-semibold text-xs uppercase tracking-wider">
              User Message
            </label>
            <textarea
              id="user-message"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Enter user query instruction details..."
              rows={8}
              className="form-textarea-premium font-mono text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Right column preview sandbox and outputs */}
        <div className="space-y-4">
          <div className="card-studio !p-0 overflow-hidden flex flex-col h-full min-h-[440px]">
            {/* Header Tabs */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#1F1F23]/8 bg-[#FAF8F5]/60">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "preview"
                      ? "bg-white text-[#1F1F23] shadow-xs border border-[#1F1F23]/10"
                      : "text-[#6E6862] hover:text-[#1F1F23]"
                  }`}
                >
                  Sandbox Preview
                </button>
                <button
                  onClick={() => setActiveTab("raw")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "raw"
                      ? "bg-white text-[#1F1F23] shadow-xs border border-[#1F1F23]/10"
                      : "text-[#6E6862] hover:text-[#1F1F23]"
                  }`}
                >
                  Raw Target Code
                </button>
              </div>

              <button
                onClick={handleCopy}
                disabled={!formatted}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                  copied
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                    : "bg-white border-[#1F1F23]/10 text-[#4A4844] hover:text-[#1F1F23] hover:bg-[#FAF8F5] disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                }`}
              >
                {copied ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Content box based on active tabs */}
            <div className="flex-1 bg-[#FAF8F5]/30 p-5 overflow-y-auto">
              {activeTab === "preview" ? (
                /* Sandbox chat simulation UI */
                <div className="space-y-4 text-xs font-sans">
                  <div className="text-center text-[10px] text-[#6E6862] font-mono tracking-wider pb-2 border-b border-[#1F1F23]/6">
                    MOCK API SESSION SANDBOX PREVIEW
                  </div>
                  
                  {systemPrompt && (
                    <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50 text-purple-900">
                      <p className="text-[9px] uppercase font-bold tracking-wider text-purple-700 mb-1">⚙️ System Rules Configuration</p>
                      <p className="whitespace-pre-wrap leading-relaxed font-mono text-[11px]">{systemPrompt}</p>
                    </div>
                  )}

                  {userMessage ? (
                    <div className="flex justify-end">
                      <div className="max-w-[85%] p-3.5 rounded-2xl rounded-tr-sm border border-[#C76B50]/20 bg-[#C76B50]/10 text-[#1F1F23]">
                        <p className="text-[9px] uppercase font-bold tracking-wider text-[#C76B50] mb-1 text-right">🧑 User Input Message</p>
                        <p className="whitespace-pre-wrap leading-relaxed font-mono text-[11px]">{userMessage}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[#6E6862] font-mono text-[11px]">
                      Enter a user message in the input panel to update chat bubble simulation.
                    </div>
                  )}

                  {userMessage && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] p-3.5 rounded-2xl rounded-tl-sm border border-[#1F1F23]/8 bg-white text-[#4A4844] shadow-xs">
                        <p className="text-[9px] uppercase font-bold tracking-wider text-[#6E6862] mb-1">🤖 Expected Assistant Completion</p>
                        <div className="flex items-center gap-1.5 py-1 text-[#6E6862] font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C76B50] animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C76B50] animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C76B50] animate-bounce" style={{ animationDelay: "300ms" }} />
                          <span className="text-[10px] ml-1">formatting rules mapped...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Raw formatting output pre/code block */
                <pre className="font-mono text-xs text-[#1F1F23] bg-white p-4 rounded-xl border border-[#1F1F23]/8 whitespace-pre-wrap leading-relaxed shadow-xs">
                  {formatted || (
                    <span className="text-[#6E6862] italic">
                      No prompt content to render.
                    </span>
                  )}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-[#6E6862] text-center leading-relaxed">
        Calculations utilize official schema profiles. Verification in dev contexts is recommended prior to scripting automated prompts.
      </p>
    </div>
  );
}
