import { AwardIcon, InfoIcon } from 'lucide-react';
import { GitHubIcon } from '../ReactIcons/GitHubIcon';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';

export function AuthorCredentials() {
  return (
    <div className="flex items-center gap-4 text-white lg:mt-auto">
      <img
        src="https://assets.roadmap.sh/guest/kamran-course-pf-agibf.jpg"
        className="aspect-[4/5] h-[140px] rounded-2xl object-cover shadow-lg"
        alt="Kamran Ahmed"
      />

      <div className="flex flex-col gap-3">
        <div>
          <a
            href="https://twitter.com/kamrify"
            target="_blank"
            className="text-xl font-semibold transition-colors duration-200 hover:text-blue-400"
          >
            Kamran Ahmed
          </a>
          <p className="mt-1 text-sm text-gray-300">
            Your teacher for this course
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <a
            href="https://github.com/kamranahmedse"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-yellow-500/30 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-3 py-1.5 backdrop-blur-sm transition-all duration-200 hover:border-yellow-400/50 hover:from-yellow-500/30 hover:to-orange-500/30"
          >
            <GitHubIcon className="size-3.5 text-yellow-400" />
            <span className="text-xs font-medium text-yellow-100">
              #2 Most Starred Developer
            </span>
          </a>

          <Popover>
            <PopoverTrigger asChild>
              <div className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1.5 backdrop-blur-sm transition-all duration-200 hover:border-purple-400/50 hover:from-purple-500/30 hover:to-pink-500/30">
                <AwardIcon className="size-3.5 text-purple-400" />
                <span className="text-xs font-medium text-purple-100">
                  Founder roadmap.sh
                </span>
                <InfoIcon className="ml-1 size-3.5 text-purple-400/70 hover:text-purple-300" />
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
