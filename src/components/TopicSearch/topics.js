class Topics {
  constructor() {
    this.topicSearchId = 'search-topic-input';

    this.onDOMLoaded = this.onDOMLoaded.bind(this);
    this.init = this.init.bind(this);
    this.filterTopicNodes = this.filterTopicNodes.bind(this);
  }

  get topicSearchEl() {
    return document.getElementById(this.topicSearchId);
  }

  filterTopicNodes(e) {
    const value = e.target.value.trim().toLowerCase();
    if (!value) {
      document
        .querySelectorAll(`[data-topic]`)
        .forEach((item) => item.classList.remove('hidden'));
      return;
    }

    document
      .querySelectorAll(`[data-topic]`)
      .forEach((item) => item.classList.add('hidden'));

    document
      .querySelectorAll(`[data-topic*="${value}"]`)
      .forEach((item) => item.classList.remove('hidden'));
  }

  onDOMLoaded() {
    if (!this.topicSearchEl) {
      return;
    }

    this.topicSearchEl.addEventListener('keyup', this.filterTopicNodes);
  }

  init() {
    window.addEventListener('DOMContentLoaded', this.onDOMLoaded);
  }
}

const topicRef = new Topics();
topicRef.init();
