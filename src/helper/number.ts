export function getPercentage(portion: number, total: number): number {
  if (portion <= 0 || total <= 0) {
    return 0;
  }

  if (portion >= total) {
    return 100;
  }

  const percentage = (portion / total) * 100;
  return Math.round(percentage);
}
