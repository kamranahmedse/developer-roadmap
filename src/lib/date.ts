import dayjs from 'dayjs';

export function getRelativeTimeString(
  date: string,
  isTimed: boolean = false,
): string {
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
  } else if (diffInDays < 7) {
    if (isTimed) {
      relativeTime = dayjs(date).format('ddd h:mm A');
    } else {
      relativeTime = rtf.format(-diffInDays, 'day');
    }
  } else {
    if (isTimed) {
      relativeTime = dayjs(date).format('MMM D, YYYY h:mm A');
    } else {
      relativeTime = rtf.format(-Math.round(diffInDays / 7), 'week');
    }
  }

  if (relativeTime === 'this minute') {
    return 'just now';
  }

  return relativeTime;
}

export function formatMonthDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export function formatActivityDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
}
