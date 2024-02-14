import { useState } from 'react';
import type { GetPublicProfileResponse } from '../../api/user';
import { SelectionButton } from '../RoadCard/SelectionButton';
import { UserPublicProgressStats } from './UserPublicProgressStats';

type UserPublicProgressesProps = {
  username: string;
  roadmaps: GetPublicProfileResponse['roadmaps'];
};

export function UserPublicProgresses(props: UserPublicProgressesProps) {
  const { roadmaps: roadmapProgresses, username } = props;

  const [activeTab, setActiveTab] = useState<'built-in' | 'custom'>('built-in');

  const roadmaps = roadmapProgresses.filter(
    (roadmap) => !roadmap.isCustomResource,
  );
  const customRoadmaps = roadmapProgresses.filter(
    (roadmap) => roadmap.isCustomResource,
  );

  return (
    <div>
      <div className="flex items-center gap-2">
        <SelectionButton
          isSelected={activeTab === 'built-in'}
          isDisabled={activeTab === 'built-in'}
          onClick={() => setActiveTab('built-in')}
          text="Learning Activities"
        />
        <SelectionButton
          isSelected={activeTab === 'custom'}
          isDisabled={activeTab === 'custom'}
          onClick={() => setActiveTab('custom')}
          text="Custom Activities"
        />
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-2">
        {activeTab === 'built-in'
          ? roadmaps.map((roadmap, counter) => (
              <li key={roadmap.id + counter}>
                <UserPublicProgressStats
                  updatedAt={roadmap.updatedAt}
                  title={roadmap.title}
                  totalCount={roadmap.total}
                  doneCount={roadmap.done}
                  learningCount={roadmap.learning}
                  skippedCount={roadmap.skipped}
                  resourceId={roadmap.id}
                  resourceType="roadmap"
                  roadmapSlug={roadmap.roadmapSlug}
                  isCustomResource={false}
                  username={username!}
                />
              </li>
            ))
          : customRoadmaps.map((roadmap, counter) => (
              <li key={roadmap.id + counter}>
                <UserPublicProgressStats
                  updatedAt={roadmap.updatedAt}
                  title={roadmap.title}
                  totalCount={roadmap.total}
                  doneCount={roadmap.done}
                  learningCount={roadmap.learning}
                  skippedCount={roadmap.skipped}
                  resourceId={roadmap.id}
                  resourceType="roadmap"
                  roadmapSlug={roadmap.roadmapSlug}
                  username={username!}
                  isCustomResource={true}
                />
              </li>
            ))}
      </ul>
    </div>
  );
}
