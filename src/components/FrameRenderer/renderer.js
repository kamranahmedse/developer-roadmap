import { wireframeJSONToSVG } from 'roadmap-renderer';

export class Renderer {
  constructor() {
    this.resourceId = '';
    this.resourceType = '';
    this.jsonUrl = '';

    this.containerId = 'resource-svg';

    this.init = this.init.bind(this);
    this.onDOMLoaded = this.onDOMLoaded.bind(this);
    this.jsonToSvg = this.jsonToSvg.bind(this);
    this.handleSvgClick = this.handleSvgClick.bind(this);
    this.prepareConfig = this.prepareConfig.bind(this);
  }

  get containerEl() {
    return document.getElementById(this.containerId);
  }

  prepareConfig() {
    if (!this.containerEl) {
      return false;
    }

    const dataset = this.containerEl.dataset;

    this.resourceType = dataset.resourceType;
    this.resourceId = dataset.resourceId;
    this.jsonUrl = dataset.jsonUrl;

    return true;
  }

  /**
   * @param { string } jsonUrl
   * @returns {Promise<SVGElement>}
   */
  jsonToSvg(jsonUrl) {
    if (!jsonUrl) {
      console.error('jsonUrl not defined in frontmatter');
      return null;
    }

    return fetch(jsonUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        return wireframeJSONToSVG(json, {
          fontURL: '/fonts/balsamiq.woff2',
        });
      });
  }

  onDOMLoaded() {
    if (!this.prepareConfig()) {
      return;
    }

    this.jsonToSvg(this.jsonUrl)
      .then((svg) => {
        document.getElementById(this.containerId).replaceChildren(svg);
      })
      .catch(console.error);
  }

  handleSvgClick(e) {
    const targetGroup = e.target.closest('g') || {};
    const groupId = targetGroup.dataset ? targetGroup.dataset.groupId : '';
    if (!groupId) {
      return;
    }

    e.stopImmediatePropagation();

    if (/^ext_link/.test(groupId)) {
      window.open(`https://${groupId.replace('ext_link:', '')}`);
      return;
    }

    // Remove sorting prefix from groupId
    const normalizedGroupId = groupId.replace(/^\d+-/, '');

    window.dispatchEvent(
      new CustomEvent(`${this.resourceType}.topic.click`, {
        detail: {
          topicId: normalizedGroupId,
          resourceId: this.resourceId,
        },
      })
    );
  }

  init() {
    window.addEventListener('DOMContentLoaded', this.onDOMLoaded);
    window.addEventListener('click', this.handleSvgClick);
  }
}

const renderer = new Renderer();
renderer.init();
