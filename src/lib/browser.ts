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

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.delete(key);
    url.searchParams.set(key, value);
  }

  window.history.pushState(null, '', url.toString());
}
