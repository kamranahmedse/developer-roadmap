import Cookies from 'js-cookie';
import { httpGet, httpPost } from './http';
import { TOKEN_COOKIE_NAME } from './jwt';
import Element = astroHTML.JSX.Element;

export type ResourceType = 'roadmap' | 'best-practice';
export type ResourceProgressType = 'done' | 'learning' | 'pending' | 'skipped' | 'removed';

type TopicMeta = {
  topicId: string;
  resourceType: ResourceType;
  resourceId: string;
};

export async function isTopicDone(topic: TopicMeta): Promise<boolean> {
  const { topicId, resourceType, resourceId } = topic;
  const { done = [] } =
    (await getResourceProgress(resourceType, resourceId)) || {};

  return done?.includes(topicId);
}

export async function getTopicStatus(
  topic: TopicMeta
): Promise<ResourceProgressType> {
  const { topicId, resourceType, resourceId } = topic;
  const progressResult = await getResourceProgress(resourceType, resourceId);

  if (progressResult?.done?.includes(topicId)) {
    return 'done';
  }

  if (progressResult?.learning?.includes(topicId)) {
    return 'learning';
  }

  if (progressResult?.skipped?.includes(topicId)) {
    return 'skipped';
  }

  return 'pending';
}

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

  setResourceProgress(
    resourceType,
    resourceId,
    response.done,
    response.learning,
    response.skipped
  );

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

  const progressKey = `${resourceType}-${resourceId}-progress`;
  const isFavoriteKey = `${resourceType}-${resourceId}-favorite`;

  const rawIsFavorite = localStorage.getItem(isFavoriteKey);
  const isFavorite = JSON.parse(rawIsFavorite || '0') === 1;

  const rawProgress = localStorage.getItem(progressKey);
  const progress = JSON.parse(rawProgress || 'null');

  const progressTimestamp = progress?.timestamp;
  const diff = new Date().getTime() - parseInt(progressTimestamp || '0', 10);
  const isProgressExpired = diff > 15 * 60 * 1000; // 15 minutes

  if (!progress || isProgressExpired) {
    return loadFreshProgress(resourceType, resourceId);
  }

  // Dispatch event to update favorite status in the MarkFavorite component
  window.dispatchEvent(
    new CustomEvent('mark-favorite', {
      detail: {
        resourceType,
        resourceId,
        isFavorite
      }
    })
  );

  return progress;
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
    };
  }

  setResourceProgress(
    resourceType,
    resourceId,
    response?.done || [],
    response?.learning || [],
    response?.skipped || [],
  );

  // Dispatch event to update favorite status in the MarkFavorite component
  window.dispatchEvent(
    new CustomEvent('mark-favorite', {
      detail: {
        resourceType,
        resourceId,
        isFavorite: response.isFavorite
      }
    })
  );

  return response;
}

export function setResourceProgress(
  resourceType: 'roadmap' | 'best-practice',
  resourceId: string,
  done: string[],
  learning: string[],
  skipped: string[],
): void {
  localStorage.setItem(
    `${resourceType}-${resourceId}-progress`,
    JSON.stringify({
      done,
      learning,
      skipped,
      timestamp: new Date().getTime(),
    })
  );
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

export function clearResourceProgress() {
  const clickableElements = document.querySelectorAll('.clickable-group')
  for (const clickableElement of clickableElements) {
    clickableElement.classList.remove('done', 'skipped', 'learning', 'removed');
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
    totalClickable - externalLinks - roadmapSwitchers - checkBoxes - totalRemoved;

  const totalDone =
    document.querySelectorAll('.clickable-group.done').length -
    totalCheckBoxesDone;
  const totalLearning = document.querySelectorAll(
    '.clickable-group.learning'
  ).length - totalCheckBoxesLearning;
  const totalSkipped = document.querySelectorAll(
    '.clickable-group.skipped'
  ).length - totalCheckBoxesSkipped;

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
