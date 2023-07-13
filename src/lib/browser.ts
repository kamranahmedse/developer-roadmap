export function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const paramsObj: Record<string, any> = {};
  for (const [key, value] of params.entries()) {
    paramsObj[key] = value;
  }

  return paramsObj;
}
