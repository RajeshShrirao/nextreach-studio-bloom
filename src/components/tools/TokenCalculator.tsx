import { useState, useCallback } from "react";

// Approximate tokenization based on well-known rules
// This mirrors cl100k_base behavior closely enough for estimates

const MODEL_CONFIGS = {
  "claude-3-5-sonnet": { label: "Claude 3.5 Sonnet", contextWindow: 200000, provider: "Anthropic" },
  "claude-3-5-haiku": { label: "Claude 3.5 Haiku", contextWindow: 200000, provider: "Anthropic" },
  "claude-3-opus": { label: "Claude 3 Opus", contextWindow: 200000, provider: "Anthropic" },
  "gpt-4o": { label: "GPT-4o", contextWindow: 128000, provider: "OpenAI" },
  "gpt-4o-mini": { label: "GPT-4o Mini", contextWindow: 128000, provider: "OpenAI" },
  "gpt-4-turbo": { label: "GPT-4 Turbo", contextWindow: 128000, provider: "OpenAI" },
  "gemini-1-5-pro": { label: "Gemini 1.5 Pro", contextWindow: 2000000, provider: "Google" },
  "gemini-1-5-flash": { label: "Gemini 1.5 Flash", contextWindow: 1000000, provider: "Google" },
  "gemini-2-0-flash": { label: "Gemini 2.0 Flash", contextWindow: 1000000, provider: "Google" },
  "llama-3-70b": { label: "Llama 3 70B", contextWindow: 128000, provider: "Meta" },
  "llama-3-8b": { label: "Llama 3 8B", contextWindow: 8192, provider: "Meta" },
  "mistral-large": { label: "Mistral Large", contextWindow: 131072, provider: "Mistral AI" },
  "mistral-7b": { label: "Mistral 7B", contextWindow: 32768, provider: "Mistral AI" },
  "phi-3-mini": { label: "Phi-3 Mini", contextWindow: 128000, provider: "Microsoft" },
  "deepseek-v3": { label: "DeepSeek V3", contextWindow: 64000, provider: "DeepSeek" },
};

type ModelKey = keyof typeof MODEL_CONFIGS;

function estimateTokens(text: string): number {
  if (!text) return 0;
  // BPE-like approximation: ~4 chars per token for English prose
  // Code tends to have smaller tokens (~3 chars each)
  // We do a simple heuristic split
  const words = text.split(/\s+/).filter(Boolean);
  let tokens = 0;
  for (const word of words) {
    if (word.length <= 4) {
      tokens += 1;
    } else if (word.length <= 8) {
      tokens += 2;
    } else {
      tokens += Math.ceil(word.length / 3.5);
    }
  }
  // Add tokens for punctuation and whitespace
  tokens += Math.ceil((text.match(/[^a-zA-Z0-9\s]/g) || []).length * 0.5);
  return Math.max(1, tokens);
}

export default function TokenCalculator() {
  const [text, setText] = useState("");
  const [selectedModel, setSelectedModel] = useState<ModelKey>("claude-3-5-sonnet");

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  const tokenCount = estimateTokens(text);
  const model = MODEL_CONFIGS[selectedModel];
  const contextUsed = (tokenCount / model.contextWindow) * 100;
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const contextBarColor =
    contextUsed > 90
      ? "bg-red-500"
      : contextUsed > 70
      ? "bg-amber-500"
      : "bg-emerald-500";

  return (
    <div className="space-y-6">
      {/* Model Selector */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
        <label htmlFor="model-select" className="block text-sm font-medium text-zinc-300 mb-3">
          Select Model
        </label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value as ModelKey)}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 cursor-pointer"
        >
          {Object.entries(
            Object.entries(MODEL_CONFIGS).reduce<Record<string, [string, (typeof MODEL_CONFIGS)[ModelKey]][]>>(
              (acc, [key, config]) => {
                if (!acc[config.provider]) acc[config.provider] = [];
                acc[config.provider].push([key, config]);
                return acc;
              },
              {}
            )
          ).map(([provider, models]) => (
            <optgroup key={provider} label={provider}>
              {models.map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label} — {(config.contextWindow / 1000).toFixed(0)}K ctx
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <p className="mt-2 text-xs text-zinc-600">
          Context window: <span className="text-zinc-400 font-mono">{model.contextWindow.toLocaleString()} tokens</span>
        </p>
      </div>

      {/* Text Input */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
        <label htmlFor="token-input" className="block text-sm font-medium text-zinc-300 mb-3">
          Paste your prompt or text
        </label>
        <textarea
          id="token-input"
          value={text}
          onChange={handleTextChange}
          placeholder="Paste your prompt, system message, or any text here to count tokens..."
          rows={12}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 px-4 py-3 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 placeholder:text-zinc-600"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Tokens", value: tokenCount.toLocaleString(), highlight: true },
          { label: "Characters", value: charCount.toLocaleString() },
          { label: "Words", value: wordCount.toLocaleString() },
          { label: "Context Used", value: `${contextUsed.toFixed(1)}%` },
        ].map(({ label, value, highlight }) => (
          <div
            key={label}
            className={`rounded-xl border p-4 text-center ${
              highlight
                ? "border-amber-700/40 bg-amber-500/5"
                : "border-zinc-800 bg-zinc-900/40"
            }`}
          >
            <p className={`text-2xl font-semibold font-mono mb-0.5 ${highlight ? "text-amber-400" : "text-white"}`}>
              {value}
            </p>
            <p className="text-xs text-zinc-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Context Window Bar */}
      {text && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-zinc-300">Context Window Usage</p>
            <p className="text-sm font-mono text-zinc-400">
              {tokenCount.toLocaleString()} / {model.contextWindow.toLocaleString()}
            </p>
          </div>
          <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${contextBarColor}`}
              style={{ width: `${Math.min(100, contextUsed)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-zinc-600">
            {contextUsed > 90 ? (
              <span className="text-red-400">⚠ Approaching context limit — consider trimming your input</span>
            ) : contextUsed > 70 ? (
              <span className="text-amber-400">Context usage is getting high</span>
            ) : (
              <span className="text-zinc-500">
                {(model.contextWindow - tokenCount).toLocaleString()} tokens remaining in context window
              </span>
            )}
          </p>
        </div>
      )}

      {/* Note */}
      <p className="text-xs text-zinc-600 text-center leading-relaxed">
        Token counts are estimates using BPE approximation. Actual counts may vary slightly by model.
        For exact counts, use each provider&apos;s official tokenizer API.
      </p>
    </div>
  );
}
