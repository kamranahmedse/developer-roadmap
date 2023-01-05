export {};

declare global {
  interface Window {
    gtag: any;
    fireEvent: (props: GAEventType) => void;
  }
}

export type GAEventType = {
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
window.fireEvent = (props: GAEventType) => {
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
