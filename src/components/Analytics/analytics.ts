import { httpPost } from '../../lib/query-http';
import { getPageTrackingData } from '../../lib/browser';

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

  const eventId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  if (['course', 'ai_tutor'].includes(category)) {
    const trackingData = getPageTrackingData();
    const url = new URL(import.meta.env.PUBLIC_API_URL);
    url.pathname = '/api/_t';
    url.searchParams.set('action', action);
    url.searchParams.set('category', category);
    url.searchParams.set('label', label ?? '');
    url.searchParams.set('value', value ?? '');
    url.searchParams.set('event_id', eventId);

    httpPost(url.toString(), {
      page_location: trackingData.page_location,
      page_path: trackingData.page_path,
      page_referrer: trackingData.page_referrer,
      page_title: trackingData.page_title,
      user_agent: trackingData.user_agent,
      screen_resolution: trackingData.screen_resolution,
      viewport_size: trackingData.viewport_size,
      session_id: trackingData.session_id,
      gclid: trackingData.gclid,
      utm_source: trackingData.utm_source,
      utm_medium: trackingData.utm_medium,
      utm_campaign: trackingData.utm_campaign,
      utm_content: trackingData.utm_content,
      utm_term: trackingData.utm_term,
    }).catch(console.error);

    return;
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

  const trackingData = getPageTrackingData();
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    event_id: eventId,
    source: 'client',
    page_location: trackingData.page_location,
    page_path: trackingData.page_path,
    page_referrer: trackingData.page_referrer,
    page_title: trackingData.page_title,
    session_id: trackingData.session_id,
    gclid: trackingData.gclid,
    utm_source: trackingData.utm_source,
    utm_medium: trackingData.utm_medium,
    utm_campaign: trackingData.utm_campaign,
    utm_content: trackingData.utm_content,
    utm_term: trackingData.utm_term,
    ...(callback ? { event_callback: callback } : {}),
  });
};

export {};
