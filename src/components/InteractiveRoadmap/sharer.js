export class Sharer {
  constructor() {
    this.init = this.init.bind(this);
    this.onScroll = this.onScroll.bind(this);

    this.shareIconsId = "page-share-icons";
  }

  get shareIconsEl() {
    return document.getElementById(this.shareIconsId);
  }

  onScroll() {
    if (window.scrollY < 100 || window.innerWidth < 1050) {
      this.shareIconsEl.classList.add("hidden");
      return null;
    }

    this.shareIconsEl.classList.remove("hidden");
  }

  init() {
    window.addEventListener("scroll", this.onScroll, { passive: true });
  }
}