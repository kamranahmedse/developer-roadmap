import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from '../../lib/constants';

function logout() {
  Cookies.remove(TOKEN_COOKIE_NAME);
  window.location.href = '/';
}

function bindEvents() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const dataset = {
      ...target.dataset,
      ...target.closest('button')?.dataset,
    };

    // If the user clicks on the logout button, remove the token cookie
    if (dataset.logoutButton !== undefined) {
      logout();
    } else if (dataset.showMobileNav !== undefined) {
      document.querySelector('[data-mobile-nav]')?.classList.remove('hidden');
    } else if (dataset.closeMobileNav !== undefined) {
      document.querySelector('[data-mobile-nav]')?.classList.add('hidden');
    }
  });
}

bindEvents();
