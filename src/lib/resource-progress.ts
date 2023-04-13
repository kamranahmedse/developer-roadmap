import { httpGet, httpPatch } from './http';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from './jwt';
import Element = astroHTML.JSX.Element;

export type ResourceType = 'roadmap' | 'best-practice';

type TopicMeta = {
  topicId: string;
  resourceType: ResourceType;
  resourceId: string;
};

export async function isTopicDone(topic: TopicMeta): Promise<boolean> {
  const { topicId, resourceType, resourceId } = topic;
  const doneItems = await getResourceProgress(resourceType, resourceId);

  if (!doneItems) {
    return false;
  }

  return doneItems.includes(topicId);
}

export async function toggleMarkTopicDone(
  topic: TopicMeta,
  isDone: boolean
): Promise<boolean> {
  const { topicId, resourceType, resourceId } = topic;

  const { response, error } = await httpPatch<{ done: string[] }>(
    `${import.meta.env.PUBLIC_API_URL}/v1-toggle-mark-resource-done`,
    {
      topicId,
      resourceType,
      resourceId,
      isDone,
    }
  );

  if (error || !response?.done) {
    throw new Error(error?.message || 'Something went wrong');
  }

  setResourceProgress(resourceType, resourceId, response.done);

  return isDone;
}

export async function getResourceProgress(
  resourceType: 'roadmap' | 'best-practice',
  resourceId: string
): Promise<string[]> {
  // No need to load progress if user is not logged in
  if (!Cookies.get(TOKEN_COOKIE_NAME)) {
    return [];
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

  return progress.done;
}

async function loadFreshProgress(
  resourceType: ResourceType,
  resourceId: string
) {
  const { response, error } = await httpGet<{ done: string[] }>(
    `${import.meta.env.PUBLIC_API_URL}/v1-get-user-resource-progress`,
    {
      resourceType,
      resourceId,
    }
  );

  if (error) {
    console.error(error);
    return [];
  }

  if (!response?.done) {
    return [];
  }

  setResourceProgress(resourceType, resourceId, response.done);

  return response.done;
}

export function setResourceProgress(
  resourceType: 'roadmap' | 'best-practice',
  resourceId: string,
  done: string[]
): void {
  localStorage.setItem(
    `${resourceType}-${resourceId}-progress`,
    JSON.stringify({
      done,
      timestamp: new Date().getTime(),
    })
  );
}

export function renderTopicProgress(topicId: string, isDone: boolean) {
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
    } else {
      element.classList.remove('done');
    }
  });
}

export async function renderResourceProgress(
  resourceType: ResourceType,
  resourceId: string
) {
  const progress = await getResourceProgress(resourceType, resourceId);

  progress.forEach((topicId) => {
    renderTopicProgress(topicId, true);
  });
}
