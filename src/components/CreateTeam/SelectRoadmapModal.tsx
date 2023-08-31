import { useEffect, useRef, useState } from 'react';
import { useKeydown } from '../../hooks/use-keydown';
import { useOutsideClick } from '../../hooks/use-outside-click';
import type { PageType } from '../CommandMenu/CommandMenu';
import type { TeamResourceConfig } from './RoadmapSelector';
import CloseIcon from '../../icons/close.svg';
import { SelectRoadmapModalItem } from './SelectRoadmapModalItem';

export type SelectRoadmapModalProps = {
  teamId: string;
  allRoadmaps: PageType[];
  onClose: () => void;
  teamResourceConfig: TeamResourceConfig;
  onRoadmapAdd: (roadmapId: string) => void;
  onRoadmapRemove: (roadmapId: string) => void;
};

export function SelectRoadmapModal(props: SelectRoadmapModalProps) {
  const {
    onClose,
    allRoadmaps,
    onRoadmapAdd,
    onRoadmapRemove,
    teamResourceConfig,
  } = props;
  const popupBodyEl = useRef<HTMLDivElement>(null);
  const searchInputEl = useRef<HTMLInputElement>(null);

  const [searchResults, setSearchResults] = useState<PageType[]>(allRoadmaps);
  const [searchText, setSearchText] = useState('');

  useKeydown('Escape', () => {
    onClose();
  });

  useOutsideClick(popupBodyEl, () => {
    onClose();
  });

  useEffect(() => {
    if (!searchInputEl.current) {
      return;
    }

    searchInputEl.current.focus();
  }, [searchInputEl]);

  useEffect(() => {
    if (searchText.length === 0) {
      setSearchResults(allRoadmaps);
      return;
    }

    const searchResults = allRoadmaps.filter((roadmap) => {
      return (
        roadmap.title.toLowerCase().includes(searchText.toLowerCase()) ||
        roadmap.id.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setSearchResults(searchResults);
  }, [searchText, allRoadmaps]);

  const roleBasedRoadmaps = searchResults.filter((roadmap) =>
    roadmap?.metadata?.tags?.includes('role-roadmap')
  );
  const skillBasedRoadmaps = searchResults.filter((roadmap) =>
    roadmap?.metadata?.tags?.includes('skill-roadmap')
  );

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-black/50">
      <div className="relative mx-auto h-full w-full max-w-2xl p-4 md:h-auto">
        <div
          ref={popupBodyEl}
          className="popup-body relative mt-4 overflow-hidden rounded-lg bg-white shadow"
        >
          <button
            type="button"
            className="popup-close absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-900"
            onClick={onClose}
          >
            <img alt={'close'} src={CloseIcon} className="h-4 w-4" />
            <span className="sr-only">Close modal</span>
          </button>
          <input
            ref={searchInputEl}
            type="text"
            placeholder="Search roadmaps"
            className="block w-full border-b px-5 pb-3.5 pt-4 outline-none placeholder:text-gray-400"
            value={searchText}
            onInput={(e) => setSearchText((e.target as HTMLInputElement).value)}
          />
          <div className="min-h-[200px] p-4">
            <span className="block pb-3 text-xs uppercase text-gray-400">
              Role Based Roadmaps
            </span>
            {roleBasedRoadmaps.length === 0 && (
              <p className="mb-1 flex h-full items-start text-sm italic text-gray-400"></p>
            )}
            {roleBasedRoadmaps.length > 0 && (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {roleBasedRoadmaps.map((roadmap) => {
                  const isSelected = !!teamResourceConfig.find(
                    (r) => r.resourceId === roadmap.id
                  );

                  return (
                    <SelectRoadmapModalItem
                      title={roadmap.title}
                      isSelected={isSelected}
                      onClick={() => {
                        if (isSelected) {
                          onRoadmapRemove(roadmap.id);
                        } else {
                          onRoadmapAdd(roadmap.id);
                        }
                      }}
                    />
                  );
                })}
              </div>
            )}
            <span className="block pb-3 text-xs uppercase text-gray-400">
              Skill Based Roadmaps
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {skillBasedRoadmaps.map((roadmap) => {
                const isSelected = !!teamResourceConfig.find(
                  (r) => r.resourceId === roadmap.id
                );

                return (
                  <SelectRoadmapModalItem
                    title={roadmap.title}
                    isSelected={isSelected}
                    onClick={() => {
                      if (isSelected) {
                        onRoadmapRemove(roadmap.id);
                      } else {
                        onRoadmapAdd(roadmap.id);
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
