import { Blocks, CodeXml } from 'lucide-react';

type EmptySolutionsProps = {
  projectId: string;
};

export function EmptySolutions(props: EmptySolutionsProps) {
  const { projectId } = props;

  return (
    <div className="flex min-h-[250px] flex-col items-center justify-center rounded-xl px-5 py-3 sm:px-0 sm:py-20">
      <Blocks className="mb-4 opacity-10 h-14 w-14" />
      <h2 className="mb-1 text-lg font-semibold sm:text-xl">
        No solutions submitted yet
      </h2>
      <p className="mb-3 text-balance text-center text-xs text-gray-400 sm:text-sm">
        Be the first to submit a solution for this project
      </p>
      <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-1.5">
        <a
          href={`/projects/${projectId}`}
          className="flex w-full items-center gap-1.5 rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white sm:w-auto sm:text-sm"
        >
          View Project Details
        </a>
      </div>
    </div>
  );
}
