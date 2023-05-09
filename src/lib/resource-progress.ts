import { httpGet, httpPost } from './http';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from './jwt';
import Element = astroHTML.JSX.Element;

export type ResourceType = 'roadmap' | 'best-practice';
export type ResourceProgressType = 'done' | 'learning' | 'pending';

type TopicMeta = {
  topicId: string;
  resourceType: ResourceType;
  resourceId: string;
};

export async function isTopicDone(topic: TopicMeta): Promise<boolean> {
  const { topicId, resourceType, resourceId } = topic;
  const progressResult = await getResourceProgress(resourceType, resourceId);

  if (!progressResult.done) {
    return false;
  }

  return progressResult.done.includes(topicId);
}

export async function getTopicStatus(
  topic: TopicMeta
): Promise<ResourceProgressType> {
  const { topicId, resourceType, resourceId } = topic;
  const progressResult = await getResourceProgress(resourceType, resourceId);

  if (progressResult.done.includes(topicId)) {
    return 'done';
  }

  if (progressResult.learning.includes(topicId)) {
    return 'learning';
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
    response.learning
  );
  return response;
}

export async function getResourceProgress(
  resourceType: 'roadmap' | 'best-practice',
  resourceId: string
): Promise<{ done: string[]; learning: string[] }> {
  // No need to load progress if user is not logged in
  if (!Cookies.get(TOKEN_COOKIE_NAME)) {
    return {
      done: [],
      learning: [],
    };
  }

  const progressKey = `${resourceType}-${resourceId}-progress`;

  const rawProgress = localStorage.getItem(progressKey);
  const progress = JSON.parse(rawProgress || 'null');

  const progressTimestamp = progress?.timestamp;
  const diff = new Date().getTime() - parseInt(progressTimestamp || '0', 10);
  const isProgressExpired = diff > 15 * 60 * 1000; // 15 minutes

  if (!progress || isProgressExpired) {
    return loadFreshProgress(resourceType, resourceId);
  }

  return progress;
}

async function loadFreshProgress(
  resourceType: ResourceType,
  resourceId: string
) {
  const { response, error } = await httpGet<{
    done: string[];
    learning: string[];
  }>(`${import.meta.env.PUBLIC_API_URL}/v1-get-user-resource-progress`, {
    resourceType,
    resourceId,
  });

  if (error) {
    console.error(error);
    return {
      done: [],
      learning: [],
    };
  }

  if (!response?.done || !response?.learning) {
    return {
      done: [],
      learning: [],
    };
  }

  setResourceProgress(
    resourceType,
    resourceId,
    response.done,
    response.learning
  );

  return response;
}

export function setResourceProgress(
  resourceType: 'roadmap' | 'best-practice',
  resourceId: string,
  done: string[],
  learning: string[]
): void {
  localStorage.setItem(
    `${resourceType}-${resourceId}-progress`,
    JSON.stringify({
      done,
      learning,
      timestamp: new Date().getTime(),
    })
  );
}

export function renderTopicProgress(
  topicId: string,
  isDone: boolean,
  isLearning: boolean
) {
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
    } else if (isLearning) {
      element.classList.add('learning');
    } else {
      element.classList.remove('done');
      element.classList.remove('learning');
    }
  });
}

export async function renderResourceProgress(
  resourceType: ResourceType,
  resourceId: string
) {
  const progress = await getResourceProgress(resourceType, resourceId);

  progress.done.forEach((topicId) => {
    renderTopicProgress(topicId, true, false);
  });

  progress.learning.forEach((topicId) => {
    renderTopicProgress(topicId, false, true);
  });
}
