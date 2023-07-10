import { useEffect, useState } from 'preact/hooks';
import { SearchSelector, SelectorDataType } from '../SearchSelector';
import { httpGet } from '../../lib/http';
import type { PageType } from '../CommandMenu/CommandMenu';
import XIcon from '../../icons/close-dark.svg';

interface DataType extends PageType {
  id: string;
}

export function ResourceSelector({
  type,
  resourcesIds,
  setResourcesIds,
}: {
  type: 'Roadmaps' | 'Best Practices';
  resourcesIds: string[];
  setResourcesIds: (resourcesIds: string[]) => void;
}) {
  const [defaultData, setDefaultData] = useState<SelectorDataType[]>([]);

  async function getData() {
    const { error, response } = await httpGet<DataType[]>(`/pages.json`);

    if (error) {
      alert(error.message);
      return;
    }

    if (!response) {
      return [];
    }

    const enrichedData = response
      .filter((page) => page.group === type)
      .map((page) => ({
        id: page.id,
        title: page.title,
      }));
    setDefaultData(enrichedData);
    return response;
  }

  const onSelect = (value: SelectorDataType) => {
    if (resourcesIds.includes(value.id)) {
      return;
    }

    setResourcesIds([...resourcesIds, value.id]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="mt-4 flex w-full flex-col">
        <label
          for={type.replaceAll(' ', '-').toLowerCase()}
          className="text-sm leading-none text-slate-500"
        >
          {type}
        </label>
        <SearchSelector
          placeholder={`Search ${type}`}
          onSelect={onSelect}
          defaultData={defaultData}
          searchInputId={type.replaceAll(' ', '-').toLowerCase()}
          inputClassName="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        />

        {!resourcesIds.length && (
          <div className="mt-4 text-sm leading-none text-slate-500 h-8 flex items-center">
            No {type} selected
          </div>
        )}
        {
          resourcesIds.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {resourcesIds.map((resource) => (
                <div className="flex items-center rounded-md border p-2 min-h-[32px]">
                  <div className="text-sm leading-none text-slate-500">
                    {defaultData.find((d) => d.id === resource)?.title}
                  </div>
                  <button
                    type="button"
                    className="ml-2"
                    onClick={() => {
                      const filteredResources = resourcesIds.filter(
                        (r) => r !== resource
                      );

                      setResourcesIds(filteredResources);
                    }}
                  >
                    <img src={XIcon} alt="Remove" className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </div>
  );
}
