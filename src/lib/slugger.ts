const regex = /[^A-Za-z0-9_\- ]/g;
export function slugify(value: string): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value.toLowerCase().replace(regex, '').trim().replace(/ /g, '-');
}
