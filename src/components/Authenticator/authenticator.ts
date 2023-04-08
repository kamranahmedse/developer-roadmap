import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from '../../lib/constants';

/**
 * Prepares the UI for the user who is logged in
 */
function handleLoggedOut() {
  document.querySelectorAll('[data-auth-required]').forEach((el) => {
    el.classList.add('hidden');
  });

  document.querySelectorAll('[data-guest-required]').forEach((el) => {
    el.classList.remove('hidden');
  });
}

/**
 * Prepares the UI for the user who is logged out
 */
function handleLoggedIn() {
  document.querySelectorAll('[data-auth-required]').forEach((el) => {
    el.classList.remove('hidden');
  });

  document.querySelectorAll('[data-guest-required]').forEach((el) => {
    el.classList.add('hidden');
  });
}

function handleAuthRequired() {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  if (token) {
    handleLoggedIn();
  } else {
    handleLoggedOut();
  }
}

handleAuthRequired();
