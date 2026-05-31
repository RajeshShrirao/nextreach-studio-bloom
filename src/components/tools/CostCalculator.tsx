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
  const [selectedModels, setSelectedModels] = useState<string[]>(["claude-3-5-sonnet", "gpt-4o", "gemini-2-0-flash"]);
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [requests, setRequests] = useState(1000);

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

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
        <h2 className="text-sm font-semibold text-zinc-200 mb-4">Configure your usage</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="input-tokens" className="block text-xs font-medium text-zinc-400 mb-2">
              Input tokens per request
            </label>
            <input
              id="input-tokens"
              type="number"
              min={1}
              value={inputTokens}
              onChange={(e) => setInputTokens(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50"
            />
            <p className="mt-1 text-xs text-zinc-600">~{Math.round(inputTokens * 0.75)} words</p>
          </div>
          <div>
            <label htmlFor="output-tokens" className="block text-xs font-medium text-zinc-400 mb-2">
              Output tokens per request
            </label>
            <input
              id="output-tokens"
              type="number"
              min={1}
              value={outputTokens}
              onChange={(e) => setOutputTokens(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50"
            />
            <p className="mt-1 text-xs text-zinc-600">~{Math.round(outputTokens * 0.75)} words</p>
          </div>
          <div>
            <label htmlFor="request-count" className="block text-xs font-medium text-zinc-400 mb-2">
              Requests per month
            </label>
            <input
              id="request-count"
              type="number"
              min={1}
              value={requests}
              onChange={(e) => setRequests(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50"
            />
          </div>
        </div>
      </div>

      {/* Model Selection */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
        <h2 className="text-sm font-semibold text-zinc-200 mb-4">Select models to compare</h2>
        <div className="space-y-4">
          {Object.entries(byProvider).map(([provider, models]) => (
            <div key={provider}>
              <p className="text-xs font-medium text-zinc-600 uppercase tracking-wider mb-2">{provider}</p>
              <div className="flex flex-wrap gap-2">
                {models.map((model) => {
                  const isSelected = selectedModels.includes(model.id);
                  return (
                    <button
                      key={model.id}
                      onClick={() => toggleModel(model.id)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-amber-500/15 border border-amber-600/40 text-amber-300"
                          : "bg-zinc-800 border border-zinc-700 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
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

      {/* Results */}
      {results.length > 0 && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
          <div className="p-5 border-b border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-200">Monthly cost comparison</h2>
            {savings > 0.01 && (
              <p className="text-xs text-emerald-400 mt-1">
                You could save ${savings.toFixed(2)}/mo by choosing {cheapest?.label} over {mostExpensive?.label}
              </p>
            )}
          </div>
          <div className="divide-y divide-zinc-800">
            {results.map((model, i) => {
              const pct = mostExpensive ? (model.totalCost / mostExpensive.totalCost) * 100 : 100;
              return (
                <div key={model.id} className="p-4 flex items-center gap-4">
                  <div className="w-8 text-center">
                    {i === 0 ? (
                      <span className="text-emerald-400 text-lg">✓</span>
                    ) : (
                      <span className="text-xs text-zinc-600">#{i + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <span className="text-sm font-medium text-zinc-200">{model.label}</span>
                        <span className="ml-2 text-xs text-zinc-600">{model.provider}</span>
                      </div>
                      <span className={`text-sm font-mono font-semibold ${i === 0 ? "text-emerald-400" : "text-zinc-300"}`}>
                        ${model.totalCost < 0.01 ? model.totalCost.toFixed(4) : model.totalCost.toFixed(2)}
                        <span className="text-xs text-zinc-600 font-normal">/mo</span>
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${i === 0 ? "bg-emerald-500" : "bg-zinc-600"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-zinc-600">
                      ${model.inputCost}/M in · ${model.outputCost}/M out
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-xs text-zinc-600 text-center">
        Prices as of May 2026. Always verify with each provider's pricing page before making decisions.
      </p>
    </div>
  );
}
