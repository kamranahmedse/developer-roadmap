export class Popup {
  constructor() {
    this.triggerPopup = this.triggerPopup.bind(this);
    this.onDOMLoaded = this.onDOMLoaded.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.lastFocusedElement = null;
  }

  /**
   * Triggers the popup on target elements
   * @param {Event} e
   */
  triggerPopup(e) {
    const popupToShow =
      e?.target?.closest('[data-popup]')?.dataset?.popup || 'unknown-popup';
    const popupEl = document.querySelector(`#${popupToShow}`);

    if (!popupEl) {
      return;
    }

    e.preventDefault();
    this.lastFocusedElement = e.target;

    popupEl.classList.remove('hidden');
    popupEl.classList.add('flex');
    const focusEl = popupEl.querySelector('[autofocus]');
    if (focusEl) {
      focusEl.focus();
    }
  }

  handleClosePopup(e) {
    const target = e.target;

    const popupBody = target.closest('.popup-body');
    const closestPopup = target.closest('.popup');
    const closeBtn = target.closest('.popup-close');

    if (!closeBtn && popupBody) {
      return;
    }

    if (closestPopup) {
      closestPopup.classList.add('hidden');
      closestPopup.classList.remove('flex');

      this.lastFocusedElement && this.lastFocusedElement.focus();
    }
  }

  handleKeydown(e) {
    if (e.key !== 'Escape') {
      return;
    }

    const popup = document.querySelector('.popup:not(.hidden)');
    if (popup) {
      popup.classList.add('hidden');
      popup.classList.remove('flex');

      this.lastFocusedElement && this.lastFocusedElement.focus();
    }
  }

  onDOMLoaded() {
    document.addEventListener('click', this.triggerPopup);
    document.addEventListener('click', this.handleClosePopup);
    document.addEventListener('keydown', this.handleKeydown);
  }

  init() {
    window.addEventListener('DOMContentLoaded', this.onDOMLoaded);
  }
}

const popupRef = new Popup();
popupRef.init();
