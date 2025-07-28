import { useState, useMemo, useEffect, useRef } from 'react';
import { cn } from '../../lib/classname';

export type RoadmapChatListingItem = {
  id: string;
  title: string;
  description?: string;
  category?: 'role' | 'skill' | string; // default to string for flexibility
};

type RoadmapChatListingProps = {
  roadmaps: RoadmapChatListingItem[];
  className?: string;
};

export default function RoadmapChatListing(props: RoadmapChatListingProps) {
  const { roadmaps, className } = props;

  const [search, setSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the search input
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const filteredRoadmaps = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      return roadmaps;
    }

    return roadmaps.filter((roadmap) => {
      return (
        roadmap.title.toLowerCase().includes(term) ||
        roadmap.id.toLowerCase().includes(term)
      );
    });
  }, [search, roadmaps]);

  // Separate into role-based and skill-based
  const roleRoadmaps = filteredRoadmaps.filter((rm) => rm.category === 'role');
  const skillRoadmaps = filteredRoadmaps.filter(
    (rm) => rm.category === 'skill',
  );

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search roadmaps..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm placeholder-gray-400 focus:border-gray-300 focus:outline-none"
        data-clarity-unmask="true"
      />

      <div className="flex flex-col gap-8">
        {/* Role-based roadmaps */}
        {roleRoadmaps.length > 0 && (
          <div>
            <h2 className="mb-4 text-xs tracking-wide text-gray-400 uppercase">
              Role-based Roadmaps
            </h2>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3">
              {roleRoadmaps.map((roadmap) => (
                <a
                  key={roadmap.id}
                  href={`/${roadmap.id}/ai`}
                  className="relative truncate rounded-md border bg-white p-2.5 text-left text-sm shadow-xs hover:border-gray-400 hover:bg-gray-50"
                >
                  {roadmap.title}
                </a>
              ))}
              {roleRoadmaps.length === 0 && (
                <div className="col-span-full py-4 text-center">
                  <p className="text-sm text-gray-400">
                    No role-based roadmaps found.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Skill-based roadmaps */}
        {skillRoadmaps.length > 0 && (
          <div>
            <h2 className="mb-4 text-xs tracking-wide text-gray-400 uppercase">
              Skill-based Roadmaps
            </h2>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3">
              {skillRoadmaps.map((roadmap) => (
                <a
                  key={roadmap.id}
                  href={`/${roadmap.id}/ai`}
                  className="relative truncate rounded-md border bg-white p-2.5 text-left text-sm shadow-xs hover:border-gray-400 hover:bg-gray-50"
                >
                  {roadmap.title}
                </a>
              ))}
              {skillRoadmaps.length === 0 && (
                <div className="col-span-full py-4 text-center">
                  <p className="text-sm text-gray-400">
                    No skill-based roadmaps found.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
