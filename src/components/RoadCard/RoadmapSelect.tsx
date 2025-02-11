import { httpGet } from '../../lib/http';
import { useEffect, useState } from 'react';
import { pageProgressMessage } from '../../stores/page';
import { SelectionButton } from './SelectionButton';
import type { UserProgressResponse } from '../Roadmaps/RoadmapsPage';

type RoadmapSelectProps = {
  selectedRoadmaps: string[];
  setSelectedRoadmaps: (updatedRoadmaps: string[]) => void;
};

export function RoadmapSelect(props: RoadmapSelectProps) {
  const { selectedRoadmaps, setSelectedRoadmaps } = props;

  const [progressList, setProgressList] = useState<UserProgressResponse>();

  const fetchProgress = async () => {
    const { response, error } = await httpGet<UserProgressResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-user-all-progress`,
    );

    if (error || !response) {
      return;
    }

    setProgressList(response);
  };

  useEffect(() => {
    fetchProgress().finally(() => {
      pageProgressMessage.set('');
    });
  }, []);

  const canSelectMore = selectedRoadmaps.length < 4;
  const allProgress =
    progressList?.filter(
      (progress) =>
        progress.resourceType === 'roadmap' &&
        progress.resourceId &&
        progress.resourceTitle,
    ) || [];

  return (
    <div className="flex flex-wrap gap-1">
      {allProgress?.length === 0 && (
        <p className="text-sm italic text-gray-400">
          No progress tracked so far.
        </p>
      )}

      {allProgress?.map((progress) => {
        const isSelected = selectedRoadmaps.includes(progress.resourceId);
        const canSelect = isSelected || canSelectMore;

        return (
          <SelectionButton
            key={progress.resourceId}
            text={progress.resourceTitle}
            isDisabled={!canSelect}
            isSelected={isSelected}
            onClick={() => {
              if (isSelected) {
                setSelectedRoadmaps(
                  selectedRoadmaps.filter(
                    (roadmap) => roadmap !== progress.resourceId,
                  ),
                );
              } else if (selectedRoadmaps.length < 4) {
                setSelectedRoadmaps([...selectedRoadmaps, progress.resourceId]);
              }
            }}
          />
        );
      })}
    </div>
  );
}
