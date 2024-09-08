import { CircleCheck, CircleDashed } from 'lucide-react';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions';

type DashboardProjectCardProps = {
  project: ProjectStatusDocument & {
    title: string;
  };
};

export function DashboardProjectCard(props: DashboardProjectCardProps) {
  const { project } = props;

  const { title, projectId, submittedAt, repositoryUrl } = project;

  const url = `/projects/${projectId}`;
  const status = submittedAt && repositoryUrl ? 'submitted' : 'started';

  return (
    <a
      href={url}
      key={projectId}
      className="group relative flex w-full items-center gap-2 text-left text-sm"
    >
      {status === 'submitted' ? (
        <CircleCheck className="size-4" />
      ) : (
        <CircleDashed className="size-4" />
      )}
      <h4 className="truncate font-medium text-gray-900 group-hover:text-gray-600">
        {title}
      </h4>
    </a>
  );
}
