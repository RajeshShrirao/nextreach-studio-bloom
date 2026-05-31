export function estimateTokens(text: string): number {
  if (!text.trim()) return 0;
  const words = text.trim().split(/\s+/).length;
  const chars = text.length;
  return Math.ceil(words * 1.3 + chars / 3.5);
}
