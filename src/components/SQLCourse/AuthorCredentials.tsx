import { Award } from 'lucide-react';

export function AuthorCredentials() {
  return (
    <div className="mx-auto mt-8 flex flex-col items-start gap-4 text-sm text-zinc-400 sm:flex-row sm:flex-wrap sm:items-center md:mt-12 md:justify-center md:gap-x-3 md:gap-y-2">
      <div className="flex items-center gap-1">
        <img
          src="https://assets.roadmap.sh/guest/kamran-lqjta.jpeg"
          className="size-8 rounded-full object-cover mr-1.5"
          alt="Kamran Ahmed"
        />
        <span>Course by</span>
        <a
          href="https://twitter.com/kamrify"
          target="_blank"
          className="font-medium text-yellow-500 hover:text-yellow-400"
        >
          Kamran Ahmed
        </a>
      </div>
      <div className="hidden flex-wrap items-center gap-x-3 gap-y-2 sm:flex sm:justify-center">
        <a
          href="https://github.com/kamranahmedse"
          target="_blank"
          className="hidden items-center gap-1 sm:inline-flex text-yellow-500 hover:text-yellow-400"
        >
          <svg className="size-4 fill-zinc-400" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.291 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          #2 most-starred on GitHub
        </a>
        <span className="inline-flex items-center gap-1">
          <svg className="size-3 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          founder roadmap.sh
        </span>
      </div>
    </div>
  );
}
