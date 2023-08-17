import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from '../../lib/jwt';

export function logout() {
  Cookies.remove(TOKEN_COOKIE_NAME);

  // @FIXME: fix the domain name in the cookie created by the API
  Cookies.remove(TOKEN_COOKIE_NAME, {
    path: '/',
    domain: 'api.roadmap.sh',
  });

  // Reloading will automatically redirect the user if required
  window.location.reload();
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
      e.preventDefault();
      logout();
    } else if (dataset.showMobileNav !== undefined) {
      document.querySelector('[data-mobile-nav]')?.classList.remove('hidden');
    } else if (dataset.closeMobileNav !== undefined) {
      document.querySelector('[data-mobile-nav]')?.classList.add('hidden');
    }
  });

  document
    .querySelector('[data-account-button]')
    ?.addEventListener('click', (e) => {
      e.stopPropagation();
      document
        .querySelector('[data-account-dropdown]')
        ?.classList.toggle('hidden');
    });

  document
    .querySelector('[data-command-menu]')
    ?.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('command.k'));
    });
}

bindEvents();
