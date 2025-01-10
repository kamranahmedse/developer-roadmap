import { showLoginPopup } from '../lib/popup';

export function SubscribeToChangelog() {
  return (
    <button
      data-guest-required
      className="flex hidden text-sm text-gray-500 underline underline-offset-2 hover:no-underline"
      onClick={() => {
        showLoginPopup();
      }}
    >
      <span> Subscribe to Changelog </span>
    </button>
  );
}
