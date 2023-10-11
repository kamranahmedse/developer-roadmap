const toolsList = [
  {
    imageUrl: '/images/team-promo/growth-plans.png',
    title: 'Growth plans',
    description: 'Prepare shared or individual growth plans for members.',
  },
  {
    imageUrl: '/images/team-promo/progress-tracking.png',
    title: 'Progress tracking',
    description: 'Track and compare the progress of team members.',
  },
  {
    imageUrl: '/images/team-promo/onboarding.png',
    title: 'Onboarding',
    description: 'Prepare onboarding plans for new team members.',
  },
  {
    imageUrl: '/images/team-promo/team-insights.png',
    title: 'Team insights',
    description: 'Get insights about your team skills, progress and more.',
  },
  {
    imageUrl: '/images/team-promo/skill-gap.png',
    title: 'Skill gap analysis',
    description: 'Understand the skills of your team and identify gaps.',
  },
  {
    imageUrl: '/images/team-promo/documentation.png',
    title: 'Documentation',
    description: 'Create and share visual team documentation.',
  },
];

export function TeamTools() {
  return (
    <div className="py-4 sm:py-8 md:py-12 border-t">
      <div className="container">
        <h2 className="mb-1 sm:mb-1.5 md:mb-2 text-xl sm:text-2xl md:text-3xl font-bold">Track and guide your team’s knowledge</h2>
        <p className='text-sm md:text-base'>
          Individual and team level growth plans, progress tracking, skill gap analysis, team insights and more.
        </p>

        <div className="mt-3 sm:mt-5 md:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
          {toolsList.map((tool) => {
            return (
              <div className="rounded-md sm:rounded-xl border p-2 sm:p-5 text-left sm:text-center md:text-left">
                <img
                  alt={tool.title}
                  src={tool.imageUrl}
                  className="mb-5 h-48 hidden sm:block mx-auto md:mx-0"
                />
                <h3 className="mb-0.5 sm:mb-2 text-lg sm:text-2xl font-bold">{tool.title}</h3>
                <p className='text-sm sm:text-base'>{tool.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
