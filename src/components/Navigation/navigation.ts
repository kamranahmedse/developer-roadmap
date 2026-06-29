import { logout } from '../../lib/auth';

function setMobileNavState(isOpen: boolean) {
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const mobileNavTrigger = document.querySelector('[data-show-mobile-nav]');
  const closeButton = document.querySelector('[data-close-mobile-nav]');

  mobileNav?.classList.toggle('hidden', !isOpen);
  mobileNav?.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  mobileNavTrigger?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  document.body.classList.toggle('overflow-hidden', isOpen);

  if (isOpen) {
    (closeButton as HTMLButtonElement | null)?.focus();
  } else {
    (mobileNavTrigger as HTMLButtonElement | null)?.focus();
  }
}

function bindEvents() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const dataset = {
      ...target.dataset,
      ...target.closest('button')?.dataset,
    };

    const accountDropdown = document.querySelector('[data-account-dropdown]');

    // If the user clicks on the logout button, remove the token cookie
    if (dataset.logoutButton !== undefined) {
      e.preventDefault();
      logout();
    } else if (dataset.showMobileNav !== undefined) {
      setMobileNavState(true);
    } else if (dataset.closeMobileNav !== undefined) {
      setMobileNavState(false);
    } else if (
      accountDropdown &&
      !target?.closest('[data-account-dropdown]') &&
      !accountDropdown.classList.contains('hidden')
    ) {
      accountDropdown.classList.add('hidden');
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

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') {
      return;
    }

    const mobileNav = document.querySelector('[data-mobile-nav]');
    if (!mobileNav || mobileNav.classList.contains('hidden')) {
      return;
    }

    setMobileNavState(false);
  });

  document
    .querySelector('[data-command-menu]')
    ?.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('command.k'));
    });
}

bindEvents();
