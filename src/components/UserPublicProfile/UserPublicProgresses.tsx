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

  // <UserPublicProgressStats
  //                     updatedAt={roadmap.updatedAt}
  //                     title={roadmap.title}
  //                     totalCount={roadmap.total}
  //                     doneCount={roadmap.done}
  //                     learningCount={roadmap.learning}
  //                     skippedCount={roadmap.skipped}
  //                     resourceId={roadmap.id}
  //                     resourceType="roadmap"
  //                     roadmapSlug={roadmap.roadmapSlug}
  //                     username={username!}
  //                     isCustomResource={true}
  //                     userId={userId}
  //                   />

  return (
    <div>
      {customRoadmapVisibility !== 'none' && customRoadmaps?.length > 0 && (
        <div className='mb-5'>
          <h2 className="mb-2 text-xs uppercase tracking-wide text-gray-400">
            Roadmaps made by me
          </h2>
          <div className="grid grid-cols-3">
            {customRoadmaps.map((roadmap, counter) => (
              <a
                target="_blank"
                href={`/r/${roadmap.roadmapSlug}`}
                key={roadmap.id + counter}
                className="rounded-md border bg-white px-3 py-2 text-left text-sm shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
              >
                {roadmap.title}
              </a>
            ))}
          </div>
        </div>
      )}

      <div>
        {roadmapVisibility !== 'none' && (
          <>
            <h2 className="text-xs uppercase text-gray-400">My Skills</h2>
            <ul className="">
              {roadmaps.map((roadmap, counter) => (
                <li key={roadmap.id + counter} className="bg-white">
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
          </>
        )}
      </div>
    </div>
  );
}
