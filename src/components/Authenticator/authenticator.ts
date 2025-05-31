import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from '../../lib/jwt';
import { REDIRECT_PAGE_AFTER_AUTH } from '../../lib/auth';

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
    '/account/notification',
    '/account/update-password',
    '/account/settings',
    '/account/roadmaps',
    '/account/road-card',
    '/account/friends',
    '/account',
    '/team',
    '/team/progress',
    '/team/activity',
    '/team/roadmaps',
    '/team/new',
    '/team/members',
    '/team/member',
    '/team/settings',
    '/dashboard',
  ];

  showHideAuthElements('hide');
  showHideGuestElements('show');

  // If the user is on an authenticated route, redirect them to the home page
  if (authenticatedRoutes.includes(window.location.pathname)) {
    localStorage.setItem(REDIRECT_PAGE_AFTER_AUTH, window.location.pathname);
    window.location.href = '/login';
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
    const authRedirect = window.localStorage.getItem('authRedirect') || '/';
    window.localStorage.removeItem('authRedirect');

    window.location.href = authRedirect;
  }
}

export function handleAuthRequired() {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  if (token) {
    const pageAfterAuth = localStorage.getItem(REDIRECT_PAGE_AFTER_AUTH);
    if (pageAfterAuth) {
      localStorage.removeItem(REDIRECT_PAGE_AFTER_AUTH);
      window.location.href = pageAfterAuth;

      return;
    }

    handleAuthenticated();
  } else {
    handleGuest();
  }
}

window.setTimeout(() => {
  handleAuthRequired();
}, 0);
