import { useState } from "react";

// VRAM requirements based on model size, quantization, and overhead
// Formula: params * bytes_per_param + overhead

const QUANTIZATIONS = [
  { id: "f32", label: "FP32 (full precision)", bytesPerParam: 4, note: "Training / reference use" },
  { id: "f16", label: "FP16 / BF16", bytesPerParam: 2, note: "Standard inference" },
  { id: "q8", label: "Q8 (8-bit)", bytesPerParam: 1, note: "Good quality, 2x smaller" },
  { id: "q6", label: "Q6_K", bytesPerParam: 0.75, note: "Minimal quality loss" },
  { id: "q5", label: "Q5_K_M", bytesPerParam: 0.625, note: "Good balance" },
  { id: "q4", label: "Q4_K_M", bytesPerParam: 0.5, note: "Most popular, slight quality loss" },
  { id: "q3", label: "Q3_K_M", bytesPerParam: 0.375, note: "Lower quality" },
  { id: "q2", label: "Q2_K", bytesPerParam: 0.25, note: "Heavily quantized — noticeable loss" },
];

const PRESETS = [
  { id: "llama-3-8b", label: "Llama 3 8B", params: 8 },
  { id: "llama-3-70b", label: "Llama 3 70B", params: 70 },
  { id: "llama-3-405b", label: "Llama 3 405B", params: 405 },
  { id: "mistral-7b", label: "Mistral 7B", params: 7 },
  { id: "mixtral-8x7b", label: "Mixtral 8x7B", params: 47, note: "MoE (active params ~13B)" },
  { id: "phi-3-mini", label: "Phi-3 Mini (3.8B)", params: 3.8 },
  { id: "phi-3-medium", label: "Phi-3 Medium (14B)", params: 14 },
  { id: "qwen-2-5-7b", label: "Qwen 2.5 7B", params: 7 },
  { id: "qwen-2-5-72b", label: "Qwen 2.5 72B", params: 72 },
  { id: "deepseek-v3", label: "DeepSeek V3 (685B MoE)", params: 685, note: "MoE (active ~37B)" },
  { id: "gemma-2-9b", label: "Gemma 2 9B", params: 9 },
  { id: "gemma-2-27b", label: "Gemma 2 27B", params: 27 },
  { id: "codestral-22b", label: "Codestral 22B", params: 22 },
  { id: "custom", label: "Custom model size", params: 0 },
];

const GPUS = [
  { name: "RTX 3060 12GB", vram: 12 },
  { name: "RTX 3090 / 4090 24GB", vram: 24 },
  { name: "RTX 4080 16GB", vram: 16 },
  { name: "RTX 4060 8GB", vram: 8 },
  { name: "A10G 24GB (cloud)", vram: 24 },
  { name: "A100 40GB (cloud)", vram: 40 },
  { name: "A100 80GB (cloud)", vram: 80 },
  { name: "H100 80GB (cloud)", vram: 80 },
  { name: "L4 24GB (cloud)", vram: 24 },
  { name: "M1/M2 Pro 16GB (unified)", vram: 16 },
  { name: "M1/M2 Max 32GB (unified)", vram: 32 },
  { name: "M1/M2 Ultra 64GB (unified)", vram: 64 },
  { name: "M3 Max 128GB (unified)", vram: 128 },
];

