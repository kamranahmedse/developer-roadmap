import { ExternalLink } from 'lucide-react';

type RoadmapMultiCardProps = {
  roadmaps: {
    title: string;
    link: string;
  }[];
  description: string;
  secondaryRoadmaps?: {
    title: string;
    link: string;
  }[];
  secondaryDescription?: string;
};
export function RoadmapMultiCard(props: RoadmapMultiCardProps) {
  const { roadmaps, description, secondaryRoadmaps, secondaryDescription } = props;
  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-xl border border-gray-300 bg-linear-to-br from-gray-100
       to-gray-50 ease-in-out"
    >
      <div className="flex flex-col divide-y">
        {roadmaps.map((roadmap, index) => (
          <a
            target={'_blank'}
            key={index}
            href={roadmap.link}
            className="group text-sm sm:text-base flex w-full items-center justify-between gap-2 bg-linear-to-br from-gray-100 to-gray-50 px-4 sm:px-5 py-2 transition-colors duration-200"
          >
            {roadmap.title}
            <ExternalLink className="lucide lucide-external-link h-4 text-gray-300 transition group-hover:text-gray-700" />
          </a>
        ))}
      </div>

      <p className="grow bg-gray-200/70 p-4 sm:p-5 text-sm text-gray-500">
        {description}
      </p>

      {secondaryRoadmaps && (
        <div className="flex flex-col divide-y">
          {secondaryRoadmaps.map((roadmap, index) => (
            <a
              target={'_blank'}
              key={index}
              href={roadmap.link}
              className="group text-sm sm:text-base flex w-full items-center justify-between gap-2 bg-linear-to-br from-gray-100 to-gray-50 px-5 py-2 transition-colors duration-200"
            >
              {roadmap.title}
              <ExternalLink className="lucide lucide-external-link h-4 text-gray-300 transition group-hover:text-gray-700" />
            </a>
          ))}
        </div>
      )}

      {secondaryDescription && (
        <p className="grow bg-gray-200/70 p-4 sm:p-5 text-sm text-gray-500">
          {secondaryDescription}
        </p>
      )}
    </div>
  );
}
