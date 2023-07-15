import { useEffect, useState } from 'preact/hooks';
import { SearchSelector, OptionType } from '../SearchSelector';
import { httpGet } from '../../lib/http';
import type { PageType } from '../CommandMenu/CommandMenu';
import XIcon from '../../icons/close-dark.svg';
import SearchIcon from '../../icons/search.svg';

type RoadmapSelectorProps = {
  selectedRoadmapIds: string[];
  setSelectedRoadmapIds: (resourcesIds: string[]) => void;
};

export function RoadmapSelector(props: RoadmapSelectorProps) {
  const { selectedRoadmapIds, setSelectedRoadmapIds } = props;
  const [allRoadmaps, setAllRoadmaps] = useState<PageType[]>([]);

  async function getData() {
    const { error, response } = await httpGet<PageType[]>(`/pages.json`);

    if (error) {
      alert(error.message);
      return;
    }

    if (!response) {
      return [];
    }

    const allRoadmaps = response
      .filter((page) => page.group === 'Roadmaps')
      .sort((a, b) => {
        if (a.title === 'Android') return 1;
        return a.title.localeCompare(b.title);
      });

    setAllRoadmaps(allRoadmaps);
    return response;
  }

  const onSelect = (value: OptionType) => {
    if (selectedRoadmapIds.includes(value.value)) {
      return;
    }

    setSelectedRoadmapIds([...selectedRoadmapIds, value.value]);
  };

  useEffect(() => {
    getData().finally();
  }, []);

  return (
    <div>
      <div className="mt-4 flex w-full flex-col">
        <div className="mb-1 mt-2">
          <h2 className="mb-2 text-2xl font-bold">Select Roadmaps</h2>
          <p className="text-sm text-gray-700">
            Picks the roadmaps to be made available to your team for tracking.
            You can always add more later.
          </p>
        </div>

        <SearchSelector
          placeholder={`Search Roadmaps`}
          onSelect={onSelect}
          options={allRoadmaps.map((roadmap) => ({
            value: roadmap.id,
            label: roadmap.title,
          }))}
          searchInputId={'roadmap-input'}
          inputClassName="mt-2 block w-full rounded-md border px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        />

        {!selectedRoadmapIds.length && (
          <div className="mt-4 rounded-md border px-4 py-12 text-center text-sm text-gray-700">
            <img
              alt={'search'}
              src={SearchIcon}
              className={'mx-auto mb-5 h-[42px] w-[42px] opacity-10'}
            />
            <span className="block text-lg font-semibold text-black">
              No roadmaps selected.
            </span>
            <p className={'text-sm text-gray-400'}>
              Please search and add roadmaps from above
            </p>
          </div>
        )}

        {selectedRoadmapIds.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedRoadmapIds.map((resourceId) => (
              <div className="flex min-h-[32px] items-center rounded-md border p-2">
                <div className="text-sm leading-none text-slate-500">
                  {
                    allRoadmaps.find((roadmap) => roadmap.id === resourceId)
                      ?.title
                  }
                </div>
                <button
                  type="button"
                  className="ml-2"
                  onClick={() => {
                    const filteredResources = selectedRoadmapIds.filter(
                      (r) => r !== resourceId
                    );

                    setSelectedRoadmapIds(filteredResources);
                  }}
                >
                  <img src={XIcon} alt="Remove" className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
