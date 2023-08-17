import { useEffect } from 'preact/hooks';
import type { ResourceType } from '../lib/resource-progress';

type CallbackType = (data: {
  resourceType: ResourceType;
  resourceId: string;
  topicId: string;
}) => void;

export function useToggleTopic(callback: CallbackType) {
  useEffect(() => {
    function handleToggleTopic(e: any) {
      const { resourceType, resourceId, topicId } = e.detail;

      callback({
        resourceType,
        resourceId,
        topicId,
      });
    }

    window.addEventListener(`roadmap.topic.toggle`, handleToggleTopic);
    window.addEventListener(`best-practice.topic.toggle`, handleToggleTopic);
    return () => {
      window.removeEventListener(
        `best-practice.topic.toggle`,
        handleToggleTopic
      );
    };
  }, []);
}
