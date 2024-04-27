import { List } from 'lucide-react';

type TeamActivityItemProps = {
  teamId: string;
};

export function TeamEmptyStream(props: TeamActivityItemProps) {
  const { teamId } = props;

  return (
    <div className="rounded-md">
      <div className="flex flex-col items-center p-7 text-center">
        <List className="mb-2 h-[60px] w-[60px] opacity-10 sm:h-[120px] sm:w-[120px]" />

        <h2 className="text-lg font-bold sm:text-xl">No Activities</h2>
        <p className="my-1 max-w-[400px] text-balance text-sm text-gray-500 sm:my-2 sm:text-base">
          Activities will appear here as you start tracking team&nbsp;
          <a
            href={`/team/roadmaps?t=${teamId}`}
            className="mt-4 text-blue-500 hover:underline"
          >
            Roadmaps
          </a>
          &nbsp;progress.
        </p>
      </div>
    </div>
  );
}
