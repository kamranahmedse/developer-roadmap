import Cookies from 'js-cookie';
import { httpGet, httpPost } from './http';
import { TOKEN_COOKIE_NAME } from './jwt';
import Element = astroHTML.JSX.Element;

export type ResourceType = 'roadmap' | 'best-practice';
export type ResourceProgressType =
  | 'done'
  | 'learning'
  | 'pending'
  | 'skipped'
  | 'removed';

type TopicMeta = {
  topicId: string;
  resourceType: ResourceType;
  resourceId: string;
};

export async function updateResourceProgress(
  topic: TopicMeta,
  progressType: ResourceProgressType
) {
  const { topicId, resourceType, resourceId } = topic;

  const { response, error } = await httpPost<{
    done: string[];
    learning: string[];
    skipped: string[];
    isFavorite: boolean;
  }>(`${import.meta.env.PUBLIC_API_URL}/v1-update-resource-progress`, {
    topicId,
    resourceType,
    resourceId,
    progress: progressType,
  });

  if (error || !response?.done || !response?.learning) {
    throw new Error(error?.message || 'Something went wrong');
  }

  return response;
}

export async function getResourceProgress(
  resourceType: 'roadmap' | 'best-practice',
  resourceId: string
): Promise<{ done: string[]; learning: string[]; skipped: string[] }> {
  // No need to load progress if user is not logged in
  if (!Cookies.get(TOKEN_COOKIE_NAME)) {
    return {
      done: [],
      learning: [],
      skipped: [],
    };
  }

  return loadFreshProgress(resourceType, resourceId);
}

async function loadFreshProgress(
  resourceType: ResourceType,
  resourceId: string
) {
  const { response, error } = await httpGet<{
    done: string[];
    learning: string[];
    skipped: string[];
    isFavorite: boolean;
  }>(`${import.meta.env.PUBLIC_API_URL}/v1-get-user-resource-progress`, {
    resourceType,
    resourceId,
  });

  if (error || !response) {
    console.error(error);
    return {
      done: [],
      learning: [],
      skipped: [],
      isFavorite: false,
    };
  }

  // Dispatch event to update favorite status in the MarkFavorite component
  window.dispatchEvent(
    new CustomEvent('mark-favorite', {
      detail: {
        resourceType,
        resourceId,
        isFavorite: response.isFavorite,
      },
    })
  );

  return response;
}

export function renderTopicProgress(
  topicId: string,
  topicProgress: ResourceProgressType
) {
  const isLearning = topicProgress === 'learning';
  const isSkipped = topicProgress === 'skipped';
  const isDone = topicProgress === 'done';
  const isRemoved = topicProgress === 'removed';

  const matchingElements: Element[] = [];

  // Elements having sort order in the beginning of the group id
  document
    .querySelectorAll(`[data-group-id$="-${topicId}"]`)
    .forEach((element: unknown) => {
      const foundGroupId =
        (element as HTMLOrSVGElement)?.dataset?.groupId || '';
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

  matchingElements.forEach((element) => {
    if (isDone) {
      element.classList.add('done');
      element.classList.remove('learning', 'skipped');
    } else if (isLearning) {
      element.classList.add('learning');
      element.classList.remove('done', 'skipped');
    } else if (isSkipped) {
      element.classList.add('skipped');
      element.classList.remove('done', 'learning');
    } else if (isRemoved) {
      element.classList.add('removed');
      element.classList.remove('done', 'learning', 'skipped');
    } else {
      element.classList.remove('done', 'skipped', 'learning', 'removed');
    }
  });
}

export function clearResourceProgress(progress: ResourceProgressType) {
  const clickableElements = document.querySelectorAll('.clickable-group');
  for (const clickableElement of clickableElements) {
    clickableElement.classList.remove(progress);
  }
}

export async function renderResourceProgress(
  resourceType: ResourceType,
  resourceId: string
) {
  const {
    done = [],
    learning = [],
    skipped = [],
  } = (await getResourceProgress(resourceType, resourceId)) || {};

  done.forEach((topicId) => {
    renderTopicProgress(topicId, 'done');
  });

  learning.forEach((topicId) => {
    renderTopicProgress(topicId, 'learning');
  });

  skipped.forEach((topicId) => {
    renderTopicProgress(topicId, 'skipped');
  });

  refreshProgressCounters();
}

export function refreshProgressCounters() {
  const progressNumsContainers = document.querySelectorAll(
    '[data-progress-nums-container]'
  );
  const progressNums = document.querySelectorAll('[data-progress-nums]');
  if (progressNumsContainers.length === 0 || progressNums.length === 0) {
    return;
  }

  const totalClickable = document.querySelectorAll('.clickable-group').length;
  const externalLinks = document.querySelectorAll(
    '[data-group-id^="ext_link:"]'
  ).length;
  const roadmapSwitchers = document.querySelectorAll(
    '[data-group-id^="json:"]'
  ).length;
  const checkBoxes = document.querySelectorAll(
    '[data-group-id^="check:"]'
  ).length;

  const totalCheckBoxesDone = document.querySelectorAll(
    '[data-group-id^="check:"].done'
  ).length;
  const totalCheckBoxesLearning = document.querySelectorAll(
    '[data-group-id^="check:"].learning'
  ).length;
  const totalCheckBoxesSkipped = document.querySelectorAll(
    '[data-group-id^="check:"].skipped'
  ).length;

  const totalRemoved = document.querySelectorAll(
    '.clickable-group.removed'
  ).length;
  const totalItems =
    totalClickable -
    externalLinks -
    roadmapSwitchers -
    checkBoxes -
    totalRemoved;

  const totalDone =
    document.querySelectorAll('.clickable-group.done').length -
    totalCheckBoxesDone;
  const totalLearning =
    document.querySelectorAll('.clickable-group.learning').length -
    totalCheckBoxesLearning;
  const totalSkipped =
    document.querySelectorAll('.clickable-group.skipped').length -
    totalCheckBoxesSkipped;

  const doneCountEls = document.querySelectorAll('[data-progress-done]');
  if (doneCountEls.length > 0) {
    doneCountEls.forEach(
      (doneCountEl) => (doneCountEl.innerHTML = `${totalDone}`)
    );
  }

  const learningCountEls = document.querySelectorAll(
    '[data-progress-learning]'
  );
  if (learningCountEls.length > 0) {
    learningCountEls.forEach(
      (learningCountEl) => (learningCountEl.innerHTML = `${totalLearning}`)
    );
  }

  const skippedCountEls = document.querySelectorAll('[data-progress-skipped]');
  if (skippedCountEls.length > 0) {
    skippedCountEls.forEach(
      (skippedCountEl) => (skippedCountEl.innerHTML = `${totalSkipped}`)
    );
  }

  const totalCountEls = document.querySelectorAll('[data-progress-total]');
  if (totalCountEls.length > 0) {
    totalCountEls.forEach(
      (totalCountEl) => (totalCountEl.innerHTML = `${totalItems}`)
    );
  }

  const progressPercentage = Math.round(
    ((totalDone + totalSkipped) / totalItems) * 100
  );
  const progressPercentageEls = document.querySelectorAll(
    '[data-progress-percentage]'
  );
  if (progressPercentageEls.length > 0) {
    progressPercentageEls.forEach(
      (progressPercentageEl) =>
        (progressPercentageEl.innerHTML = `${progressPercentage}`)
    );
  }

  progressNumsContainers.forEach((progressNumsContainer) =>
    progressNumsContainer.classList.remove('striped-loader')
  );
  progressNums.forEach((progressNum) => {
    progressNum.classList.remove('opacity-0');
  });
}
