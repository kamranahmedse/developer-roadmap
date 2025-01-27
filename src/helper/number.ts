export function getPercentage(portion: number, total: number): string {
  if (portion <= 0 || total <= 0) {
    return '0.00';
  }
  
  if (portion >= total) {
    return '100.00';
  }

  const percentage = (portion / total) * 100;
  return percentage.toFixed(2);
}
