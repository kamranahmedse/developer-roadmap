export function getPercentage(portion: number, total: number): string {
  if (total <= 0 || portion <= 0) {
    return '0';
  } else if (portion > total) {
    return '100';
  }

  return ((portion / total) * 100).toFixed(2);
}
