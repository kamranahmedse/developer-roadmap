import { RoadmapIcon } from '../ReactIcons/RoadmapIcon';

type TeamMemberEmptyPageProps = {
  teamId: string;
};

export function TeamMemberEmptyPage(props: TeamMemberEmptyPageProps) {
  const { teamId } = props;

  return (
    <div className="rounded-md">
      <div className="flex flex-col items-center p-7 text-center">
        <RoadmapIcon className="mb-2 h-14 w-14 opacity-10" />

        <h2 className="text-lg font-bold sm:text-xl">No Progress</h2>
        <p className="my-1 max-w-[400px] text-balance text-sm text-gray-500 sm:my-2 sm:text-base">
          Progress will appear here as they start tracking their roadmaps.
        </p>
      </div>
    </div>
  );
}
