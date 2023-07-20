import { useEffect } from 'preact/hooks';
import type { ResourceProgressType, ResourceType } from '../lib/resource-progress';

type CallbackType = (data: {
  resourceType: ResourceType;
  resourceId: string;
  topicId: string;
  status: ResourceProgressType
}) => void;

export function useToggleTopic(callback: CallbackType) {
  useEffect(() => {
    function handleToggleTopic(e: any) {
      const { resourceType, resourceId, topicId, status } = e.detail;

      callback({
        resourceType,
        resourceId,
        topicId,
        status,
      });
    }

    window.addEventListener(`best-practice.topic.toggle`, handleToggleTopic);
    return () => {
      window.removeEventListener(
        `best-practice.topic.toggle`,
        handleToggleTopic
      );
    };
  }, []);
}
