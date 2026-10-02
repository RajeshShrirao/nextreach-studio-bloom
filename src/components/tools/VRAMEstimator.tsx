import { useState } from "react";

// VRAM requirements based on model size, quantization, and overhead
// Formula: params * bytes_per_param + overhead

const QUANTIZATIONS = [
  { id: "f32", label: "FP32 (Full precision)", bytesPerParam: 4, note: "Reference / fine-tuning use" },
  { id: "f16", label: "FP16 / BF16", bytesPerParam: 2, note: "Standard float inference" },
  { id: "q8", label: "Q8 (8-bit quantized)", bytesPerParam: 1.0, note: "Near-original quality, 2x smaller" },
  { id: "q6", label: "Q6_K (6-bit)", bytesPerParam: 0.75, note: "Extremely minor quality loss" },
  { id: "q5", label: "Q5_K_M (5-bit)", bytesPerParam: 0.625, note: "Recommended balance of speed & quality" },
  { id: "q4", label: "Q4_K_M (4-bit)", bytesPerParam: 0.5, note: "Standard GGUF compression choice" },
  { id: "q3", label: "Q3_K_M (3-bit)", bytesPerParam: 0.375, note: "Noticeable quality degradation" },
  { id: "q2", label: "Q2_K (2-bit)", bytesPerParam: 0.25, note: "Heavy quantization loss" },
];

const PRESETS = [
  { id: "llama-3-8b", label: "Llama 3 8B", params: 8, note: "Meta" },
  { id: "llama-3-70b", label: "Llama 3 70B", params: 70, note: "Meta" },
  { id: "llama-3-405b", label: "Llama 3 405B", params: 405, note: "Meta" },
  { id: "mistral-7b", label: "Mistral 7B", params: 7, note: "Mistral" },
  { id: "mixtral-8x7b", label: "Mixtral 8x7B", params: 47, note: "MoE (active ~13B)" },
  { id: "phi-3-mini", label: "Phi-3 Mini (3.8B)", params: 3.8, note: "Microsoft" },
  { id: "phi-3-medium", label: "Phi-3 Medium (14B)", params: 14, note: "Microsoft" },
  { id: "qwen-2-5-7b", label: "Qwen 2.5 7B", params: 7, note: "Alibaba" },
  { id: "qwen-2-5-72b", label: "Qwen 2.5 72B", params: 72, note: "Alibaba" },
  { id: "deepseek-v3", label: "DeepSeek V3 (685B)", params: 685, note: "MoE (active ~37B)" },
  { id: "gemma-2-9b", label: "Gemma 2 9B", params: 9, note: "Google" },
  { id: "gemma-2-27b", label: "Gemma 2 27B", params: 27, note: "Google" },
  { id: "codestral-22b", label: "Codestral 22B", params: 22, note: "Mistral" },
  { id: "custom", label: "Custom Model Dimensions", params: 0, note: "Specify below" },
];

