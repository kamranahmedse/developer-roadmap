export const TOUCH_INTERACTION_MEDIA_QUERY = '(hover: none) and (pointer: coarse)';

export function isTouchInteractionDevice() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(TOUCH_INTERACTION_MEDIA_QUERY).matches;
}
