class Navigation {
  constructor() {
    this.showNavigationId = 'show-mobile-navigation';
    this.navigationId = 'mobile-navigation';
    this.closeNavigationId = 'close-mobile-navigation';

    this.init = this.init.bind(this);
    this.onDOMLoaded = this.onDOMLoaded.bind(this);
    this.showNavigation = this.showNavigation.bind(this);
    this.closeNavigation = this.closeNavigation.bind(this);
  }

  get showNavigationEl() {
    return document.getElementById(this.showNavigationId);
  }

  get navigationEl() {
    return document.getElementById(this.navigationId);
  }

  get closeNavigationEl() {
    return document.getElementById(this.closeNavigationId);
  }

  showNavigation() {
    this.navigationEl.classList.remove('hidden');
    this.navigationEl.classList.add('flex');
  }

  closeNavigation() {
    this.navigationEl.classList.add('hidden');
    this.navigationEl.classList.remove('flex');
  }

  onDOMLoaded() {
    this.showNavigationEl.addEventListener('click', this.showNavigation);
    this.closeNavigationEl.addEventListener('click', this.closeNavigation);
  }

  init() {
    window.addEventListener('DOMContentLoaded', this.onDOMLoaded);
  }
}

const navigation = new Navigation();
navigation.init();
