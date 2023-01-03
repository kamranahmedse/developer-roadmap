export {};

declare global {
  interface Window {
    gtag: any;
    fireEvent: (props: EventType) => void;
    firePageView: (url: string) => void;
  }
}

/**
 * Tracks the page view on google analytics
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 * @param url URL to track
 * @returns void
 */
window.firePageView = (url: string) => {
  if (!window.gtag) {
    console.warn('Missing GTAG - Analytics disabled');
    return;
  }

  window.gtag('config', 'UA-139582634-1', {
    page_path: url,
  });
};

type EventType = {
  action: string;
  category: string;
  label?: string;
  value?: string;
};

/**
 * Tracks the event on google analytics
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/events
 * @param props Event properties
 * @returns void
 */
window.fireEvent = (props: EventType) => {
  const { action, category, label, value } = props;
  if (!window.gtag) {
    console.warn('Missing GTAG - Analytics disabled');
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
