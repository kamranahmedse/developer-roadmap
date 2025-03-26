export function classname(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
