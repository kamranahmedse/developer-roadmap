import { wireframeJSONToSVG } from 'roadmap-renderer';
import {
  renderResourceProgress,
  ResourceType,
} from '../../lib/resource-progress';
import { isLoggedIn } from '../../lib/jwt';
import { httpPost } from '../../lib/http';

export class Renderer {
  resourceId: string;
  resourceType: string;
  jsonUrl: string;
  loaderHTML: string | null;

  containerId: string;
  loaderId: string;

  constructor() {
    this.resourceId = '';
    this.resourceType = '';
    this.jsonUrl = '';
    this.loaderHTML = null;

    this.containerId = 'resource-svg-wrap';
    this.loaderId = 'resource-loader';

    this.init = this.init.bind(this);
    this.onDOMLoaded = this.onDOMLoaded.bind(this);
    this.jsonToSvg = this.jsonToSvg.bind(this);
    this.handleSvgClick = this.handleSvgClick.bind(this);
    this.prepareConfig = this.prepareConfig.bind(this);
    this.switchRoadmap = this.switchRoadmap.bind(this);
  }

  get loaderEl() {
    return document.getElementById(this.loaderId);
  }

  get containerEl() {
    return document.getElementById(this.containerId);
  }

  prepareConfig() {
    if (!this.containerEl) {
      return false;
    }

    // Clone it so we can use it later
    this.loaderHTML = this.loaderEl!.innerHTML;
    const dataset = this.containerEl.dataset;

    this.resourceType = dataset.resourceType!;
    this.resourceId = dataset.resourceId!;
    this.jsonUrl = dataset.jsonUrl!;

    return true;
  }

  /**
   * @param { string } jsonUrl
   * @returns {Promise<SVGElement>}
   */
  jsonToSvg(jsonUrl: string) {
    if (!jsonUrl) {
      console.error('jsonUrl not defined in frontmatter');
      return null;
    }

    if (!this.containerEl) {
      return null;
    }

    this.containerEl.innerHTML = this.loaderHTML!;

    return fetch(jsonUrl)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        return wireframeJSONToSVG(json, {
          fontURL: '/fonts/balsamiq.woff2',
        });
      })
      .then((svg) => {
        this.containerEl?.replaceChildren(svg);
      })
      .then(() => {
        return renderResourceProgress(
          this.resourceType as ResourceType,
          this.resourceId
        );
      })
      .catch((error) => {
        if (!this.containerEl) {
          return;
        }

        const message = `
          <strong>There was an error.</strong><br>
          
          Try loading the page again. or submit an issue on GitHub with following:<br><br>

          ${error.message} <br /> ${error.stack}
        `;
        this.containerEl.innerHTML = `<div class="error py-5 text-center text-red-600 mx-auto">${message}</div>`;
      });
  }

  trackVisit() {
    if (!isLoggedIn()) {
      return;
    }

    window.setTimeout(() => {
      httpPost(`${import.meta.env.PUBLIC_API_URL}/v1-visit`, {
        resourceId: this.resourceId,
        resourceType: this.resourceType,
      }).then(() => null);
    }, 0);
  }

  onDOMLoaded() {
    if (!this.prepareConfig()) {
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const roadmapType = urlParams.get('r');

    this.trackVisit();

    if (roadmapType) {
      this.switchRoadmap(`/jsons/roadmaps/${roadmapType}.json`);
    } else {
      this.jsonToSvg(this.jsonUrl);
    }
  }

  switchRoadmap(newJsonUrl: string) {
    const newJsonFileSlug = newJsonUrl.split('/').pop()?.replace('.json', '');

    // Update the URL and attach the new roadmap type
    if (window?.history?.pushState) {
      const url = new URL(window.location.href);
      const type = this.resourceType[0]; // r for roadmap, b for best-practices

      url.searchParams.delete(type);
      url.searchParams.set(type, newJsonFileSlug!);

      window.history.pushState(null, '', url.toString());
    }

    const pageType = this.resourceType.replace(/\b\w/g, (l) => l.toUpperCase());

    window.fireEvent({
      // RoadmapClick, BestPracticesClick, etc
      category: `${pageType.replace('-', '')}Click`,
      // roadmap/frontend/switch-version
      action: `${this.resourceId}/switch-version`,
      // roadmap/frontend/switch-version
      label: `${newJsonFileSlug}`,
    });

    this.jsonToSvg(newJsonUrl)?.then(() => {
      this.containerEl?.setAttribute('style', '');
    });
  }

  handleSvgClick(e: any) {
    const targetGroup = e.target?.closest('g') || {};
    const groupId = targetGroup.dataset ? targetGroup.dataset.groupId : '';
    if (!groupId) {
      return;
    }

    e.stopImmediatePropagation();

    if (/^ext_link/.test(groupId)) {
      window.open(`https://${groupId.replace('ext_link:', '')}`);
      return;
    }

    if (/^json:/.test(groupId)) {
      // e.g. /roadmaps/frontend-beginner.json
      const newJsonUrl = groupId.replace('json:', '');

      this.switchRoadmap(newJsonUrl);
      return;
    }

    if (/^check:/.test(groupId)) {
      window.dispatchEvent(
        new CustomEvent(`${this.resourceType}.topic.toggle`, {
          detail: {
            topicId: groupId.replace('check:', ''),
            resourceType: this.resourceType,
            resourceId: this.resourceId,
          },
        })
      );
      return;
    }

    // Remove sorting prefix from groupId
    const normalizedGroupId = groupId.replace(/^\d+-/, '');

    window.dispatchEvent(
      new CustomEvent(`${this.resourceType}.topic.click`, {
        detail: {
          topicId: normalizedGroupId,
          resourceId: this.resourceId,
          resourceType: this.resourceType,
        },
      })
    );
  }

  init() {
    window.addEventListener('DOMContentLoaded', this.onDOMLoaded);
    window.addEventListener('click', this.handleSvgClick);
    // window.addEventListener('contextmenu', this.handleSvgClick);
  }
}

const renderer = new Renderer();
renderer.init();
