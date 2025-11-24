import { AwardIcon, TrophyIcon } from 'lucide-react';
import { GitHubIcon } from '../ReactIcons/GitHubIcon';

export function MeetYourInstructor() {
  const features = [
    {
      icon: TrophyIcon,
      text: 'Multiple GitHub Star Awards'
    },
    {
      icon: GitHubIcon,
      text: '#2 Most Starred Developer'
    },
    {
      icon: AwardIcon,
      text: 'Google Developer Expert'
    },
    {
      icon: AwardIcon,
      text: '2M+ roadmap.sh users'
    }
  ];

  return (
    <div className="mx-auto mt-14 max-w-4xl">
      <div className="rounded-3xl bg-gradient-to-br from-yellow-500/20 via-yellow-500/10 to-transparent p-8 md:p-12">
        <h4 className="mb-2 text-center text-xl font-medium text-zinc-200 md:text-2xl">
          Meet your instructor
        </h4>
        <div className="mb-12 text-center text-3xl font-bold text-yellow-400 md:text-4xl">
          Kamran Ahmed
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="flex shrink-0 flex-col items-center">
            <div className="relative">
              <img
                src="https://github.com/kamranahmedse.png"
                alt="Kamran Ahmed"
                className="h-40 w-40 rounded-full object-cover ring-4 ring-yellow-500/40 transition-all duration-300 hover:ring-yellow-500/60"
              />
            </div>
            <h5 className="mt-6 text-xl font-semibold text-zinc-100">
              Kamran Ahmed
            </h5>
            <span className="text-yellow-400">Founder of roadmap.sh</span>
          </div>

          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 p-3"
                    >
                      <IconComponent className="size-4 shrink-0 text-yellow-400" />
                      <span className="text-sm font-medium text-zinc-300">
                        {feature.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="prose prose-zinc max-w-none">
                <p className="m-0 text-xl leading-relaxed text-zinc-300">
                  Kamran is the creator of roadmap.sh (2M+ registered users!)
                  and an engineering leader with over a decade of experience in
                  the tech industry. Throughout his career he's built and scaled
                  software systems, designed complex data systems, and worked
                  with large amounts of data to create efficient solutions.
                </p>

                <p className="m-0 text-xl leading-relaxed text-zinc-300">
                  This hands-on, AI-assisted course is his distilled blueprint
                  on how to master SQL queries, from beginner to advanced.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
