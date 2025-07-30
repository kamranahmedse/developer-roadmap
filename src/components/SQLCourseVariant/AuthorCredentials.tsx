import { AwardIcon, InfoIcon } from 'lucide-react';
import { GitHubIcon } from '../ReactIcons/GitHubIcon';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';

export function AuthorCredentials() {
  return (
    <div className="flex items-center gap-3 text-white lg:mt-auto">
      <img
        src="https://github.com/kamranahmedse.png"
        className="aspect-[4/5] h-[110px] w-[88px] rounded-xl object-cover shadow-md"
        alt="Kamran Ahmed"
      />

      <div className="flex flex-col gap-2">
        <div>
          <p className="text-xl font-medium transition-colors duration-200">
            by Kamran Ahmed
          </p>
          <p className="mt-0.5 text-sm text-gray-400">
            Your teacher for this course
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <a
            href="https://github.com/kamranahmedse"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-gradient-to-r from-yellow-500/15 to-orange-500/15 px-2 py-1.5 backdrop-blur-sm transition-all duration-200 hover:border-yellow-400/40 hover:from-yellow-500/25 hover:to-orange-500/25"
          >
            <GitHubIcon className="size-3 text-yellow-400" />
            <span className="text-xs font-medium text-yellow-200">
              #2 Most Starred Developer
            </span>
          </a>

          <Popover>
            <PopoverTrigger asChild>
              <div className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-gradient-to-r from-yellow-500/15 to-orange-500/15 px-2 py-1.5 backdrop-blur-sm transition-all duration-200 hover:border-yellow-400/40 hover:from-yellow-500/25 hover:to-orange-500/25">
                <AwardIcon className="size-3 text-yellow-400" />
                <span className="text-xs font-medium text-yellow-200">
                  Founder roadmap.sh
                </span>
                <InfoIcon className="ml-auto size-3 text-yellow-400/70 hover:text-yellow-300" />
              </div>
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
              provides community-curated roadmaps, study plans, paths, and
              resources for developers and IT professionals. Serving 2M+
              registered users, it is the 6th most-starred open source project
              on GitHub
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
