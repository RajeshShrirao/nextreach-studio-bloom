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
];

const TOKEN_TYPES = [
  { id: "system", label: "System Prompt", color: "bg-purple-500", colorText: "text-purple-400", border: "border-purple-500/20", placeholder: "Instructions, persona definitions, or default guidelines..." },
  { id: "history", label: "Conversation History", color: "bg-blue-500", colorText: "text-blue-400", border: "border-blue-500/20", placeholder: "Previous questions and replies in the current thread..." },
  { id: "documents", label: "Pasted Documents / Files", color: "bg-emerald-500", colorText: "text-emerald-400", border: "border-emerald-500/20", placeholder: "Source code files, documentation pages, raw databases..." },
  { id: "query", label: "Current Query", color: "bg-amber-500", colorText: "text-amber-400", border: "border-amber-500/20", placeholder: "The actual instructions or questions being executed..." },
  { id: "reserved", label: "Reserved for Output", color: "bg-red-500", colorText: "text-red-400", border: "border-red-500/20", placeholder: "Anticipated length of completion tokens..." },
];

export default function ContextCalculator() {
  const [selectedModel, setSelectedModel] = useState("claude-3-5-sonnet");
  const [tokenInputs, setTokenInputs] = useState<Record<string, string>>({
    system: "You are a senior full-stack developer helping clean code refactors.",
    history: "User: How do I build a binary search tree?\nAssistant: [Tree code output]",
    documents: "function binarySearchTree() {\n  // Source code implementation\n}",
    query: "Optimize the performance of this binary tree function for high throughput.",
    reserved: "1500",
  });
  const [manualMode, setManualMode] = useState(false);
  const [manualTokens, setManualTokens] = useState<Record<string, string>>({
    system: "100",
    history: "450",
    documents: "1200",
    query: "150",
    reserved: "1000",
  });

  const model = MODELS.find((m) => m.id === selectedModel)!;

  const tokenCounts = TOKEN_TYPES.map((t) => {
    const tokens = manualMode
      ? parseInt(manualTokens[t.id] || "0") || 0
      : t.id === "reserved"
      ? parseInt(tokenInputs[t.id] || "0") || 0
      : estimateTokens(tokenInputs[t.id] || "");
    return { ...t, tokens };
  });

  const totalUsed = tokenCounts.reduce((sum, t) => sum + t.tokens, 0);
  const remaining = model.contextWindow - totalUsed;

  const loadSamplePreset = () => {
    if (manualMode) {
      setManualTokens({
        system: "150",
        history: "1400",
        documents: "15000",
        query: "200",
        reserved: "2000",
      });
    } else {
      setTokenInputs({
        system: "Analyze logs and detect architectural vulnerabilities.",
        history: "User: Uploading raw server logs for June.\nAssistant: Acknowledged.",
        documents: "[LOG_START]\nERROR 500: Database connection failure in query\nCRITICAL: CPU threshold exceeded 95%\n[LOG_END]",
        query: "Generate a summary detailing root causes and recommended mitigation fixes.",
        reserved: "2000",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Control Panel */}
      <div className="card-premium">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <label htmlFor="ctx-model" className="form-label-premium">
              Select Target Model
            </label>
            <select
              id="ctx-model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="form-select-premium"
            >
              {MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label} ({m.provider}) — {(m.contextWindow / 1000).toFixed(0)}K limits
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 mt-1 sm:mt-6 shrink-0">
            <button
              onClick={() => setManualMode(false)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                !manualMode
                  ? "bg-amber-400/20 border-amber-400/40 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.1)]"
                  : "bg-white/5 border-white/5 text-zinc-500 hover:text-zinc-300 hover:bg-white/10"
              }`}
            >
              Paste Text
            </button>
            <button
              onClick={() => setManualMode(true)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                manualMode
                  ? "bg-amber-400/20 border-amber-400/40 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.1)]"
                  : "bg-white/5 border-white/5 text-zinc-500 hover:text-zinc-300 hover:bg-white/10"
              }`}
            >
              Token Inputs
            </button>
            <button
              onClick={loadSamplePreset}
              className="rounded-lg px-3.5 py-2 text-xs font-semibold border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850 hover:border-zinc-700 transition-all cursor-pointer"
            >
              Load Sample Preset
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input Breakdowns (Span 3) */}
        <div className="lg:col-span-3 space-y-4">
          {tokenCounts.map((t) => {
            const isReserved = t.id === "reserved";
            return (
              <div key={t.id} className={`card-premium-flat border-l-4 !border-l-${t.id === "system" ? "purple-500" : t.id === "history" ? "blue-500" : t.id === "documents" ? "emerald-500" : t.id === "query" ? "amber-500" : "red-500"} !p-4.5`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${t.color}`} />
                    <label htmlFor={`ctx-${t.id}`} className="text-sm font-semibold text-zinc-200">
                      {t.label}
                    </label>
                  </div>
                  <span className="font-mono text-xs font-semibold text-zinc-400 bg-zinc-900 border border-white/5 px-2 py-0.5 rounded-md">
                    {t.tokens.toLocaleString()} tokens
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
                    placeholder="Enter manual tokens..."
                    className="form-input-premium font-mono"
                  />
                ) : isReserved ? (
                  <input
                    id={`ctx-${t.id}`}
                    type="number"
                    min={0}
                    value={tokenInputs[t.id]}
                    onChange={(e) =>
                      setTokenInputs((prev) => ({ ...prev, [t.id]: e.target.value }))
                    }
                    placeholder="Enter reserved completion tokens..."
                    className="form-input-premium font-mono"
                  />
                ) : (
                  <textarea
                    id={`ctx-${t.id}`}
                    value={tokenInputs[t.id]}
                    onChange={(e) =>
                      setTokenInputs((prev) => ({ ...prev, [t.id]: e.target.value }))
                    }
                    placeholder={t.placeholder}
                    rows={2}
                    className="form-textarea-premium font-mono text-xs !min-h-[64px] leading-relaxed"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Visual Summary (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Analysis Dashboard */}
          <div className="card-premium">
            <h2 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-4 font-display">Context Utilization</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-white/[0.03] pb-3">
                <span className="text-xs text-zinc-500">Total Consumption</span>
                <span className="font-mono text-lg font-bold text-white">
                  {totalUsed.toLocaleString()} <span className="text-xs text-zinc-500 font-normal">/ {model.contextWindow.toLocaleString()}</span>
                </span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs text-zinc-500">Remaining Cushion</span>
                <span className={`font-mono text-lg font-bold ${remaining < 0 ? "text-red-400" : "text-emerald-400"}`}>
                  {remaining.toLocaleString()} <span className="text-xs font-normal">tokens</span>
                </span>
              </div>
            </div>

            {/* Visual breakdown bar */}
            <div className="my-6">
              <div className="h-4.5 rounded-full overflow-hidden bg-zinc-950 flex border border-white/5 p-[1px]">
                {tokenCounts
                  .filter((t) => t.tokens > 0)
                  .map((t) => {
                    const widthPct = (t.tokens / model.contextWindow) * 100;
                    return (
                      <div
                        key={t.id}
                        className={`h-full ${t.color} transition-all duration-300`}
                        style={{ width: `${Math.min(100, widthPct)}%` }}
                        title={`${t.label}: ${t.tokens.toLocaleString()} tokens`}
                      />
                    );
                  })}
              </div>
            </div>

            {/* Detailed legend breakdown */}
            <div className="space-y-2">
              {tokenCounts.map((t) => {
                const typePct = (t.tokens / model.contextWindow) * 100;
                return (
                  <div key={t.id} className="flex items-center justify-between text-xs p-1.5 hover:bg-white/[0.01] rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${t.color}`} />
                      <span className="text-zinc-400 font-medium">{t.label}</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-zinc-500">
                      <span>{t.tokens.toLocaleString()}</span>
                      <span className={`w-10 text-right ${t.tokens > 0 ? "text-zinc-300" : "text-zinc-600"}`}>{typePct.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Warning System Banner */}
          <div
            className={`rounded-2xl p-4.5 border transition-all duration-300 ${
              remaining < 0
                ? "bg-red-950/20 border-red-800/30 text-red-400 shadow-[0_0_16px_rgba(239,68,68,0.06)]"
                : remaining < model.contextWindow * 0.15
                ? "bg-amber-950/20 border-amber-800/30 text-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.06)]"
                : "bg-emerald-950/15 border-emerald-800/20 text-emerald-400"
            }`}
          >
            <p className="text-sm font-semibold flex items-center gap-1.5 mb-1.5">
              <span>{remaining < 0 ? "⚠️ Context Exceeded" : remaining < model.contextWindow * 0.15 ? "⚠️ Approaching Limit" : "✓ Safe Allocation"}</span>
            </p>
            <p className="text-xs leading-relaxed opacity-80">
              {remaining < 0
                ? `Prompt exceeds model limits by ${Math.abs(remaining).toLocaleString()} tokens. Text will be truncated or fail standard API processing.`
                : remaining < model.contextWindow * 0.15
                ? "Remaining context is sparse. Completion generation may fail to return full answer before model stops."
                : "Total tokens occupy a safe fraction of context window. You have ample capacity left."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
