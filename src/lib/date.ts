export function getRelativeTimeString(date: string): string {
  if (!Intl?.RelativeTimeFormat) {
    return date;
  }

  const rtf = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
    style: 'narrow',
  });

  const currentDate = new Date();
  const targetDate = new Date(date);
  const diffInMilliseconds = currentDate.getTime() - targetDate.getTime();

  const diffInMinutes = Math.round(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.round(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));

  let relativeTime;

  if (diffInMinutes < 60) {
    relativeTime = rtf.format(-diffInMinutes, 'minute');
  } else if (diffInHours < 24) {
    relativeTime = rtf.format(-diffInHours, 'hour');
  } else {
    relativeTime = rtf.format(-diffInDays, 'day');
  }

  if (relativeTime === 'this minute') {
    return 'just now';
  }

  return relativeTime;
}
