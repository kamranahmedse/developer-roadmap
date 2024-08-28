export const formatter = Intl.NumberFormat('en-US', {
  useGrouping: true,
});

export function formatCommaNumber(number: number): string {
  return formatter.format(number);
}

export function decimalIfNeeded(number: number): string {
  return number % 1 === 0 ? number.toString() : number.toFixed(1);
}
