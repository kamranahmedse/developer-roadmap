export class Topic {
  constructor() {
    this.overlayId = 'topic-overlay';
    this.contentId = 'topic-content';
    this.loaderId = 'topic-loader';
    this.topicBodyId = 'topic-body';
    this.topicActionsId = 'topic-actions';
    this.markTopicDoneId = 'mark-topic-done';
    this.markTopicPendingId = 'mark-topic-pending';
    this.closeTopicId = 'close-topic';
    this.contributionTextId = 'contrib-meta';

    this.activeResourceType = null;
    this.activeResourceId = null;
    this.activeTopicId = null;

    this.handleRoadmapTopicClick = this.handleRoadmapTopicClick.bind(this);
    this.handleBestPracticeTopicClick =
      this.handleBestPracticeTopicClick.bind(this);
    this.handleBestPracticeTopicToggle =
      this.handleBestPracticeTopicToggle.bind(this);
    this.handleBestPracticeTopicPending =
      this.handleBestPracticeTopicPending.bind(this);

    this.close = this.close.bind(this);
    this.resetDOM = this.resetDOM.bind(this);
    this.populate = this.populate.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.markAsDone = this.markAsDone.bind(this);
    this.markAsPending = this.markAsPending.bind(this);
    this.querySvgElementsByTopicId = this.querySvgElementsByTopicId.bind(this);
    this.isTopicDone = this.isTopicDone.bind(this);

    this.init = this.init.bind(this);
  }

  get loaderEl() {
    return document.getElementById(this.loaderId);
  }

  get markTopicDoneEl() {
    return document.getElementById(this.markTopicDoneId);
  }

  get markTopicPendingEl() {
    return document.getElementById(this.markTopicPendingId);
  }

  get topicActionsEl() {
    return document.getElementById(this.topicActionsId);
  }

  get contributionTextEl() {
    return document.getElementById(this.contributionTextId);
  }

  get contentEl() {
    return document.getElementById(this.contentId);
  }

  get overlayEl() {
    return document.getElementById(this.overlayId);
  }

  resetDOM(hideOverlay = false) {
    if (hideOverlay) {
      this.overlayEl.classList.add('hidden');
    } else {
      this.overlayEl.classList.remove('hidden');
    }

    this.loaderEl.classList.remove('hidden'); // Show loader
    this.topicActionsEl.classList.add('hidden'); // Hide Actions
    this.contributionTextEl.classList.add('hidden'); // Hide contribution text
    this.contentEl.replaceChildren(''); // Remove content
  }

  close() {
    this.resetDOM(true);

    this.activeResourceId = null;
    this.activeTopicId = null;
  }

  isTopicDone(topicId) {
    const normalizedGroup = topicId.replace(/^\d+-/, '');
    const el = document.querySelector(`[data-group-id$="-${normalizedGroup}"]`);
    return el?.classList.contains('done');
  }

  /**
   * @param {string | HTMLElement} html
   */
  populate(html) {
    this.contentEl.replaceChildren(html);
    this.loaderEl.classList.add('hidden');
    this.topicActionsEl.classList.remove('hidden');
    this.contributionTextEl.classList.remove('hidden');

    const isDone = this.isTopicDone(this.activeTopicId);

    if (isDone) {
      this.markTopicDoneEl.classList.add('hidden');
      this.markTopicPendingEl.classList.remove('hidden');
    } else {
      this.markTopicDoneEl.classList.remove('hidden');
      this.markTopicPendingEl.classList.add('hidden');
    }
  }

  renderTopicFromUrl(url) {
    return fetch(url)
      .then((res) => {
        return res.text();
      })
      .then((topicHtml) => {
        // It's full HTML with page body, head etc.
        // We only need the inner HTML of the #main-content
        const node = new DOMParser().parseFromString(topicHtml, 'text/html');

        return node.getElementById('main-content');
      })
      .then((content) => {
        this.populate(content);
      })
      .catch((e) => {
        console.error(e);
        this.populate('Error loading the content!');
      });
  }

  handleBestPracticeTopicToggle(e) {
    const { resourceId: bestPracticeId, topicId } = e.detail;
    if (!topicId || !bestPracticeId) {
      console.log('Missing topic or bestPracticeId: ', e.detail);
      return;
    }

    const isDone = localStorage.getItem(topicId) === 'done';
    if (isDone) {
      this.markAsPending(topicId, bestPracticeId, 'best-practice');
    } else {
      this.markAsDone(topicId, bestPracticeId, 'best-practice');
    }
  }

  handleBestPracticeTopicPending(e) {
    const { resourceId: bestPracticeId, topicId } = e.detail;
    if (!topicId || !bestPracticeId) {
      console.log('Missing topic or bestPracticeId: ', e.detail);
      return;
    }

    this.markAsPending(topicId, bestPracticeId, 'best-practice');
  }

  handleBestPracticeTopicClick(e) {
    const { resourceId: bestPracticeId, topicId } = e.detail;
    if (!topicId || !bestPracticeId) {
      console.log('Missing topic or bestPracticeId: ', e.detail);
      return;
    }

    this.activeResourceType = 'best-practice';
    this.activeResourceId = bestPracticeId;
    this.activeTopicId = topicId;

    this.resetDOM();

    const topicUrl = `/best-practices/${bestPracticeId}/${topicId.replaceAll(
      ':',
      '/'
    )}`;

    this.renderTopicFromUrl(topicUrl).then(() => null);
  }

  handleRoadmapTopicClick(e) {
    const { resourceId: roadmapId, topicId } = e.detail;
    if (!topicId || !roadmapId) {
      console.log('Missing topic or roadmap: ', e.detail);
      return;
    }

    this.activeResourceType = 'roadmap';
    this.activeResourceId = roadmapId;
    this.activeTopicId = topicId;

    this.resetDOM();
    const topicUrl = `/${roadmapId}/${topicId.replaceAll(':', '/')}`;

    window.fireEvent({
      category: `RoadmapClick`,
      action: `${roadmapId}/load-topic`,
      label: topicUrl,
    });

    this.renderTopicFromUrl(topicUrl).then(() => null);
  }

  querySvgElementsByTopicId(topicId) {
    const matchingElements = [];

    // Elements having sort order in the beginning of the group id
    document
      .querySelectorAll(`[data-group-id$="-${topicId}"]`)
      .forEach((element) => {
        const foundGroupId = element?.dataset?.groupId || '';
        const validGroupRegex = new RegExp(`^\\d+-${topicId}$`);

        if (validGroupRegex.test(foundGroupId)) {
          matchingElements.push(element);
        }
      });

    // Elements with exact match of the topic id
    document
      .querySelectorAll(`[data-group-id="${topicId}"]`)
      .forEach((element) => {
        matchingElements.push(element);
      });

    // Matching "check:XXXX" box of the topic
    document
      .querySelectorAll(`[data-group-id="check:${topicId}"]`)
      .forEach((element) => {
        matchingElements.push(element);
      });

    return matchingElements;
  }

  async markAsDone(topicId, resourceId, resourceType) {
    const updatedTopicId = topicId.replace(/^\d+-/, '');

    const { response, error } = {};

    if (response) {
      this.close();
      this.querySvgElementsByTopicId(updatedTopicId).forEach((item) => {
        item?.classList?.add('done');
      });
    } else {
      console.error(error);
    }
  }

  async markAsPending(topicId, resourceId, resourceType) {
    const updatedTopicId = topicId.replace(/^\d+-/, '');

    const { response, error } = {};

    if (response) {
      this.close();
      this.querySvgElementsByTopicId(updatedTopicId).forEach((item) => {
        item?.classList?.remove('done');
      });
    } else {
      console.error(error);
    }
  }

  handleOverlayClick(e) {
    const isClickedInsideTopic = e.target.closest(`#${this.topicBodyId}`);

    if (!isClickedInsideTopic) {
      this.close();
      return;
    }

    const isClickedDone =
      e.target.id === this.markTopicDoneId ||
      e.target.closest(`#${this.markTopicDoneId}`);
    if (isClickedDone) {
      this.markAsDone(
        this.activeTopicId,
        this.activeResourceId,
        this.activeResourceType
      );
      // this.close();
    }

    const isClickedPending =
      e.target.id === this.markTopicPendingId ||
      e.target.closest(`#${this.markTopicPendingId}`);
    if (isClickedPending) {
      this.markAsPending(
        this.activeTopicId,
        this.activeResourceId,
        this.activeResourceType
      );
      // this.close();
    }

    const isClickedPopupOpener =
      e.target.dataset['popup'] || e.target.closest('button[data-popup]');
    const isClickedClose =
      e.target.id === this.closeTopicId ||
      e.target.closest(`#${this.closeTopicId}`);
    if (isClickedClose || isClickedPopupOpener) {
      this.close();
    }
  }

  init() {
    window.addEventListener(
      'best-practice.topic.click',
      this.handleBestPracticeTopicClick
    );
    window.addEventListener(
      'best-practice.topic.toggle',
      this.handleBestPracticeTopicToggle
    );

    window.addEventListener(
      'roadmap.topic.click',
      this.handleRoadmapTopicClick
    );

    window.addEventListener('click', this.handleOverlayClick);
    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'escape') {
        this.close();
      }
    });
  }
}

// Initialize the topic loader
const topic = new Topic();
topic.init();
