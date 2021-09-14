declare global {
  interface Window {
    gtag: any;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export function firePageView(url: string) {
  if (!window.gtag) {
    console.warn('Missing GTAG – Analytics disabled');
    return;
  }

  window.gtag('config', process.env.GA_SECRET, {
    page_path: url
  });
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export function event(props: { action: string; category: string; label?: string; value?: string; }) {
  const { action, category, label, value } = props;
  if (!window.gtag) {
    console.warn('Missing GTAG – Analytics disabled');
    return;
  }

  window.gtag(
    'event',
    action,
    {
      event_category: category,
      event_label: label,
      value: value
    }
  );
}
