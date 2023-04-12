import { httpGet, httpPatch } from './http';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from './jwt';

export type ResourceType = 'roadmap' | 'best-practice';

type TopicMeta = {
  topicId: string;
  resourceType: ResourceType;
  resourceId: string;
};

export async function isTopicDone(topic: TopicMeta): Promise<boolean> {
  const { topicId, resourceType, resourceId } = topic;
  const doneItems = await getUserResourceProgress(resourceType, resourceId);

  if (!doneItems) {
    return false;
  }

  return doneItems.includes(topicId);
}

export async function toggleMarkTopicDone(
  topic: TopicMeta,
  isDone: boolean
): Promise<void> {
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

  setUserResourceProgress(resourceType, resourceId, response.done);
}
export async function getUserResourceProgress(
  resourceType: 'roadmap' | 'best-practice',
  resourceId: string
): Promise<string[]> {
  const progressKey = `${resourceType}-${resourceId}-progress`;
  const rawProgress = localStorage.getItem(progressKey);
  const progress = JSON.parse(rawProgress || 'null');

  const progressTimestamp = progress?.timestamp;
  const diff = new Date().getTime() - parseInt(progressTimestamp || '0', 10);
  const isProgressExpired = diff > 10 * 60 * 1000; // 10 minutes

  console.log(progressKey);

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
    if (error.status === 401) {
      Cookies.remove(TOKEN_COOKIE_NAME);
      window.location.reload();

      return [];
    }

    console.error(error);
    return [];
  }

  if (!response?.done) {
    return [];
  }

  setUserResourceProgress(resourceType, resourceId, response.done);

  return response.done;
}

export function setUserResourceProgress(
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
