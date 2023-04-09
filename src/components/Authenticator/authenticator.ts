import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from '../../lib/constants';

function showHideAuthElements(hideOrShow: 'hide' | 'show' = 'hide') {
  document.querySelectorAll('[data-auth-required]').forEach((el) => {
    if (hideOrShow === 'hide') {
      el.classList.add('hidden');
    } else {
      el.classList.remove('hidden');
    }
  });
}

function showHideGuestElements(hideOrShow: 'hide' | 'show' = 'hide') {
  document.querySelectorAll('[data-guest-required]').forEach((el) => {
    if (hideOrShow === 'hide') {
      el.classList.add('hidden');
    } else {
      el.classList.remove('hidden');
    }
  });
}

/**
 * Prepares the UI for the user who is logged in
 */
function handleGuest() {
  showHideAuthElements('hide');
  showHideGuestElements('show');
}

/**
 * Prepares the UI for the user who is logged out
 */
function handleAuthenticated() {
  showHideGuestElements('hide');
  showHideAuthElements('show');
}

function handleAuthRequired() {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  if (token) {
    handleAuthenticated();
  } else {
    handleGuest();
  }
}

handleAuthRequired();
