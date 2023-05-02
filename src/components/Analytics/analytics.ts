export { };

declare global {
  interface Window {
    // To selectively enable/disable debug logs
    __DEBUG__: boolean;
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

  if (import.meta.env.DEV) {
    console.log('Analytics event fired', props);
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
