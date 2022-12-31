export class Modal {
    constructor() {
      this.triggerModal = this.triggerModal.bind(this);
      this.onDOMLoaded = this.onDOMLoaded.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.handleKeydown = this.handleKeydown.bind(this);
    }
  
    /**
     * Triggers the modal on target elements
     * @param {Event} e
     */
    triggerModal(e) {
      const modalToShow = e?.target?.closest('[data-modal]')?.dataset?.modal || 'unknown-modal';
      const modalEl = document.querySelector(`#${modalToShow}`);
  
      if (!modalEl) {
        return;
      }
  
      modalEl.classList.remove('hidden');
      const focusEl = modalEl.querySelector('[autofocus]');
      if (focusEl) {
        focusEl.focus();
      }
    }
  
    handleCloseModal(e) {
      const target = e.target;
      const modalBody = target.closest('.modal-body');
      const closestModal = target.closest('.modal');
  
      if (modalBody) {
        return;
      }
  
      if (closestModal) {
        closestModal.classList.add('hidden');
      }
    }
  
    handleKeydown(e) {
      if (e.key !== 'Escape') {
        return;
      }
  
      const modal = document.querySelector('.modal:not(.hidden)');
      if (modal) {
        modal.classList.add('hidden');
      }
    }
  
    onDOMLoaded() {
      document.addEventListener('click', this.triggerModal);
      document.addEventListener('click', this.handleCloseModal);
      document.addEventListener('keydown', this.handleKeydown);
    }
  
    init() {
      window.addEventListener('DOMContentLoaded', this.onDOMLoaded);
    }
  }
  
  const modalRef = new Modal();
  modalRef.init();  