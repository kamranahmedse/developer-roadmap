import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from '../../lib/jwt';

function easeInElement(el: Element) {
  el.classList.add('opacity-0', 'transition-opacity', 'duration-300');
  el.classList.remove('hidden');
  setTimeout(() => {
    el.classList.remove('opacity-0');
  });
}

function showHideAuthElements(hideOrShow: 'hide' | 'show' = 'hide') {
  document.querySelectorAll('[data-auth-required]').forEach((el) => {
    if (hideOrShow === 'hide') {
      el.classList.add('hidden');
    } else {
      easeInElement(el);
    }
  });
}

function showHideGuestElements(hideOrShow: 'hide' | 'show' = 'hide') {
  document.querySelectorAll('[data-guest-required]').forEach((el) => {
    if (hideOrShow === 'hide') {
      el.classList.add('hidden');
    } else {
      easeInElement(el);
    }
  });
}

// Prepares the UI for the user who is logged in
function handleGuest() {
  const authenticatedRoutes = [
    '/account/update-profile',
    '/account/update-password',
    '/account',
  ];

  showHideAuthElements('hide');
  showHideGuestElements('show');

  // If the user is on an authenticated route, redirect them to the home page
  if (authenticatedRoutes.includes(window.location.pathname)) {
    window.location.href = '/';
  }
}

// Prepares the UI for the user who is logged out
function handleAuthenticated() {
  const guestRoutes = [
    '/login',
    '/signup',
    '/verify-account',
    '/verification-pending',
    '/reset-password',
    '/forgot-password',
  ];

  showHideGuestElements('hide');
  showHideAuthElements('show');

  // If the user is on a guest route, redirect them to the home page
  if (guestRoutes.includes(window.location.pathname)) {
    window.location.href = '/';
  }
}

export function handleAuthRequired() {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  if (token) {
    handleAuthenticated();
  } else {
    handleGuest();
  }
}

window.setTimeout(() => {
  handleAuthRequired();
}, 0);
