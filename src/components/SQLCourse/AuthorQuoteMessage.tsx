import { QuoteIcon } from 'lucide-react';

export function AuthorQuoteMessage() {
  return (
    <div className="mx-auto mt-14 max-w-2xl sm:mt-20">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 via-yellow-400/5 to-yellow-300/10 p-6 sm:p-10">
        {/* Decorative quote mark */}
        <div className="absolute left-4 top-4 font-serif text-8xl text-yellow-500/10 sm:block hidden">
          <QuoteIcon className="scale-x-[-1] fill-current" />
        </div>

        <div className="relative">
          <p className="mb-6 text-base sm:text-xl leading-relaxed text-zinc-200">
            As someone who has worked extensively with databases throughout my
            career, I know firsthand how crucial SQL skills are. I've created
            this course to share the practical knowledge that has helped me
            build and scale data systems at various companies.
          </p>

          <div className="flex items-center gap-4 border-t border-yellow-500/20 pt-6">
            <img
              src="https://assets.roadmap.sh/guest/kamran-lqjta.jpeg"
              alt="Kamran Ahmed"
              className="size-14 rounded-full ring-2 ring-yellow-500/20"
            />
            <div>
              <h3 className="font-medium text-yellow-500">Kamran Ahmed</h3>
              <p className="text-sm text-zinc-400">
                Founder roadmap.sh <span className="mx-1 sm:inline hidden">·</span>
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
