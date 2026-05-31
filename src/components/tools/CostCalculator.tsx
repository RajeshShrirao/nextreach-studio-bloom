import { useState } from "react";

const MODELS = [
  // Anthropic
  { id: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet", provider: "Anthropic", inputCost: 3.0, outputCost: 15.0, contextWindow: 200000 },
  { id: "claude-3-5-haiku", label: "Claude 3.5 Haiku", provider: "Anthropic", inputCost: 0.8, outputCost: 4.0, contextWindow: 200000 },
  { id: "claude-3-opus", label: "Claude 3 Opus", provider: "Anthropic", inputCost: 15.0, outputCost: 75.0, contextWindow: 200000 },
  // OpenAI
  { id: "gpt-4o", label: "GPT-4o", provider: "OpenAI", inputCost: 2.5, outputCost: 10.0, contextWindow: 128000 },
  { id: "gpt-4o-mini", label: "GPT-4o Mini", provider: "OpenAI", inputCost: 0.15, outputCost: 0.6, contextWindow: 128000 },
  { id: "gpt-4-turbo", label: "GPT-4 Turbo", provider: "OpenAI", inputCost: 10.0, outputCost: 30.0, contextWindow: 128000 },
  { id: "o1", label: "o1", provider: "OpenAI", inputCost: 15.0, outputCost: 60.0, contextWindow: 128000 },
  { id: "o1-mini", label: "o1-mini", provider: "OpenAI", inputCost: 1.1, outputCost: 4.4, contextWindow: 128000 },
  // Google
  { id: "gemini-2-0-flash", label: "Gemini 2.0 Flash", provider: "Google", inputCost: 0.1, outputCost: 0.4, contextWindow: 1000000 },
  { id: "gemini-1-5-pro", label: "Gemini 1.5 Pro", provider: "Google", inputCost: 1.25, outputCost: 5.0, contextWindow: 2000000 },
  { id: "gemini-1-5-flash", label: "Gemini 1.5 Flash", provider: "Google", inputCost: 0.075, outputCost: 0.3, contextWindow: 1000000 },
  // Mistral
  { id: "mistral-large", label: "Mistral Large", provider: "Mistral AI", inputCost: 2.0, outputCost: 6.0, contextWindow: 131072 },
  { id: "mistral-small", label: "Mistral Small", provider: "Mistral AI", inputCost: 0.2, outputCost: 0.6, contextWindow: 131072 },
  // Groq
  { id: "llama-3-70b-groq", label: "Llama 3 70B (Groq)", provider: "Groq", inputCost: 0.59, outputCost: 0.79, contextWindow: 8192 },
  { id: "llama-3-8b-groq", label: "Llama 3 8B (Groq)", provider: "Groq", inputCost: 0.05, outputCost: 0.08, contextWindow: 8192 },
  // Together AI
  { id: "llama-3-70b-together", label: "Llama 3 70B (Together)", provider: "Together AI", inputCost: 0.88, outputCost: 0.88, contextWindow: 8192 },
  // DeepSeek
  { id: "deepseek-v3", label: "DeepSeek V3", provider: "DeepSeek", inputCost: 0.27, outputCost: 1.1, contextWindow: 64000 },
  { id: "deepseek-r1", label: "DeepSeek R1", provider: "DeepSeek", inputCost: 0.55, outputCost: 2.19, contextWindow: 64000 },
];

export default function CostCalculator() {
  const [selectedModels, setSelectedModels] = useState<string[]>(["claude-3-5-sonnet", "gpt-4o", "gemini-2-0-flash", "deepseek-v3"]);
  const [inputTokens, setInputTokens] = useState(5000);
  const [outputTokens, setOutputTokens] = useState(2000);
  const [requests, setRequests] = useState(5000);

  const toggleModel = (id: string) => {
    setSelectedModels((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const calculateCost = (model: typeof MODELS[0]) => {
    const inputCost = (inputTokens / 1_000_000) * model.inputCost * requests;
    const outputCost = (outputTokens / 1_000_000) * model.outputCost * requests;
    return inputCost + outputCost;
  };

  const results = MODELS.filter((m) => selectedModels.includes(m.id))
    .map((m) => ({ ...m, totalCost: calculateCost(m) }))
    .sort((a, b) => a.totalCost - b.totalCost);

  const cheapest = results[0];
  const mostExpensive = results[results.length - 1];
  const savings = cheapest && mostExpensive ? mostExpensive.totalCost - cheapest.totalCost : 0;

  const byProvider = MODELS.reduce<Record<string, typeof MODELS>>((acc, m) => {
    if (!acc[m.provider]) acc[m.provider] = [];
    acc[m.provider].push(m);
    return acc;
  }, {});

  const getProviderColor = (provider: string) => {
    switch (provider.toLowerCase()) {
      case "anthropic": return "text-purple-400 bg-purple-500/10 border-purple-500/20";
      case "openai": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "google": return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "deepseek": return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
      default: return "text-zinc-400 bg-zinc-500/10 border-zinc-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Grid */}
      <div className="card-premium">
        <h2 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-4">Usage Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="input-tokens" className="form-label-premium">
              Input Tokens per API Request
            </label>
            <div className="relative">
              <input
                id="input-tokens"
                type="number"
                min={1}
                value={inputTokens}
                onChange={(e) => setInputTokens(Math.max(1, parseInt(e.target.value) || 0))}
                className="form-input-premium font-mono pr-12"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-600 font-mono">tokens</span>
            </div>
            <p className="mt-2 text-xs text-zinc-500 flex justify-between">
              <span>Approx. Word Count:</span>
              <span className="font-mono text-zinc-400">~{Math.round(inputTokens * 0.75).toLocaleString()} words</span>
            </p>
          </div>

          <div>
            <label htmlFor="output-tokens" className="form-label-premium">
              Completion Tokens per Request
            </label>
            <div className="relative">
              <input
                id="output-tokens"
                type="number"
                min={1}
                value={outputTokens}
                onChange={(e) => setOutputTokens(Math.max(1, parseInt(e.target.value) || 0))}
                className="form-input-premium font-mono pr-12"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-600 font-mono">tokens</span>
            </div>
            <p className="mt-2 text-xs text-zinc-500 flex justify-between">
              <span>Approx. Word Count:</span>
              <span className="font-mono text-zinc-400">~{Math.round(outputTokens * 0.75).toLocaleString()} words</span>
            </p>
          </div>

          <div>
            <label htmlFor="request-count" className="form-label-premium">
              Volume / Month
            </label>
            <div className="relative">
              <input
                id="request-count"
                type="number"
                min={1}
                value={requests}
                onChange={(e) => setRequests(Math.max(1, parseInt(e.target.value) || 0))}
                className="form-input-premium font-mono pr-12"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-600 font-mono">calls</span>
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Total volume: <span className="text-zinc-400 font-mono">{(requests * (inputTokens + outputTokens)).toLocaleString()} tokens</span>
            </p>
          </div>
        </div>
      </div>

      {/* Selector Grid */}
      <div className="card-premium">
        <h2 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-3">Target Models for Comparison</h2>
        <div className="space-y-4">
          {Object.entries(byProvider).map(([provider, models]) => (
            <div key={provider} className="border-b border-white/[0.03] last:border-b-0 pb-3 last:pb-0">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2.5">{provider}</p>
              <div className="flex flex-wrap gap-2">
                {models.map((model) => {
                  const isSelected = selectedModels.includes(model.id);
                  return (
                    <button
                      key={model.id}
                      onClick={() => toggleModel(model.id)}
                      className={`rounded-lg px-3.5 py-2 text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-amber-400/20 border-amber-400/40 text-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.12)] font-medium"
                          : "bg-white/5 border-white/5 text-zinc-500 hover:text-zinc-300 hover:bg-white/10"
                      }`}
                    >
                      {model.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Dashboard */}
      {results.length > 0 && (
        <div className="card-premium !p-0 overflow-hidden">
          <div className="p-5 border-b border-white/[0.06] bg-white/[0.01] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-zinc-200">Monthly Billing Projections</h2>
              <p className="text-xs text-zinc-500 mt-1">Relative comparison sorted by cheapest API provider</p>
            </div>
            {savings > 0.01 && (
              <div className="rounded-xl px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto shadow-[0_0_12px_rgba(52,211,153,0.1)]">
                <span>⚡ Save up to</span>
                <span className="font-mono text-[13px] font-bold">${savings.toFixed(2)}/mo</span>
              </div>
            )}
          </div>

          <div className="divide-y divide-white/[0.06] bg-zinc-950/20">
            {results.map((model, i) => {
              const isCheapest = i === 0;
              const pct = mostExpensive && mostExpensive.totalCost > 0 ? (model.totalCost / mostExpensive.totalCost) * 100 : 0;
              const modelColor = getProviderColor(model.provider);

              return (
                <div key={model.id} className="p-5 flex flex-col md:flex-row md:items-center gap-4 hover:bg-white/[0.01] transition-colors">
                  {/* Rank badge */}
                  <div className="flex items-center gap-3 md:w-36 shrink-0">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                      isCheapest ? "bg-amber-400/20 border border-amber-400/40 text-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.15)]" : "bg-zinc-900 border border-white/5 text-zinc-500"
                    }`}>
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-200 truncate leading-snug">{model.label}</p>
                      <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border mt-1 ${modelColor}`}>
                        {model.provider}
                      </span>
                    </div>
                  </div>

                  {/* Relative bar and pricing breakdown */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-500 font-mono">
                        ${model.inputCost.toFixed(2)}/M in · ${model.outputCost.toFixed(2)}/M out
                      </span>
                      <span className={`text-sm font-mono font-bold ${isCheapest ? "text-emerald-400" : "text-zinc-200"}`}>
                        ${model.totalCost.toFixed(2)}
                        <span className="text-xs text-zinc-500 font-normal">/mo</span>
                      </span>
                    </div>
                    
                    <div className="h-2.5 rounded-full bg-zinc-950 overflow-hidden border border-white/5 p-[1px]">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCheapest ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" : "bg-amber-400/50"
                        }`}
                        style={{ width: `${Math.max(2, pct)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-xs text-zinc-600 text-center leading-relaxed">
        Prices reflect public standard endpoints as of May 2026. Rate structures like Anthropic cache writes or prompt caching are not included in estimates.
      </p>
    </div>
  );
}
