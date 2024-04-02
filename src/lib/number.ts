export const formatter = Intl.NumberFormat('en-US', {
  useGrouping: true,
});

export function formatCommaNumber(number: number): string {
  return formatter.format(number);
}
