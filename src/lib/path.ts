export function joinPath(...parts: string[]) {
  const separator = '/';

  return parts
    .map((part: string, index: number) => {
      if (index) {
        part = part.replace(new RegExp('^' + separator), '');
      }
      if (index !== parts.length - 1) {
        part = part.replace(new RegExp(separator + '$'), '');
      }
      return part;
    })
    .join(separator);
}
