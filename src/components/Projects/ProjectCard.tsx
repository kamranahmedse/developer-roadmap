import { Badge } from '../Badge.tsx';
import type {
  ProjectDifficultyType,
  ProjectFileType,
} from '../../lib/project.ts';
import { Users } from 'lucide-react';

type ProjectCardProps = {
  project: ProjectFileType;
  userCount?: number;
};

const badgeVariants: Record<ProjectDifficultyType, string> = {
  beginner: 'yellow',
  intermediate: 'green',
  advanced: 'blue',
};

export function ProjectCard(props: ProjectCardProps) {
  const { project, userCount = 0 } = props;

  const { frontmatter, id } = project;

  return (
    <a
      href={`/projects/${id}`}
      className="flex flex-col rounded-md border bg-white p-3 transition-colors hover:border-gray-300 hover:bg-gray-50"
    >
      <span className="flex justify-between gap-1.5">
        <Badge
          variant={badgeVariants[frontmatter.difficulty] as any}
          text={frontmatter.difficulty}
        />
        <Badge variant={'grey'} text={frontmatter.nature} />
      </span>
      <span className="my-3 flex flex-col">
        <span className="mb-1 font-medium">{frontmatter.title}</span>
        <span className="text-sm text-gray-500">{frontmatter.description}</span>
      </span>
      <span className="flex items-center gap-2 text-xs text-gray-400">
        <Users className="inline-block size-3.5" />
        {userCount > 0 ? <>{userCount} Started</> : <>Be the first to solve!</>}
      </span>
    </a>
  );
}
