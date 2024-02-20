import { useState } from 'react';
import type { GetPublicProfileResponse } from '../../api/user';
import { SelectionButton } from '../RoadCard/SelectionButton';
import { UserPublicProgressStats } from './UserPublicProgressStats';

type UserPublicProgressesProps = {
  username: string;
  roadmaps: GetPublicProfileResponse['roadmaps'];
  publicConfig: GetPublicProfileResponse['publicConfig'];
};

export function UserPublicProgresses(props: UserPublicProgressesProps) {
  const { roadmaps: roadmapProgresses, username, publicConfig } = props;
  const { roadmapVisibility, customRoadmapVisibility } = publicConfig! || {};

  const roadmaps = roadmapProgresses.filter(
    (roadmap) => !roadmap.isCustomResource,
  );
  const customRoadmaps = roadmapProgresses.filter(
    (roadmap) => roadmap.isCustomResource,
  );

  return (
    <div>
      {roadmapVisibility !== 'none' && (
        <>
          <h2 className="text-xs uppercase text-gray-400">My Skills</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {roadmaps.map((roadmap, counter) => (
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
            ))}
          </ul>
        </>
      )}

      {customRoadmapVisibility !== 'none' && (
        <>
          <h2 className="mt-6 text-xs uppercase text-gray-400">My Roadmaps</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {customRoadmaps.map((roadmap, counter) => (
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
        </>
      )}
    </div>
  );
}
