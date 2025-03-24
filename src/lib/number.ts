export const formatter = Intl.NumberFormat('en-US', {
  useGrouping: true,
});

export function formatCommaNumber(number: number): string {
  return formatter.format(number);
}

export function decimalIfNeeded(number: number): string {
  return number % 1 === 0 ? number.toString() : number.toFixed(1);
}

export function humanizeNumber(number: number): string {
  if (number < 1000) {
    return formatCommaNumber(number);
  }

  if (number < 1000000) {
    return `${decimalIfNeeded(number / 1000)}k`;
  }

  return `${decimalIfNeeded(number / 1000000)}m`;
}

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
