import { CircleDashed } from 'lucide-react';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions';
import { CheckIcon } from '../ReactIcons/CheckIcon';

type ProjectStatusType = {
  projectStatus: ProjectStatusDocument & {
    title: string;
  };
};

export function ProjectStatus(props: ProjectStatusType) {
  const { projectStatus } = props;

  const { submittedAt, repositoryUrl } = projectStatus;
  const status = submittedAt && repositoryUrl ? 'submitted' : 'started';

  if (status === 'submitted') {
    return <CheckIcon additionalClasses="size-3 text-gray-500 shrink-0" />;
  }

  return (
    <CircleDashed className="size-3 shrink-0 stroke-[2.5px] text-gray-400" />
  );
}
