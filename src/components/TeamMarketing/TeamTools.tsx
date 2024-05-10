import {AlertTriangle, Barcode, BookOpenIcon, PieChart, Shrub, SquareIcon, UserRoundPlus} from "lucide-react";

const toolsList = [
  {
    icon: Shrub,
    title: 'Growth plans',
    description: 'Prepare shared or individual growth plans for members.',
  },
  {
    icon: Barcode,
    title: 'Progress tracking',
    description: 'Track and compare the progress of team members.',
  },
  {
    icon: UserRoundPlus,
    title: 'Onboarding',
    description: 'Prepare onboarding plans for new team members.',
  },
  {
    icon: PieChart,
    title: 'Team insights',
    description: 'Get insights about your team skills, progress and more.',
  },
  {
    icon: AlertTriangle,
    title: 'Skill gap analysis',
    description: 'Understand the skills of your team and identify gaps.',
  },
  {
    icon: BookOpenIcon,
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
                <div className='mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white'>
                  {tool.icon ? <tool.icon size={23} /> : <SquareIcon size={24} /> }
                </div>
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
