import { Award, QuoteIcon, Trophy } from 'lucide-react';

export function AuthorQuoteMessage() {
  return (
    <div className="mx-auto mt-14 max-w-2xl sm:mt-20">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-yellow-500/10 via-yellow-400/5 to-yellow-300/10 p-8 sm:p-12">
        <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2">
          <div className="size-[500px] rounded-full bg-yellow-500/5 blur-3xl" />
        </div>

        <div className="relative flex flex-col items-center text-center">
          <h2 className="mb-4 hidden text-2xl font-semibold text-yellow-500 md:block">
            From your Instructor
          </h2>

          <div className="mt-4 hidden flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-zinc-400 md:flex">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1">
              <Trophy className="size-4 text-yellow-500/80" />
              Multiple GitHub Star Awards
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1">
              <svg className="size-4 fill-yellow-500/80" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.291 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              #2 Most Starred Developer
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1">
              <Award className="size-4 text-yellow-500/80" />
              Founder roadmap.sh
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1">
              <Award className="size-4 text-yellow-500/80" />
              Google Developer Expert
            </span>
          </div>

          <div className="relative mt-0 md:mt-8">
            <p className="text-base leading-relaxed text-zinc-200 sm:text-xl">
              "As someone who has worked extensively with databases throughout
              my career, I know firsthand how crucial SQL skills are. I've
              created this course to share the practical knowledge that has
              helped me build and scale data systems at various companies."
            </p>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <img
              src="https://assets.roadmap.sh/guest/kamran-lqjta.jpeg"
              alt="Kamran Ahmed"
              className="size-14 rounded-full ring-2 ring-yellow-500/20"
            />
            <div className="text-left">
              <h3 className="font-medium text-yellow-500">Kamran Ahmed</h3>
              <p className="text-sm text-zinc-400">
                Founder roadmap.sh{' '}
                <span className="mx-1 hidden sm:inline">·</span>
                <a
                  href="https://twitter.com/kamrify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-0.5 text-yellow-500/80 underline underline-offset-4 hover:text-yellow-500"
                >
                  @kamrify
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
