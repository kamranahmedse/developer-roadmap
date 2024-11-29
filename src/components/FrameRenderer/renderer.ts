import { wireframeJSONToSVG } from 'roadmap-renderer';
import { isLoggedIn } from '../../lib/jwt';
import type {
  ResourceProgressType,
  ResourceType,
} from '../../lib/resource-progress';
import {
  refreshProgressCounters,
  renderResourceProgress,
  renderTopicProgress,
  updateResourceProgress,
} from '../../lib/resource-progress';
import { pageProgressMessage } from '../../stores/page';
import { showLoginPopup } from '../../lib/popup';
import { replaceChildren } from '../../lib/dom.ts';
import { setUrlParams } from '../../lib/browser.ts';

export class Renderer {
  resourceId: string;
  resourceType: ResourceType | string;
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
    this.handleSvgRightClick = this.handleSvgRightClick.bind(this);
    this.prepareConfig = this.prepareConfig.bind(this);
    this.switchRoadmap = this.switchRoadmap.bind(this);
    this.updateTopicStatus = this.updateTopicStatus.bind(this);
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
    this.loaderHTML = this.loaderEl?.innerHTML!;
    const dataset = this.containerEl.dataset;

    this.resourceType = dataset.resourceType!;
    this.resourceId = dataset.resourceId!;

    return true;
  }

  jsonToSvg(jsonUrl: string): Promise<void> | null {
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
        replaceChildren(this.containerEl!, svg);
      })
      .then(() => {
        return renderResourceProgress(
          this.resourceType as ResourceType,
          this.resourceId,
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

  onDOMLoaded() {
    if (!this.prepareConfig()) {
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const roadmapType = urlParams.get('r');

    if (roadmapType) {
      this.switchRoadmap(`/${roadmapType}.json`);
    } else {
      this.jsonToSvg(
        this.resourceType === 'roadmap'
          ? `/${this.resourceId}.json`
          : `/best-practices/${this.resourceId}.json`,
      );
    }
  }

  switchRoadmap(newJsonUrl: string) {
    this.containerEl?.setAttribute('style', '');

    const newJsonFileSlug = newJsonUrl.split('/').pop()?.replace('.json', '');

    const type = this.resourceType[0]; // r for roadmap, b for best-practices
    setUrlParams({ [type]: newJsonFileSlug! });

    this.jsonToSvg(newJsonUrl)?.then(() => {});
  }

  updateTopicStatus(topicId: string, newStatus: ResourceProgressType) {
    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }

    if (/^check:/.test(topicId)) {
      topicId = topicId.replace('check:', '');
    }

    pageProgressMessage.set('Updating progress');
    updateResourceProgress(
      {
        resourceId: this.resourceId,
        resourceType: this.resourceType as ResourceType,
        topicId,
      },
      newStatus,
    )
      .then(() => {
        renderTopicProgress(topicId, newStatus);
        refreshProgressCounters();
      })
      .catch((err) => {
        alert('Something went wrong, please try again.');
        console.error(err);
      })
      .finally(() => {
        pageProgressMessage.set('');
      });

    return;
  }

  handleSvgRightClick(e: any) {
    const targetGroup = e.target?.closest('g') || {};
    const groupId = targetGroup.dataset ? targetGroup.dataset.groupId : '';
    if (!groupId) {
      return;
    }

    if (targetGroup.classList.contains('removed')) {
      return;
    }

    e.preventDefault();

    const isCurrentStatusDone = targetGroup.classList.contains('done');
    const normalizedGroupId = groupId.replace(/^\d+-/, '');

    if (normalizedGroupId.startsWith('ext_link:')) {
      return;
    }

    this.updateTopicStatus(
      normalizedGroupId,
      !isCurrentStatusDone ? 'done' : 'pending',
    );
  }

  handleSvgClick(e: any) {
    const targetGroup = e.target?.closest('g') || {};
    const groupId = targetGroup.dataset ? targetGroup.dataset.groupId : '';
    if (!groupId) {
      return;
    }

    e.stopImmediatePropagation();

    if (targetGroup.classList.contains('removed')) {
      return;
    }

    if (/^ext_link/.test(groupId)) {
      const externalLink = groupId.replace('ext_link:', '');

      if (!externalLink.startsWith('roadmap.sh')) {
        window.fireEvent({
          category: 'RoadmapExternalLink',
          action: `${this.resourceType} / ${this.resourceId}`,
          label: externalLink,
        });

        window.open(`https://${externalLink}`);
      } else {
        window.location.href = `https://${externalLink}`;
      }

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
        }),
      );
      return;
    }

    // Remove sorting prefix from groupId
    const normalizedGroupId = groupId.replace(/^\d+-/, '');

    const isCurrentStatusLearning = targetGroup.classList.contains('learning');
    const isCurrentStatusSkipped = targetGroup.classList.contains('skipped');

    if (e.shiftKey) {
      e.preventDefault();
      this.updateTopicStatus(
        normalizedGroupId,
        !isCurrentStatusLearning ? 'learning' : 'pending',
      );
      return;
    }

    if (e.altKey) {
      e.preventDefault();
      this.updateTopicStatus(
        normalizedGroupId,
        !isCurrentStatusSkipped ? 'skipped' : 'pending',
      );

      return;
    }

    window.dispatchEvent(
      new CustomEvent(`${this.resourceType}.topic.click`, {
        detail: {
          topicId: normalizedGroupId,
          resourceId: this.resourceId,
          resourceType: this.resourceType,
        },
      }),
    );
  }

  init() {
    window.addEventListener('DOMContentLoaded', this.onDOMLoaded);
    window.addEventListener('click', this.handleSvgClick);
    window.addEventListener('contextmenu', this.handleSvgRightClick);
  }
}

const renderer = new Renderer();
renderer.init();
