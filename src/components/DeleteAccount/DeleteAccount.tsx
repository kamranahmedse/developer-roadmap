export function showDeleteAccountPopup() {
  const popupEl = document.querySelector(`#delete-account-popup`);
  if (!popupEl) {
    return;
  }

  popupEl.classList.remove('hidden');
  popupEl.classList.add('flex');

  const focusEl = popupEl.querySelector<HTMLElement>('[autofocus]');
  if (focusEl) {
    focusEl.focus();
  }
}

export function hideDeleteAccountPopup() {
  const popupEl = document.querySelector(`#delete-account-popup`);
  if (!popupEl) {
    return;
  }

  popupEl.classList.remove('flex');
  popupEl.classList.add('hidden');

  const focusEl = popupEl.querySelector<HTMLElement>('[autofocus]');
  if (focusEl) {
    focusEl.blur();
  }
}

export function DeleteAccount() {
  return (
    <div>
      <div>
        <h2 className="text-xl font-bold sm:text-2xl">
          Delete Account
        </h2>
        <p className="mt-2 text-gray-400">
          Permanently remove your account from the roadmap.sh. This action is
          not reversible, so please continue with caution.
        </p>
      </div>

      <div className="mt-4">
        <button
          className="inline-flex h-10 items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-500/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-200 disabled:pointer-events-none disabled:opacity-50"
          onClick={showDeleteAccountPopup}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