export default function VRAMEstimator() {
  const [preset, setPreset] = useState("llama-3-8b");
  const [customParams, setCustomParams] = useState(7);
  const [quant, setQuant] = useState("q4");
  const [batchSize, setBatchSize] = useState(1);
  const [ctxLength, setCtxLength] = useState(4096);

  const selectedPreset = PRESETS.find((p) => p.id === preset)!;
  const params = preset === "custom" ? customParams : selectedPreset.params;
  const quantConfig = QUANTIZATIONS.find((q) => q.id === quant)!;

  // Model weights VRAM
  const modelVRAM = params * 1e9 * quantConfig.bytesPerParam / (1024 ** 3);

  // KV cache estimate: 2 * layers * heads * head_dim * ctx_len * batch * bytes_per_param
  // Simplified: ctx_len * batch * model_size_factor
  const kvCacheVRAM = (ctxLength * batchSize * params * 0.000002);

  // Overhead (CUDA runtime, activations, etc.)
  const overheadVRAM = Math.max(1, modelVRAM * 0.1);

  const totalVRAM = modelVRAM + kvCacheVRAM + overheadVRAM;

  return (
    <div className="space-y-6">
      {/* Config */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
        <h2 className="text-sm font-semibold text-zinc-200 mb-4">Model Configuration</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="vram-preset" className="block text-xs font-medium text-zinc-400 mb-2">
              Model
            </label>
            <select
              id="vram-preset"
              value={preset}
              onChange={(e) => setPreset(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
            >
              {PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}{p.note ? ` — ${p.note}` : ""}
                </option>
              ))}
            </select>
          </div>

          {preset === "custom" && (
            <div>
              <label htmlFor="custom-params" className="block text-xs font-medium text-zinc-400 mb-2">
                Model size (billions of parameters)
              </label>
              <input
                id="custom-params"
                type="number"
                min={0.1}
                step={0.1}
                value={customParams}
                onChange={(e) => setCustomParams(parseFloat(e.target.value) || 7)}
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
          )}

          <div>
            <label htmlFor="vram-quant" className="block text-xs font-medium text-zinc-400 mb-2">
              Quantization
            </label>
            <select
              id="vram-quant"
              value={quant}
              onChange={(e) => setQuant(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
            >
              {QUANTIZATIONS.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.label} — {q.note}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="vram-ctx" className="block text-xs font-medium text-zinc-400 mb-2">
                Context length (tokens)
              </label>
              <input
                id="vram-ctx"
                type="number"
                min={512}
                step={512}
                value={ctxLength}
                onChange={(e) => setCtxLength(parseInt(e.target.value) || 4096)}
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
            <div>
              <label htmlFor="vram-batch" className="block text-xs font-medium text-zinc-400 mb-2">
                Batch size
              </label>
              <input
                id="vram-batch"
                type="number"
                min={1}
                value={batchSize}
                onChange={(e) => setBatchSize(parseInt(e.target.value) || 1)}
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Model Weights", value: modelVRAM, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-700/30" },
          { label: "KV Cache", value: kvCacheVRAM, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-700/30" },
          { label: "Total VRAM", value: totalVRAM, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-700/30" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`rounded-xl border p-4 text-center ${bg}`}>
            <p className={`text-2xl font-semibold font-mono mb-0.5 ${color}`}>
              {value.toFixed(1)}
              <span className="text-sm font-normal ml-1">GB</span>
            </p>
            <p className="text-xs text-zinc-500">{label}</p>
          </div>
        ))}
      </div>

      {/* GPU Compatibility */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        <div className="p-5 border-b border-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-200">GPU Compatibility</h2>
          <p className="text-xs text-zinc-500 mt-1">
            Showing which GPUs can run {selectedPreset.label} with {quantConfig.label} quantization
          </p>
        </div>
        <div className="divide-y divide-zinc-800">
          {GPUS.map((gpu) => {
            const canRun = gpu.vram >= totalVRAM;
            const pct = Math.min(100, (totalVRAM / gpu.vram) * 100);
            return (
              <div key={gpu.name} className="flex items-center gap-4 p-3">
                <span className={`text-lg shrink-0 ${canRun ? "text-emerald-400" : "text-red-500"}`}>
                  {canRun ? "✓" : "✗"}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-sm ${canRun ? "text-zinc-300" : "text-zinc-600"}`}>{gpu.name}</span>
                    <span className="text-xs font-mono text-zinc-500">{gpu.vram}GB</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${canRun ? "bg-emerald-500" : "bg-red-700"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <span className={`text-xs font-mono shrink-0 ${canRun ? "text-zinc-500" : "text-zinc-700"}`}>
                  {pct.toFixed(0)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-zinc-600 text-center">
        VRAM estimates include model weights, KV cache, and ~10% overhead. Actual usage may vary by implementation.
      </p>
    </div>
  );
}
