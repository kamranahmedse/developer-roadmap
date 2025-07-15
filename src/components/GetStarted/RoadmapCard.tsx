import { ExternalLink, Globe2, type LucideIcon } from 'lucide-react';

type RoadmapCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  icon2?: LucideIcon;
  link: string;
  isUpcoming?: boolean;
};
export function RoadmapCard(props: RoadmapCardProps) {
  const {
    isUpcoming,
    link,
    title,
    description,
    icon: Icon,
    icon2: Icon2,
  } = props;

  if (isUpcoming) {
    return (
      <div className="group relative block rounded-xl border border-gray-300 bg-linear-to-br from-gray-100 to-gray-50 p-5 overflow-hidden">
        <div className="mb-2 sm:mb-5 flex flex-row items-center">
          <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gray-900 text-white">
            <Icon className="h-3 sm:h-5" />
          </div>
          {Icon2 && (
              <>
                <span className="mx-2 text-gray-400">+</span>
                <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gray-900 text-white">
                  <Icon2 className="h-3 sm:h-5" />
                </div>
              </>
          )}
        </div>
        <span className="mb-0.5 block text-lg sm:text-xl font-semibold sm:mb-2">
          {title}
        </span>
        <span className="text-sm text-gray-500">{description}</span>

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/70">
          <span className="text-sm bg-black rounded-lg text-white font-semibold py-1 px-2 -rotate-45 transform">
            Coming soon
          </span>
        </div>
      </div>
    );
  }

  return (
    <a
      href={link}
      target={'_blank'}
      className="group relative block rounded-xl border border-gray-300 bg-linear-to-br from-gray-100 to-gray-50
       p-3.5 sm:p-5 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:border-black/30 hover:bg-gray-50/70 hover:shadow-xs"
    >
      <div className="mb-2 sm:mb-5 flex flex-row items-center">
        <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gray-900 text-white">
          <Icon className="h-4 sm:h-5" />
        </div>
        {Icon2 && (
          <>
            <span className="mx-2 text-gray-400">+</span>
            <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gray-900 text-white">
              <Icon2 className="h-4 sm:h-5" />
            </div>
          </>
        )}
      </div>
      <ExternalLink className="lucide lucide-external-link absolute right-2 top-2 h-4 text-gray-300 transition group-hover:text-gray-700" />
      <span className="mb-0 block text-lg sm:text-xl font-semibold sm:mb-2">
        {title}
      </span>
      <span className="text-sm text-gray-500">{description}</span>
    </a>
  );
}
