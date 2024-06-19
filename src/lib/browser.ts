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
