import type { UserProgressResponse } from './FavoriteRoadmaps';
import { CheckIcon } from '../ReactIcons/CheckIcon';
import { MarkFavorite } from '../FeaturedItems/MarkFavorite';
import { Spinner } from '../ReactIcons/Spinner';
import type { ResourceType } from '../../lib/resource-progress';
import { MapIcon } from 'lucide-react';

type ProgressRoadmapProps = {
  url: string;
  percentageDone: number;
  allowFavorite?: boolean;

  resourceId: string;
  resourceType: ResourceType;
  resourceTitle: string;
  isFavorite?: boolean;
};
function HeroRoadmap(props: ProgressRoadmapProps) {
  const {
    url,
    percentageDone,
    resourceType,
    resourceId,
    resourceTitle,
    isFavorite,
    allowFavorite = true,
  } = props;

  return (
    <a
      href={url}
      className="relative flex flex-col overflow-hidden rounded-md border border-slate-800 bg-slate-900 p-3 text-sm text-slate-400 hover:border-slate-600 hover:text-slate-300"
    >
      <span className="relative z-20">{resourceTitle}</span>

      <span
        className="absolute bottom-0 left-0 top-0 z-10 bg-[#172a3a]"
        style={{ width: `${percentageDone}%` }}
      ></span>

      {allowFavorite && (
        <MarkFavorite
          resourceId={resourceId}
          resourceType={resourceType}
          favorite={isFavorite}
        />
      )}
    </a>
  );
}

type ProgressTitleProps = {
  icon: any;
  isLoading?: boolean;
  title: string;
};

export function HeroTitle(props: ProgressTitleProps) {
  const { isLoading = false, title, icon } = props;

  return (
    <p className="mb-4 flex items-center text-sm text-gray-400">
      {!isLoading && icon}
      {isLoading && (
        <span className="mr-1.5">
          <Spinner />
        </span>
      )}
      {title}
    </p>
  );
}

type ProgressListProps = {
  progress: UserProgressResponse;
  showCustomRoadmaps?: boolean;
  customRoadmaps: any[]; // @fixme implement this
  isLoading?: boolean;
};

export function HeroRoadmaps(props: ProgressListProps) {
  const {
    progress,
    isLoading = false,
    customRoadmaps = [{} /* @fixme implement this */],
    showCustomRoadmaps = false,
  } = props;

  return (
    <div className="relative pb-12 pt-4 sm:pt-7">
      {
        <HeroTitle
          icon={
            (<CheckIcon additionalClasses="mr-1.5 h-[14px] w-[14px]" />) as any
          }
          isLoading={isLoading}
          title="Your progress and favorite roadmaps."
        />
      }

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {progress.map((resource) => (
          <HeroRoadmap
            key={resource.resourceId}
            resourceId={resource.resourceId}
            resourceType={resource.resourceType}
            resourceTitle={resource.resourceTitle}
            isFavorite={resource.isFavorite}
            percentageDone={
              ((resource.skipped + resource.done) / resource.total) * 100
            }
            url={
              resource.resourceType === 'roadmap'
                ? `/${resource.resourceId}`
                : `/best-practices/${resource.resourceId}`
            }
          />
        ))}
      </div>

      {showCustomRoadmaps && (
        <div className="mt-5">
          {
            <HeroTitle
              icon={<MapIcon className="mr-1.5 h-[14px] w-[14px]" />}
              title="Your custom roadmaps"
            />
          }

          {customRoadmaps.length === 0 && (
            <p className="rounded-md border border-dashed border-gray-800 p-2 text-sm text-gray-600">
              You haven't created any custom roadmaps yet.{' '}
              <button className="text-gray-500 underline underline-offset-2 hover:text-gray-400">
                Create one!
              </button>
            </p>
          )}

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {customRoadmaps.map((customRoadmap) => (
              <HeroRoadmap
                resourceId={'343434'}
                resourceType={'roadmap'}
                resourceTitle={'Frontend Roadmap Revised'}
                percentageDone={50}
                url={`/r?${'34343434'}`}
                allowFavorite={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
