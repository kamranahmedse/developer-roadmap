import {
  BadgeCheck,
  HeartHandshake,
  Telescope,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../lib/classname';

type RoadmapAlertProps = {
  title: string;
  badgeText?: string;
  description: string | ReactNode;
  floatingIcon: LucideIcon;
  className?: string;
};

export function RoadmapAlert(props: RoadmapAlertProps) {
  const {
    title,
    badgeText,
    description,
    floatingIcon: FloatingIcon,
    className,
  } = props;

  return (
    <div
      className={cn(
        'relative mb-3 w-full rounded-xl bg-yellow-100 px-4 py-3 text-yellow-800',
        className,
      )}
    >
      <h2 className="flex items-center text-base font-semibold text-yellow-800 sm:text-lg">
        {title}{' '}
        {badgeText && (
          <span className="ml-1.5 rounded-md border border-yellow-500 bg-yellow-200 px-1.5 text-xs uppercase tracking-wide text-yellow-800">
            {badgeText}
          </span>
        )}
      </h2>
      <p className="mb-2 mt-1 text-balance">{description}</p>
      <p className="mb-1.5 mt-2 flex flex-col gap-2 text-sm md:flex-row">
        <a
          href="/roadmaps"
          className="flex items-center gap-1.5 rounded-md border border-yellow-600 bg-yellow-200 px-2 py-1 text-yellow-800 transition-colors hover:bg-yellow-300"
        >
          <BadgeCheck size={15} />
          Visit Official Roadmaps
        </a>
        <a
          href="/community"
          className="flex items-center gap-1.5 rounded-md border border-yellow-600 px-2 py-1 text-yellow-700 transition-colors hover:bg-yellow-300 hover:text-yellow-800"
        >
          <HeartHandshake size={15} />
          Explore Community Roadmaps
        </a>
        <a
          href="/ai/explore"
          className="flex items-center gap-1.5 rounded-md border border-yellow-600 px-2 py-1 text-yellow-700 transition-colors hover:bg-yellow-300 hover:text-yellow-800"
        >
          <Telescope size={15} />
          Explore other AI Roadmaps
        </a>
      </p>

      <FloatingIcon className="absolute bottom-2 right-2 hidden h-12 w-12 text-yellow-500 opacity-50 sm:block" />
    </div>
  );
}
