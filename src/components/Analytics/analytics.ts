declare global {
  interface Window {
    gtag: any;
    varify: any;
    fireEvent: (props: {
      action: string;
      category: string;
      label?: string;
      value?: string;
      callback?: () => void;
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
  const { action, category, label, value, callback } = props;
  if (!window.gtag) {
    console.warn('Missing GTAG - Analytics disabled');
    return;
  }

  if (import.meta.env.DEV) {
    console.log('Analytics event fired', props);
    callback?.();
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...(callback ? { event_callback: callback } : {}),
  });
};

export {};
