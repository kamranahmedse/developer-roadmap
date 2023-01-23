import { wireframeJSONToSVG } from 'roadmap-renderer';
import { Topic } from './topic';
import { Sharer } from './sharer';

/**
 * @typedef {{ roadmapId: string, jsonUrl: string }} RoadmapConfig
 */

export class Renderer {
  /**
   * @param {RoadmapConfig} config
   */
  constructor() {
    this.roadmapId = '';
    this.jsonUrl = '';

    this.containerId = 'roadmap-svg';

    this.init = this.init.bind(this);
    this.onDOMLoaded = this.onDOMLoaded.bind(this);
    this.fetchRoadmapSvg = this.fetchRoadmapSvg.bind(this);
    this.handleRoadmapClick = this.handleRoadmapClick.bind(this);
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

    this.roadmapId = dataset.roadmapId;
    this.jsonUrl = dataset.jsonUrl;

    return true;
  }

  /**
   * @param { string } jsonUrl
   * @returns {Promise<SVGElement>}
   */
  fetchRoadmapSvg(jsonUrl) {
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

    this.fetchRoadmapSvg(this.jsonUrl)
      .then((svg) => {
        document.getElementById(this.containerId).replaceChildren(svg);
      })
      .catch(console.error);
  }

  handleRoadmapClick(e) {
    const targetGroup = e.target.closest('g') || {};
    const groupId = targetGroup.dataset ? targetGroup.dataset.groupId : '';
    if (!groupId) {
      return;
    }

    e.stopImmediatePropagation();

    window.dispatchEvent(
      new CustomEvent('topic.click', {
        detail: {
          topicId: groupId,
          roadmapId: this.roadmapId,
        },
      })
    );
  }

  init() {
    window.addEventListener('DOMContentLoaded', this.onDOMLoaded);
    window.addEventListener('click', this.handleRoadmapClick);
  }
}

const renderer = new Renderer();
renderer.init();

// Initialize the topic loader
const topic = new Topic();
topic.init();

// Handles the share icons on the roadmap page
const sharer = new Sharer();
sharer.init();
