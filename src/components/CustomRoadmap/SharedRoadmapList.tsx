import { ExternalLinkIcon, Map, Plus } from 'lucide-react';
import RoadmapIcon from '../../icons/roadmap.svg';
import type { GetRoadmapListResponse } from './RoadmapListPage';

type GroupByCreator = {
  creator: GetRoadmapListResponse['sharedRoadmaps'][number]['creator'];
  roadmaps: GetRoadmapListResponse['sharedRoadmaps'];
};

type SharedRoadmapListProps = {
  roadmaps: GetRoadmapListResponse['sharedRoadmaps'];
};

export function SharedRoadmapList(props: SharedRoadmapListProps) {
  const { roadmaps: sharedRoadmaps } = props;

  const allUniqueCreatorIds = new Set(
    sharedRoadmaps.map((roadmap) => roadmap.creator.id)
  );

  const groupByCreator: GroupByCreator[] = [];
  for (const creatorId of allUniqueCreatorIds) {
    const creator = sharedRoadmaps.find(
      (roadmap) => roadmap.creator.id === creatorId
    )?.creator;
    if (!creator) {
      continue;
    }

    groupByCreator.push({
      creator,
      roadmaps: sharedRoadmaps.filter(
        (roadmap) => roadmap.creator.id === creatorId
      ),
    });
  }

  if (sharedRoadmaps.length === 0) {
    return (
      <div className="flex flex-col items-center p-4 py-20">
        <Map className="mb-4 h-24 w-24 opacity-10" />
        <h3 className="mb-1 text-2xl font-bold text-gray-900">No roadmaps</h3>
        <p className="text-base text-gray-500">
          Roadmaps from your friends will appear here
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className={'text-sm text-gray-400'}>
          {sharedRoadmaps.length} shared roadmap(s)
        </span>
      </div>
      <div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {groupByCreator.map((group) => {
            const creator = group.creator;
            return (
              <li
                key={creator.id}
                className="flex flex-col items-start overflow-hidden rounded-md border border-gray-300"
              >
                <div className="relative flex w-full items-center gap-3 p-3">
                  <img
                    src={
                      creator.avatar
                        ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${
                            creator.avatar
                          }`
                        : '/images/default-avatar.png'
                    }
                    alt={creator.name || ''}
                    className="h-8 w-8 rounded-full"
                  />
                  <div>
                    <h3 className="truncate font-medium">{creator.name}</h3>
                    <p className="truncate text-sm text-gray-500">
                      {group?.roadmaps?.length || 0} shared roadmap(s)
                    </p>
                  </div>
                </div>

                <ul className="w-full">
                  {group?.roadmaps?.map((roadmap) => {
                    return (
                      <li
                        key={roadmap._id}
                        className="relative flex w-full border-t"
                      >
                        <a
                          href={`/r/=${roadmap?.slug}`}
                          className="group inline-grid w-full grid-cols-[auto_16px] items-center justify-between gap-2 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-black"
                          target={'_blank'}
                        >
                          <span className="w-full truncate">
                            {roadmap.title}
                          </span>

                          <ExternalLinkIcon
                            size={16}
                            className="opacity-20 transition-opacity group-hover:opacity-100"
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
