import { useState, useCallback } from "react";
import { estimateTokens } from "@/utils/tokens";

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

const TEMPLATES = [
  {
    label: "📄 Coding Prompt",
    text: `// Refactor this React component to use custom hooks and optimize render cycles.
import React, { useState, useEffect } from 'react';

export default function UserDashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading dashboard...</div>;
  return <div>Welcome, {user.name}!</div>;
}`,
  },
  {
    label: "📊 Data Analysis",
    text: `Analyze the following CSV dataset for trends, anomalies, and potential business insights. Recommend 3 concrete action items.

Month,Signups,ChurnRate,Revenue
January,1200,0.023,$24000
February,1430,0.019,$28600
March,950,0.041,$19000
April,1100,0.032,$22000
May,1600,0.015,$32000
June,1750,0.012,$35000
July,1500,0.021,$30000`,
  },
];

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
      ? "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]"
      : contextUsed > 70
      ? "bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]"
      : "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Inputs (Left Panel - Span 2 Columns) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Model Selector */}
        <div className="card-premium-flat">
          <label htmlFor="model-select" className="form-label-premium flex justify-between items-center">
            <span>Select Target Model</span>
            <span className="text-[10px] font-mono text-zinc-500 normal-case">Updates context limits below</span>
          </label>
          <select
            id="model-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value as ModelKey)}
            className="form-select-premium font-sans"
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
                    {config.label} — {(config.contextWindow / 1000).toFixed(0)}K context limit
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
            <span>Context Limit:</span>
            <span className="text-zinc-300 font-mono font-medium">{model.contextWindow.toLocaleString()} tokens</span>
          </div>
        </div>

        {/* Text Input */}
        <div className="card-premium-flat">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="token-input" className="form-label-premium !mb-0">
              Paste prompt or context
            </label>
            <div className="flex gap-2">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.label}
                  onClick={() => setText(tmpl.text)}
                  className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-semibold text-zinc-400 hover:text-white hover:bg-zinc-850 hover:border-zinc-700 transition-colors cursor-pointer"
                >
                  {tmpl.label}
                </button>
              ))}
              {text && (
                <button
                  onClick={() => setText("")}
                  className="px-2 py-1 rounded bg-red-950/20 border border-red-900/30 text-[10px] font-semibold text-red-400 hover:bg-red-900/20 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <textarea
            id="token-input"
            value={text}
            onChange={handleTextChange}
            placeholder="Paste your system message, training dataset, code block, or general prompt here..."
            rows={12}
            className="form-textarea-premium font-mono text-sm leading-relaxed"
          />
        </div>
      </div>

      {/* Realtime Stats Dashboard (Right Panel - 1 Column) */}
      <div className="space-y-6">
        {/* Metric Grid Card */}
        <div className="card-premium">
          <h2 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-4">Prompt Metrics</h2>
          <div className="grid grid-cols-2 gap-3.5">
            {[
              { label: "Est. Tokens", value: tokenCount.toLocaleString(), highlight: true },
              { label: "Words", value: wordCount.toLocaleString() },
              { label: "Characters", value: charCount.toLocaleString() },
              { label: "Context Window", value: `${contextUsed.toFixed(1)}%` },
            ].map(({ label, value, highlight }) => (
              <div
                key={label}
                className={`p-4 rounded-xl border flex flex-col justify-center min-h-[90px] ${
                  highlight
                    ? "bg-amber-400/[0.03] border-amber-400/20 shadow-[inset_0_1px_0_0_rgba(251,191,36,0.06)]"
                    : "bg-white/[0.015] border-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.01)]"
                }`}
              >
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">{label}</span>
                <span className={`text-xl font-semibold font-mono tracking-tight ${highlight ? "text-amber-400 glow-text" : "text-white"}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Bar representation */}
        <div className="card-premium">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-300">Context Allocation</span>
            <span className="text-xs font-mono text-zinc-400">
              {tokenCount.toLocaleString()} / {model.contextWindow.toLocaleString()}
            </span>
          </div>

          <div className="h-3 rounded-full bg-zinc-950 overflow-hidden border border-white/5 p-[1px]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${contextBarColor}`}
              style={{ width: `${Math.min(100, contextUsed)}%` }}
            />
          </div>

          <div className="mt-4 p-3 rounded-lg bg-zinc-950/40 border border-white/[0.02]">
            {contextUsed > 90 ? (
              <p className="text-xs text-red-400 font-medium leading-relaxed flex items-start gap-1.5">
                <span>⚠</span>
                <span>Critical prompt length. This may trigger rate limits or truncate responses. Consider trimming input context.</span>
              </p>
            ) : contextUsed > 70 ? (
              <p className="text-xs text-amber-400 font-medium leading-relaxed flex items-start gap-1.5">
                <span>⚠</span>
                <span>Context usage is getting high. Verify whether additional context history is required.</span>
              </p>
            ) : (
              <p className="text-xs text-zinc-500 leading-relaxed">
                You have <span className="font-mono text-zinc-400">{(model.contextWindow - tokenCount).toLocaleString()}</span> tokens remaining for system messages and model completions.
              </p>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 text-center">
          <p className="text-[11px] text-zinc-600 leading-relaxed">
            Estimates are computed using Byte Pair Encoding (BPE) algorithms resembling Anthropic & OpenAI rules. Raw counts may fluctuate.
          </p>
        </div>
      </div>
    </div>
  );
}
