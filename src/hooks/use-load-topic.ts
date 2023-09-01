import { useEffect } from 'react';
import type { ResourceType } from '../lib/resource-progress';

type CallbackType = (data: {
  resourceType: ResourceType;
  resourceId: string;
  topicId: string;
  isCustomRoadmap: boolean;
}) => void;

export function useLoadTopic(callback: CallbackType) {
  useEffect(() => {
    function handleTopicClick(e: any) {
      const { resourceType, resourceId, topicId, isCustomRoadmap = false } = e.detail;

      callback({
        resourceType,
        resourceId,
        topicId,
        isCustomRoadmap
      });
    }

    window.addEventListener(`roadmap.topic.click`, handleTopicClick);
    window.addEventListener(`best-practice.topic.click`, handleTopicClick);
    window.addEventListener(`roadmap.node.click`, handleTopicClick);

    return () => {
      window.removeEventListener(`roadmap.topic.click`, handleTopicClick);
      window.removeEventListener(`best-practice.topic.click`, handleTopicClick);
      window.removeEventListener(`roadmap.node.click`, handleTopicClick);
    };
  }, []);
}
