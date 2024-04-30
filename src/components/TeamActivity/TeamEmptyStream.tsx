import { Activity, List, ListTodo } from 'lucide-react';

type TeamActivityItemProps = {
  teamId: string;
};

export function TeamEmptyStream(props: TeamActivityItemProps) {
  const { teamId } = props;

  return (
    <div className="rounded-md">
      <div className="flex flex-col items-center p-7 text-center sm:p-14">
        <ListTodo className="mb-4 h-[60px] w-[60px] opacity-10 sm:h-[60px] sm:w-[60px]" />

        <h2 className="text-lg font-semibold sm:text-lg">No Activity</h2>
        <p className="my-1 max-w-[400px] text-balance text-sm text-gray-500 sm:my-2 sm:text-base">
          Team activity will appear here once members start tracking their
          progress.
        </p>
      </div>
    </div>
  );
}
