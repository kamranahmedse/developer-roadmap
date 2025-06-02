import { httpPost } from '../../lib/query-http';

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

  if (['course', 'ai_tutor'].includes(category)) {
    const url = new URL(import.meta.env.PUBLIC_API_URL);
    url.pathname = '/api/_t';
    url.searchParams.set('action', action);
    url.searchParams.set('category', category);
    url.searchParams.set('label', label ?? '');
    url.searchParams.set('value', value ?? '');

    httpPost(url.toString(), {}).catch(console.error);
  }

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
