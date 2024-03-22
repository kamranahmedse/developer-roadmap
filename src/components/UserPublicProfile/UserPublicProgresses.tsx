import type { GetPublicProfileResponse } from '../../api/user';
import { UserPublicProgressStats } from './UserPublicProgressStats';

type UserPublicProgressesProps = {
  userId: string;
  username: string;
  roadmaps: GetPublicProfileResponse['roadmaps'];
  publicConfig: GetPublicProfileResponse['publicConfig'];
};

export function UserPublicProgresses(props: UserPublicProgressesProps) {
  const {
    roadmaps: roadmapProgresses = [],
    username,
    publicConfig,
    userId,
  } = props;
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
          {roadmaps?.length === 0 ? (
            <div className="mt-4 text-sm text-gray-500">
              No skills added yet.
            </div>
          ) : (
            <ul className="mt-4 grid grid-cols-2 gap-2 max-md:grid-cols-1">
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
                    userId={userId}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {customRoadmapVisibility !== 'none' && (
        <>
          <h2 className="mt-6 text-xs uppercase text-gray-400">My Roadmaps</h2>
          {customRoadmaps?.length === 0 ? (
            <div className="mt-4 text-sm text-gray-500">
              No roadmaps added yet.
            </div>
          ) : (
            <ul className="mt-4 grid grid-cols-2 gap-2 max-md:grid-cols-1">
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
                    userId={userId}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
