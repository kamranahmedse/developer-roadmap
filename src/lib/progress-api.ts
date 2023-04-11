import { httpPatch } from './http';

export async function toggleMarkResourceDoneApi({
  resourceId,
  resourceType,
  topicId,
}: {
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice';
  topicId: string;
}) {
  return await httpPatch<{
    status: 'ok';
  }>(`${import.meta.env.PUBLIC_API_URL}/v1-toggle-mark-resource-done`, {
    resourceId,
    resourceType,
    topicId,
  });
}
