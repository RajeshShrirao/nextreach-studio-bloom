import { useState } from "react";
import { estimateTokens } from "@/utils/tokens";

const MODELS = [
  // Anthropic
  { id: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet", provider: "Anthropic", contextWindow: 200000 },
  { id: "claude-3-5-haiku", label: "Claude 3.5 Haiku", provider: "Anthropic", contextWindow: 200000 },
  { id: "claude-3-opus", label: "Claude 3 Opus", provider: "Anthropic", contextWindow: 200000 },
  // OpenAI
  { id: "gpt-4o", label: "GPT-4o", provider: "OpenAI", contextWindow: 128000 },
  { id: "gpt-4o-mini", label: "GPT-4o Mini", provider: "OpenAI", contextWindow: 128000 },
  { id: "o1", label: "o1", provider: "OpenAI", contextWindow: 128000 },
  // Google
  { id: "gemini-2-0-flash", label: "Gemini 2.0 Flash", provider: "Google", contextWindow: 1000000 },
  { id: "gemini-1-5-pro", label: "Gemini 1.5 Pro", provider: "Google", contextWindow: 2000000 },
  // Llama
  { id: "llama-3-70b", label: "Llama 3 70B", provider: "Meta", contextWindow: 128000 },
  { id: "llama-3-1-405b", label: "Llama 3.1 405B", provider: "Meta", contextWindow: 128000 },
  // Mistral
  { id: "mistral-large", label: "Mistral Large 2", provider: "Mistral AI", contextWindow: 131072 },
  { id: "mixtral-8x22b", label: "Mixtral 8x22B", provider: "Mistral AI", contextWindow: 65536 },
  // Others
  { id: "deepseek-v3", label: "DeepSeek V3", provider: "DeepSeek", contextWindow: 64000 },
  { id: "phi-3-mini", label: "Phi-3 Mini", provider: "Microsoft", contextWindow: 128000 },
  { id: "qwen-2-5-72b", label: "Qwen 2.5 72B", provider: "Alibaba", contextWindow: 131072 },
];

const TOKEN_TYPES = [
  { id: "system", label: "System Prompt", color: "bg-purple-500", placeholder: "System prompt tokens..." },
  { id: "history", label: "Conversation History", color: "bg-blue-500", placeholder: "Previous messages..." },
  { id: "documents", label: "Documents / Context", color: "bg-emerald-500", placeholder: "Pasted files, docs..." },
  { id: "query", label: "Current Query", color: "bg-amber-500", placeholder: "Current user message..." },
  { id: "reserved", label: "Reserved for Output", color: "bg-red-500", placeholder: "Expected output length..." },
];

export default function ContextCalculator() {
  const [selectedModel, setSelectedModel] = useState("claude-3-5-sonnet");
  const [tokenInputs, setTokenInputs] = useState<Record<string, string>>({
    system: "",
    history: "",
    documents: "",
    query: "",
    reserved: "",
  });
  const [manualMode, setManualMode] = useState(false);
  const [manualTokens, setManualTokens] = useState<Record<string, string>>({
    system: "0",
    history: "0",
    documents: "0",
    query: "0",
    reserved: "0",
  });

  const model = MODELS.find((m) => m.id === selectedModel)!;

  const tokenCounts = TOKEN_TYPES.map((t) => ({
    ...t,
    tokens: manualMode
      ? parseInt(manualTokens[t.id] || "0") || 0
      : estimateTokens(tokenInputs[t.id] || ""),
  }));

  const totalUsed = tokenCounts.reduce((sum, t) => sum + t.tokens, 0);
  const remaining = model.contextWindow - totalUsed;
  const usedPct = Math.min(100, (totalUsed / model.contextWindow) * 100);

  return (
    <div className="space-y-6">
      {/* Model selector */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <label htmlFor="ctx-model" className="block text-sm font-medium text-zinc-300 mb-2">
              Model
            </label>
            <select
              id="ctx-model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
            >
              {MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label} ({m.provider}) — {(m.contextWindow / 1000).toFixed(0)}K tokens
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 mt-1 sm:mt-6">
            <button
              onClick={() => setManualMode(false)}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                !manualMode
                  ? "bg-amber-500/15 border border-amber-600/40 text-amber-300"
                  : "bg-zinc-800 border border-zinc-700 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Paste Text
            </button>
            <button
              onClick={() => setManualMode(true)}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                manualMode
                  ? "bg-amber-500/15 border border-amber-600/40 text-amber-300"
                  : "bg-zinc-800 border border-zinc-700 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Enter Tokens
            </button>
          </div>
        </div>
      </div>

      {/* Token breakdown inputs */}
      <div className="space-y-3">
        {tokenCounts.map((t) => (
          <div key={t.id} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${t.color}`} />
                <label htmlFor={`ctx-${t.id}`} className="text-sm font-medium text-zinc-300">
                  {t.label}
                </label>
              </div>
              <span className="font-mono text-sm text-zinc-400">
                {t.tokens.toLocaleString()} <span className="text-xs text-zinc-600">tokens</span>
              </span>
            </div>
            {manualMode ? (
              <input
                id={`ctx-${t.id}`}
                type="number"
                min={0}
                value={manualTokens[t.id]}
                onChange={(e) =>
                  setManualTokens((prev) => ({ ...prev, [t.id]: e.target.value }))
                }
                placeholder="Token count"
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            ) : (
              <textarea
                id={`ctx-${t.id}`}
                value={tokenInputs[t.id]}
                onChange={(e) =>
                  setTokenInputs((prev) => ({ ...prev, [t.id]: e.target.value }))
                }
                placeholder={t.placeholder}
                rows={3}
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder:text-zinc-700"
              />
            )}
          </div>
        ))}
      </div>

      {/* Visualization */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-200">Context window breakdown</h2>
          <span className="font-mono text-sm text-zinc-400">
            {totalUsed.toLocaleString()} / {model.contextWindow.toLocaleString()}
          </span>
        </div>

        {/* Stacked bar */}
        <div className="h-6 rounded-full overflow-hidden bg-zinc-800 flex mb-4">
          {tokenCounts
            .filter((t) => t.tokens > 0)
            .map((t) => (
              <div
                key={t.id}
                className={`h-full ${t.color} transition-all duration-300`}
                style={{ width: `${Math.min(100, (t.tokens / model.contextWindow) * 100)}%` }}
                title={`${t.label}: ${t.tokens.toLocaleString()} tokens`}
              />
            ))}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {tokenCounts.map((t) => (
            <div key={t.id} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full shrink-0 ${t.color}`} />
              <span className="text-xs text-zinc-500 truncate">{t.label}</span>
              <span className="text-xs text-zinc-600 font-mono ml-auto shrink-0">{t.tokens.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* Status */}
        <div
          className={`rounded-lg p-3 ${
            remaining < 0
              ? "bg-red-950/40 border border-red-800/40"
              : remaining < model.contextWindow * 0.1
              ? "bg-amber-950/40 border border-amber-800/40"
              : "bg-emerald-950/30 border border-emerald-800/30"
          }`}
        >
          <p
            className={`text-sm font-medium ${
              remaining < 0 ? "text-red-400" : remaining < model.contextWindow * 0.1 ? "text-amber-400" : "text-emerald-400"
            }`}
          >
            {remaining < 0
              ? `⚠ Over limit by ${Math.abs(remaining).toLocaleString()} tokens`
              : `${remaining.toLocaleString()} tokens remaining (${(100 - usedPct).toFixed(1)}%)`}
          </p>
        </div>
      </div>
    </div>
  );
}
