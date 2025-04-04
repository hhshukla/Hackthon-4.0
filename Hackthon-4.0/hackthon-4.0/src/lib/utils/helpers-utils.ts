export function containsSVG(url?: string) {
  if (!url) return false;
  return /\.svg(?:$|\?|#)/.test(url);
}
