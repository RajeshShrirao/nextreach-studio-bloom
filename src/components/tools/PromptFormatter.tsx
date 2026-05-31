import { useState, useCallback } from "react";

const FORMATS = [
  {
    id: "raw",
    label: "Raw Prompt",
    description: "Plain text, no special formatting",
    convert: (sys: string, user: string) =>
      sys ? `${sys}\n\n${user}` : user,
  },
  {
    id: "chatml",
    label: "ChatML",
    description: "OpenAI / compatible models",
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
    description: "Meta Llama 3 instruct format",
    convert: (sys: string, user: string) => {
      let out = "<|begin_of_text|>";
      if (sys) out += `<|start_header_id|>system<|end_header_id|>\n\n${sys}<|eot_id|>\n`;
      out += `<|start_header_id|>user<|end_header_id|>\n\n${user}<|eot_id|>\n<|start_header_id|>assistant<|end_header_id|>\n\n`;
      return out;
    },
  },
  {
    id: "mistral",
    label: "Mistral / Mixtral",
    description: "Mistral instruct format",
    convert: (sys: string, user: string) => {
      const combined = sys ? `${sys}\n\n${user}` : user;
      return `[INST] ${combined} [/INST]`;
    },
  },
  {
    id: "gemma",
    label: "Gemma 2",
    description: "Google Gemma format",
    convert: (sys: string, user: string) => {
      const combined = sys ? `${sys}\n\n${user}` : user;
      return `<start_of_turn>user\n${combined}<end_of_turn>\n<start_of_turn>model\n`;
    },
  },
  {
    id: "phi3",
    label: "Phi-3 / Phi-3.5",
    description: "Microsoft Phi format",
    convert: (sys: string, user: string) => {
      let out = "";
      if (sys) out += `<|system|>\n${sys}<|end|>\n`;
      out += `<|user|>\n${user}<|end|>\n<|assistant|>\n`;
      return out;
    },
  },
  {
    id: "anthropic",
    label: "Anthropic Messages API",
    description: "Claude API JSON format",
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
    label: "OpenAI Chat API",
    description: "GPT-4 / compatible models JSON",
    convert: (sys: string, user: string) => {
      const messages: { role: string; content: string }[] = [];
      if (sys) messages.push({ role: "system", content: sys });
      messages.push({ role: "user", content: user });
      return JSON.stringify({ model: "gpt-4o", messages }, null, 2);
    },
  },
];

export default function PromptFormatter() {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [targetFormat, setTargetFormat] = useState("chatml");
  const [copied, setCopied] = useState(false);

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
      {/* Format selector */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
        <h2 className="text-sm font-semibold text-zinc-200 mb-4">Target Format</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.id}
              onClick={() => setTargetFormat(f.id)}
              className={`rounded-lg px-3 py-2.5 text-left transition-all ${
                targetFormat === f.id
                  ? "bg-amber-500/15 border border-amber-600/40 text-amber-300"
                  : "bg-zinc-800 border border-zinc-700 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
              }`}
            >
              <p className="text-xs font-semibold">{f.label}</p>
              <p className="text-xs opacity-60 mt-0.5 leading-tight">{f.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
          <label htmlFor="sys-prompt" className="block text-sm font-medium text-zinc-300 mb-3">
            System Prompt
            <span className="ml-2 text-xs font-normal text-zinc-600">(optional)</span>
          </label>
          <textarea
            id="sys-prompt"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="You are a helpful assistant..."
            rows={8}
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2.5 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder:text-zinc-700"
          />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
          <label htmlFor="user-message" className="block text-sm font-medium text-zinc-300 mb-3">
            User Message
          </label>
          <textarea
            id="user-message"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Write a function that..."
            rows={8}
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2.5 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder:text-zinc-700"
          />
        </div>
      </div>

      {/* Output */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-900/40">
          <div>
            <span className="text-sm font-medium text-zinc-300">{selectedFormat.label}</span>
            <span className="ml-2 text-xs text-zinc-600">formatted output</span>
          </div>
          <button
            onClick={handleCopy}
            disabled={!formatted}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              copied
                ? "bg-emerald-500/15 border border-emerald-600/40 text-emerald-400"
                : "bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 disabled:opacity-40 disabled:cursor-not-allowed"
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
        <pre className="p-5 text-sm font-mono text-zinc-300 overflow-x-auto whitespace-pre-wrap min-h-[200px] max-h-[400px] overflow-y-auto">
          {formatted || (
            <span className="text-zinc-700">
              Enter a system prompt and/or user message above to see the formatted output...
            </span>
          )}
        </pre>
      </div>

      <p className="text-xs text-zinc-600 text-center">
        Formats are based on each model's official documentation. Some providers may have updated their formats — verify before using in production.
      </p>
    </div>
  );
}
