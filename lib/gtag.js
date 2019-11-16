export const GA_TRACKING_ID = 'UA-139582634-1';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const firePageView = url => {
  if (!window.gtag) {
    console.warn('Missing GTAG – Analytics disabled');
    return;
  }

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (!window.gtag) {
    console.warn('Missing GTAG – Analytics disabled');
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
};
