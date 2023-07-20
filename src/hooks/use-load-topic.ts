import { useEffect } from 'preact/hooks';
import type {
  ResourceProgressType,
  ResourceType,
} from '../lib/resource-progress';

type CallbackType = (data: {
  resourceType: ResourceType;
  resourceId: string;
  topicId: string;
  status: ResourceProgressType;
}) => void;

export function useLoadTopic(callback: CallbackType) {
  useEffect(() => {
    function handleTopicClick(e: any) {
      const { resourceType, resourceId, topicId, status } = e.detail;
      console.log('handleTopicClick', e.detail);
      callback({
        resourceType,
        resourceId,
        topicId,
        status,
      });
    }

    window.addEventListener(`roadmap.topic.click`, handleTopicClick);
    window.addEventListener(`best-practice.topic.click`, handleTopicClick);

    return () => {
      window.removeEventListener(`roadmap.topic.click`, handleTopicClick);
      window.removeEventListener(`best-practice.topic.click`, handleTopicClick);
    };
  }, []);
}
