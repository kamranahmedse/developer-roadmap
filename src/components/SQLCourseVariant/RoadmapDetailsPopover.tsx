import { InfoIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';

export function RoadmapDetailsPopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <InfoIcon className="size-4 text-yellow-500/80 hover:text-yellow-500" />
      </PopoverTrigger>
      <PopoverContent
        className="border-zinc-700 bg-zinc-900 px-2.5 text-sm text-zinc-200"
        side="top"
        align="start"
      >
        <a
          href="/"
          className="text-blue-400 underline hover:text-blue-500 focus:text-blue-500"
        >
          roadmap.sh
        </a>{' '}
        provides community-curated roadmaps, study plans, paths, and resources
        for developers and IT professionals. Serving 2M+ registered users, it is
        the 6th most-starred open source project on GitHub
      </PopoverContent>
    </Popover>
  );
}
