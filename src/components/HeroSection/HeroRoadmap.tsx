import { cn } from '../../lib/classname.ts';
import type { ResourceType } from '../../lib/resource-progress.ts';
import { MarkFavorite } from '../FeaturedItems/MarkFavorite.tsx';

type ProgressRoadmapProps = {
  url: string;
  percentageDone: number;
  allowFavorite?: boolean;

  resourceId: string;
  resourceType: ResourceType;
  resourceTitle: string;
  isFavorite?: boolean;

  isTrackable?: boolean;
  isNew?: boolean;
};

export function HeroRoadmap(props: ProgressRoadmapProps) {
  const {
    url,
    percentageDone,
    resourceType,
    resourceId,
    resourceTitle,
    isFavorite,
    allowFavorite = true,
    isTrackable = true,
    isNew = false,
  } = props;

  return (
    <a
      href={url}
      className={cn(
        'relative flex flex-col overflow-hidden rounded-md border p-3 text-sm text-slate-400 hover:text-slate-300',
        {
          'border-slate-800 bg-slate-900 hover:border-slate-600': isTrackable,
          'border-slate-700/50 bg-slate-800/50 hover:border-slate-600/70':
            !isTrackable,
        },
      )}
    >
      <span title={resourceTitle} className="relative z-20 truncate">
        {resourceTitle}
      </span>

      {isTrackable && (
        <span
          className="absolute bottom-0 left-0 top-0 z-10 bg-[#172a3a]"
          style={{ width: `${percentageDone}%` }}
        ></span>
      )}

      {allowFavorite && (
        <MarkFavorite
          resourceId={resourceId}
          resourceType={resourceType}
          favorite={isFavorite}
        />
      )}

      {isNew && (
        <span className="absolute bottom-1.5 right-2 flex items-center rounded-br rounded-tl text-xs font-medium text-purple-300">
          <span className="mr-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
          </span>
          New
        </span>
      )}
    </a>
  );
} 