import { removeAuthToken } from './jwt';

export const REDIRECT_PAGE_AFTER_AUTH = 'redirect_page_after_auth';

export function logout() {
  localStorage.removeItem(REDIRECT_PAGE_AFTER_AUTH);
  removeAuthToken();

  // Reloading will automatically redirect the user if required
  window.location.href = '/';
}

export type AllowedPlatform = 'mobile' | 'web';

export function getPlatformFromState(state: string): AllowedPlatform {
  const [platform, _] = state.split(':');
  if (platform === 'mobile') {
    return 'mobile';
  }

  return 'web';
}

export function redirectToMobileApp(searchParams: URLSearchParams) {
  const state = searchParams.get('state');
  if (state) {
    searchParams.set('state', state.replace('mobile:', ''));
  }

  const deepLinkUrl = `${import.meta.env.PUBLIC_MOBILE_APP_SCHEMA}?${String(searchParams)}`;
  window.location.href = deepLinkUrl;
}
