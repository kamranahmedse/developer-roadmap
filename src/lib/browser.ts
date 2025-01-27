type UtmParams = Partial<{
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
}>;

export function getUrlUtmParams(): UtmParams {
  if (typeof window === 'undefined') {
    return {};
  }

  const utmParams = new URLSearchParams(window.location.search);
  const utmSource = utmParams.get('utm_source') ?? undefined;
  const utmMedium = utmParams.get('utm_medium') ?? undefined;
  const utmCampaign = utmParams.get('utm_campaign') ?? undefined;
  const utmContent = utmParams.get('utm_content') ?? undefined;
  const utmTerm = utmParams.get('utm_term') ?? undefined;

  if (!utmSource || !utmCampaign) {
    return {};
  }

  return {
    utmSource: utmCampaign ? utmSource.toLowerCase() : undefined,
    utmMedium: utmMedium ? utmMedium.toLowerCase() : undefined,
    utmCampaign: utmCampaign ? utmCampaign.toLowerCase() : undefined,
    utmContent: utmContent ? utmContent.toLowerCase() : undefined,
    utmTerm: utmTerm ? utmTerm.toLowerCase() : undefined,
  };
}

export function triggerUtmRegistration() {
  const utmParams = getStoredUtmParams();
  if (!utmParams.utmSource) {
    return;
  }

  localStorage.removeItem('utm_params');

  window.fireEvent({
    category: 'UserRegistration',
    action: `Registration: ${utmParams.utmSource || 'unknown'}-${utmParams.utmCampaign || 'unknown'}`,
    label: `Registration: ${utmParams.utmSource || 'unknown'}-${utmParams.utmCampaign || 'unknown'}`,
  });
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === 'undefined') {
    return {};
  }

  const utmParams = localStorage.getItem('utm_params');
  if (!utmParams) {
    return {};
  }

  return JSON.parse(utmParams);
}

export function getUrlParams() {
  if (typeof window === 'undefined') {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const paramsObj: Record<string, any> = {};
  for (const [key, value] of params.entries()) {
    paramsObj[key] = value;
  }

  return paramsObj;
}

export function parseUrl(url: string) {
  const parser = document.createElement('a');
  parser.href = url;

  return {
    protocol: parser.protocol,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    hash: parser.hash,
    host: parser.host,
  };
}

export function deleteUrlParam(key: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const url = new URL(window.location.href);
  if (!url.searchParams.has(key)) {
    return;
  }

  url.searchParams.delete(key);
  window.history.pushState(null, '', url.toString());
}

export function setUrlParams(params: Record<string, string>) {
  if (typeof window === 'undefined') {
    return;
  }

  const url = new URL(window.location.href);
  let hasUpdatedUrl = false;

  for (const [key, value] of Object.entries(params)) {
    if (url.searchParams.get(key) === String(value)) {
      continue;
    }

    url.searchParams.delete(key);
    url.searchParams.set(key, value);

    hasUpdatedUrl = true;
  }

  if (hasUpdatedUrl) {
    window.history.pushState(null, '', url.toString());
  }
}
