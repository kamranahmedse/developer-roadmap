import type { GetPublicProfileResponse } from '../../api/user';
import { UserActivityHeatmap } from './UserPublicActivityHeatmap';
import { UserPublicProfileHeader } from './UserPublicProfileHeader';
import { UserPublicProgressStats } from './UserPublicProgressStats';
import { UserPublicProgresses } from './UserPublicProgresses';

type UserPublicProfilePageProps = GetPublicProfileResponse;

export function UserPublicProfilePage(props: UserPublicProfilePageProps) {
  const { activity, username } = props;

  return (
    <section className="container mt-5 pb-10">
      <UserPublicProfileHeader userDetails={props!} />
      <div className="mt-10">
        <UserActivityHeatmap activity={activity!} />
      </div>
      <div className="mt-10">
        <UserPublicProgresses username={username!} roadmaps={props.roadmaps} />
      </div>
      {/* 
      {learningRoadmaps.length > 0 && (
        <>
          <h2 className="mt-6 text-xl font-bold">Learning Progress</h2>
          <div className="mt-4 flex flex-col gap-3">
            {learningRoadmaps
              .sort((a, b) => {
                const updatedAtA = new Date(a.updatedAt);
                const updatedAtB = new Date(b.updatedAt);

                return updatedAtB.getTime() - updatedAtA.getTime();
              })
              .map((roadmap) => (
                <UserPublicProgressStats
                  key={roadmap.id}
                  roadmapSlug={roadmap.roadmapSlug}
                  isCustomResource={roadmap.isCustomResource}
                  doneCount={roadmap.done || 0}
                  learningCount={roadmap.learning || 0}
                  totalCount={roadmap.total || 0}
                  skippedCount={roadmap.skipped || 0}
                  resourceId={roadmap.id}
                  resourceType={'roadmap'}
                  updatedAt={roadmap.updatedAt}
                  title={roadmap.title}
                  username={username!}
                />
              ))}
          </div>
        </>
      )} */}
    </section>
  );
}
