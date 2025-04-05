import type { GetPublicProfileResponse } from '../../api/user';
import { getPercentage } from '../../lib/number';

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
      {customRoadmapVisibility !== 'none' && customRoadmaps?.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-2 text-xs uppercase tracking-wide text-gray-400">
            Roadmaps made by me
          </h2>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3">
            {customRoadmaps.map((roadmap, counter) => {
              const doneCount = roadmap.done;
              const skippedCount = roadmap.skipped;
              const totalCount = roadmap.total;

              const totalMarked = doneCount + skippedCount;
              const progressPercentage = getPercentage(totalMarked, totalCount);

              return (
                <a
                  target="_blank"
                  href={`/r/${roadmap.roadmapSlug}`}
                  key={roadmap.id + counter}
                  className="rounded-md border bg-white px-3 py-2 text-left text-sm shadow-xs transition-all hover:border-gray-300 hover:bg-gray-50"
                >
                  {roadmap.title}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {roadmapVisibility !== 'none' && roadmaps.length > 0 && (
        <>
          <h2 className="mb-2 text-xs uppercase tracking-wide text-gray-400">
            Skills I have mastered
          </h2>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3">
            {roadmaps.map((roadmap, counter) => {
              const percentageDone = getPercentage(
                roadmap.done + roadmap.skipped,
                roadmap.total,
              );

              return (
                <a
                  target="_blank"
                  key={roadmap.id + counter}
                  href={`/${roadmap.id}?s=${userId}`}
                  className="group relative flex items-center justify-between overflow-hidden rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm transition-all hover:border-gray-400"
                >
                  <span className="grow truncate">{roadmap.title}</span>
                  <span className="text-xs text-gray-400">
                    {percentageDone}%
                  </span>

                  <span
                    className="absolute left-0 top-0 block h-full cursor-pointer rounded-tl-md bg-black/5 transition-colors group-hover:bg-black/10"
                    style={{
                      width: `${percentageDone}%`,
                    }}
                  ></span>
                </a>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
