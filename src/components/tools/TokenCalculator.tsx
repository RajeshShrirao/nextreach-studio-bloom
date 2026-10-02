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
        <div className="card-studio p-6">
          <label htmlFor="model-select" className="form-label-premium flex justify-between items-center">
            <span className="text-[#1F1F23] font-semibold text-xs uppercase tracking-wider">Select Target Model</span>
            <span className="text-[11px] font-mono text-[#6E6862] normal-case">Updates context limits below</span>
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
                    {config.label} - {(config.contextWindow / 1000).toFixed(0)}K context limit
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className="mt-3 flex items-center justify-between text-xs text-[#6E6862]">
            <span>Context Limit:</span>
            <span className="text-[#1F1F23] font-mono font-medium">{model.contextWindow.toLocaleString()} tokens</span>
          </div>
        </div>

        {/* Text Input */}
        <div className="card-studio p-6">
          <div className="flex items-center justify-between mb-3">
            <label htmlFor="token-input" className="form-label-premium !mb-0 text-[#1F1F23] font-semibold text-xs uppercase tracking-wider">
              Paste prompt or context
            </label>
            <div className="flex gap-2">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.label}
                  onClick={() => setText(tmpl.text)}
                  className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#1F1F23]/10 text-[11px] font-medium text-[#4A4844] hover:text-[#1F1F23] hover:bg-[#FAF8F5]/80 hover:border-[#1F1F23]/20 transition-colors cursor-pointer"
                >
                  {tmpl.label}
                </button>
              ))}
              {text && (
                <button
                  onClick={() => setText("")}
                  className="px-2.5 py-1 rounded-lg bg-red-50 border border-red-200 text-[11px] font-medium text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
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
        <div className="card-studio p-6">
          <h2 className="text-xs uppercase tracking-wider text-[#6E6862] font-bold mb-4">Prompt Metrics</h2>
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
                    ? "bg-[#C76B50]/5 border-[#C76B50]/20"
                    : "bg-[#FAF8F5] border-[#1F1F23]/8"
                }`}
              >
                <span className="text-[10px] text-[#6E6862] font-bold uppercase tracking-wider mb-1">{label}</span>
                <span className={`text-xl font-semibold font-mono tracking-tight ${highlight ? "text-[#C76B50]" : "text-[#1F1F23]"}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Bar representation */}
        <div className="card-studio p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#1F1F23]">Context Allocation</span>
            <span className="text-xs font-mono text-[#6E6862]">
              {tokenCount.toLocaleString()} / {model.contextWindow.toLocaleString()}
            </span>
          </div>

          <div className="h-3 rounded-full bg-[#FAF8F5] overflow-hidden border border-[#1F1F23]/10 p-[1px]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${contextBarColor}`}
              style={{ width: `${Math.min(100, contextUsed)}%` }}
            />
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#1F1F23]/8">
            {contextUsed > 90 ? (
              <p className="text-xs text-red-600 font-medium leading-relaxed flex items-start gap-1.5">
                <span>⚠</span>
                <span>Critical prompt length. This may trigger rate limits or truncate responses. Consider trimming input context.</span>
              </p>
            ) : contextUsed > 70 ? (
              <p className="text-xs text-amber-700 font-medium leading-relaxed flex items-start gap-1.5">
                <span>⚠</span>
                <span>Context usage is getting high. Verify whether additional context history is required.</span>
              </p>
            ) : (
              <p className="text-xs text-[#6E6862] leading-relaxed">
                You have <span className="font-mono text-[#1F1F23] font-semibold">{(model.contextWindow - tokenCount).toLocaleString()}</span> tokens remaining for system messages and completions.
              </p>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 rounded-xl border border-[#1F1F23]/8 bg-[#FAF8F5] text-center">
          <p className="text-[11px] text-[#6E6862] leading-relaxed">
            Estimates are computed using Byte Pair Encoding (BPE) algorithms resembling Anthropic & OpenAI rules. Raw counts may fluctuate slightly.
          </p>
        </div>
      </div>
    </div>
  );
}
