import { AwardIcon } from 'lucide-react';

export function AuthorCredentials() {
  return (
    <div className="flex gap-4 text-sm text-white lg:mt-auto">
      <div className="flex items-center gap-4">
        <img
          src="https://assets.roadmap.sh/guest/kamran-lqjta.jpeg"
          className="size-24 rounded-full object-cover"
          alt="Kamran Ahmed"
        />

        <div className="flex flex-col gap-2">
          <a
            href="https://twitter.com/kamrify"
            target="_blank"
            className="text-lg font-medium"
          >
            Kamran Ahmed
          </a>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1">
            <svg className="size-4 fill-yellow-500/80" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.291 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            #2 Most Starred Developer
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1">
            <AwardIcon className="size-4 text-yellow-500/80" />
            Founder roadmap.sh
          </span>
        </div>
      </div>
    </div>
  );
}