const GPUS = [
  { name: "RTX 4060 8GB", vram: 8, type: "Consumer Desktop" },
  { name: "RTX 3060 12GB", vram: 12, type: "Consumer Desktop" },
  { name: "RTX 4080 16GB", vram: 16, type: "Consumer Desktop" },
  { name: "RTX 3090 / 4090 24GB", vram: 24, type: "Workstation Desktop" },
  { name: "Mac Studio M1/M2 Max (Unified)", vram: 32, type: "Apple Unified Memory" },
  { name: "A10G 24GB (Cloud Inference)", vram: 24, type: "Cloud Accelerator" },
  { name: "L4 24GB (Cloud Inference)", vram: 24, type: "Cloud Accelerator" },
  { name: "A100 40GB (Cloud Server)", vram: 40, type: "Cloud Dedicated" },
  { name: "Mac Studio M1/M2 Ultra (Unified)", vram: 64, type: "Apple Unified Memory" },
  { name: "A100 80GB (Cloud Server)", vram: 80, type: "Cloud Dedicated" },
  { name: "H100 80GB (Cloud Server)", vram: 80, type: "Cloud Dedicated" },
  { name: "Mac Studio M3 Max (Unified)", vram: 128, type: "Apple Unified Memory" },
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

  // Model weights VRAM (Parameters in billions * bytes per parameter)
  const modelVRAM = (params * 1e9 * quantConfig.bytesPerParam) / (1024 ** 3);

  // KV cache estimate: 2 * layers * heads * head_dim * ctx_len * batch * bytes_per_param
  // Simplified formula standard for transformers: ctx_len * batch * parameter_count * overhead_factor
  const kvCacheVRAM = ctxLength * batchSize * params * 0.000002;

  // System runtime overhead (CUDA, software stacks, memory fragmentation activations)
  const overheadVRAM = Math.max(1.2, modelVRAM * 0.08);

  const totalVRAM = modelVRAM + kvCacheVRAM + overheadVRAM;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Model Parameters Card (Left - Span 2 Columns) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="card-studio p-6">
          <h2 className="text-xs uppercase tracking-wider text-[#6E6862] font-bold mb-4">Model Specs</h2>
          
          <div className="space-y-4.5">
            <div>
              <label htmlFor="vram-preset" className="form-label-premium">
                Model Preset
              </label>
              <select
                id="vram-preset"
                value={preset}
                onChange={(e) => setPreset(e.target.value)}
                className="form-select-premium"
              >
                {PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label} {p.note ? `— (${p.note})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {preset === "custom" && (
              <div>
                <label htmlFor="custom-params" className="form-label-premium">
                  Model Size (Parameter count in Billions)
                </label>
                <input
                  id="custom-params"
                  type="number"
                  min={0.1}
                  step={0.1}
                  value={customParams}
                  onChange={(e) => setCustomParams(Math.max(0.1, parseFloat(e.target.value) || 0))}
                  className="form-input-premium font-mono"
                />
              </div>
            )}

            <div>
              <label htmlFor="vram-quant" className="form-label-premium">
                Quantization Bit Rate
              </label>
              <select
                id="vram-quant"
                value={quant}
                onChange={(e) => setQuant(e.target.value)}
                className="form-select-premium"
              >
                {QUANTIZATIONS.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.label} ({q.bytesPerParam * 8} bits)
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[11px] text-[#6E6862] italic">{quantConfig.note}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="vram-ctx" className="form-label-premium">
                  Context length (tokens)
                </label>
                <input
                  id="vram-ctx"
                  type="number"
                  min={512}
                  step={512}
                  value={ctxLength}
                  onChange={(e) => setCtxLength(Math.max(512, parseInt(e.target.value) || 4096))}
                  className="form-input-premium font-mono"
                />
              </div>
              <div>
                <label htmlFor="vram-batch" className="form-label-premium">
                  Batch Size
                </label>
                <input
                  id="vram-batch"
                  type="number"
                  min={1}
                  value={batchSize}
                  onChange={(e) => setBatchSize(Math.max(1, parseInt(e.target.value) || 1))}
                  className="form-input-premium font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estimates & GPU Comparison (Right - Span 3 Columns) */}
      <div className="lg:col-span-3 space-y-6">
        {/* Results Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Weights footprint", value: modelVRAM, color: "text-purple-700", border: "border-purple-200", bg: "bg-purple-50" },
            { label: "KV Cache memory", value: kvCacheVRAM, color: "text-blue-700", border: "border-blue-200", bg: "bg-blue-50" },
            { label: "Total VRAM Required", value: totalVRAM, color: "text-[#C76B50]", border: "border-[#C76B50]/20", bg: "bg-[#C76B50]/5" },
          ].map(({ label, value, color, border, bg }) => (
            <div key={label} className={`rounded-xl border p-4.5 text-center ${border} ${bg}`}>
              <p className="text-[10px] text-[#6E6862] font-bold uppercase tracking-wider mb-1">{label}</p>
              <p className={`text-2xl font-bold font-mono ${color}`}>
                {value.toFixed(2)}
                <span className="text-xs font-normal ml-0.5 uppercase">GB</span>
              </p>
            </div>
          ))}
        </div>

        {/* GPU Table */}
        <div className="card-studio !p-0 overflow-hidden">
          <div className="p-4.5 border-b border-[#1F1F23]/8 bg-[#FAF8F5]/60">
            <h2 className="text-xs uppercase tracking-wider text-[#6E6862] font-bold">GPU Profile Compatibility</h2>
            <p className="text-[12px] text-[#6E6862] mt-0.5">
              Estimation for running <span className="text-[#1F1F23] font-semibold">{preset === "custom" ? "Custom" : selectedPreset.label}</span> with <span className="text-[#1F1F23] font-semibold">{quantConfig.label}</span>
            </p>
          </div>

          <div className="divide-y divide-[#1F1F23]/6 max-h-[380px] overflow-y-auto bg-white">
            {GPUS.map((gpu) => {
              const usagePct = (totalVRAM / gpu.vram) * 100;
              const canRun = gpu.vram >= totalVRAM;
              const barWidth = Math.min(100, usagePct);

              const barColor =
                usagePct > 100
                  ? "bg-red-500"
                  : usagePct > 80
                  ? "bg-amber-500"
                  : "bg-emerald-500";

              return (
                <div key={gpu.name} className="flex items-center gap-4 p-4 hover:bg-[#FAF8F5]/50 transition-colors text-xs">
                  <div className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full border text-[10px] font-bold">
                    {canRun ? (
                      <span className="text-emerald-700 bg-emerald-50 border-emerald-200 px-1 rounded-full">✓</span>
                    ) : (
                      <span className="text-red-700 bg-red-50 border-red-200 px-1 rounded-full">✗</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <span className={`font-semibold ${canRun ? "text-[#1F1F23]" : "text-[#6E6862]"}`}>{gpu.name}</span>
                        <span className="ml-2 text-[10px] text-[#6E6862] uppercase tracking-wide font-medium">{gpu.type}</span>
                      </div>
                      <span className="font-mono text-[#4A4844] font-medium">
                        {gpu.vram}GB
                      </span>
                    </div>

                    {/* Progress representation */}
                    <div className="h-2 rounded-full bg-[#FAF8F5] overflow-hidden border border-[#1F1F23]/8 p-[1px]">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-right w-12 font-mono shrink-0">
                    <span className={`font-semibold ${canRun ? "text-[#1F1F23]" : "text-[#6E6862]"}`}>
                      {usagePct.toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-[11px] text-[#6E6862] text-center leading-relaxed">
          Estimates calculate baseline runtime allocations and static KV bounds. Actual GPU memory behaviors vary based on PyTorch frameworks, context scaling, and compilation parameters.
        </p>
      </div>
    </div>
  );
}
