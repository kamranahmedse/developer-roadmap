import { removeAuthToken } from './jwt';

export const REDIRECT_PAGE_AFTER_AUTH = 'redirect_page_after_auth';

export function logout() {
  localStorage.removeItem(REDIRECT_PAGE_AFTER_AUTH);
  removeAuthToken();

  // Reloading will automatically redirect the user if required
  window.location.href = '/';
}
