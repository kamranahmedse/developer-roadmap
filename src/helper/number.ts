export function getPercentage(portion: number, total: number) {
  return portion > 0 ? ((portion / total) * 100).toFixed(2) : 0;
}
