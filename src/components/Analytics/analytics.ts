declare global {
  interface Window {
    gtag: any;
    fireEvent: (props: {
      action: string;
      category: string;
      label?: string;
      value?: string;
    }) => void;
  }
}

/**
 * Tracks the event on google analytics
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/events
 * @param props Event properties
 * @returns void
 */
window.fireEvent = (props) => {
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
