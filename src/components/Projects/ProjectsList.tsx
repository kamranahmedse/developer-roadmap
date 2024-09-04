import { ProjectCard } from './ProjectCard.tsx';
import { HeartHandshake, Trash2 } from 'lucide-react';
import { cn } from '../../lib/classname.ts';
import { useMemo, useState } from 'react';
import {
  projectDifficulties,
  type ProjectDifficultyType,
  type ProjectFileType,
} from '../../lib/project.ts';
import {
  deleteUrlParam,
  getUrlParams,
  setUrlParams,
} from '../../lib/browser.ts';

type DifficultyButtonProps = {
  difficulty: ProjectDifficultyType;
  isActive?: boolean;
  onClick?: () => void;
};

function DifficultyButton(props: DifficultyButtonProps) {
  const { difficulty, onClick, isActive } = props;

  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-md border bg-white px-3 py-1 text-sm capitalize transition-colors hover:border-gray-300 hover:bg-gray-100',
        {
          'border-black bg-gray-100 hover:border-black hover:bg-gray-100 hover:text-black':
            isActive,
        },
      )}
    >
      {difficulty}
    </button>
  );
}

type ProjectsListProps = {
  projects: ProjectFileType[];
  userCounts: Record<string, number>;
};

export function ProjectsList(props: ProjectsListProps) {
  const { projects, userCounts } = props;

  const { difficulty: urlDifficulty } = getUrlParams();
  const [difficulty, setDifficulty] = useState<
    ProjectDifficultyType | undefined
  >(urlDifficulty);

  const projectsByDifficulty: Map<ProjectDifficultyType, ProjectFileType[]> =
    useMemo(() => {
      const result = new Map<ProjectDifficultyType, ProjectFileType[]>();

      for (const project of projects) {
        const difficulty = project.frontmatter.difficulty;

        if (!result.has(difficulty)) {
          result.set(difficulty, []);
        }

        result.get(difficulty)?.push(project);
      }

      return result;
    }, [projects]);

  const matchingProjects = difficulty
    ? projectsByDifficulty.get(difficulty) || []
    : projects;

  return (
    <div className="flex flex-col">
      <div className="my-2.5 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {projectDifficulties.map((projectDifficulty) => (
            <DifficultyButton
              onClick={() => {
                setDifficulty(projectDifficulty);
                setUrlParams({ difficulty: projectDifficulty });
              }}
              difficulty={projectDifficulty}
              isActive={projectDifficulty === difficulty}
            />
          ))}
          {difficulty && (
            <button
              onClick={() => {
                setDifficulty(undefined);
                deleteUrlParam('difficulty');
              }}
              className="flex items-center gap-1.5 rounded-md border border-red-500 bg-transparent px-2 py-0.5 text-sm text-red-500 transition-colors hover:bg-red-500 hover:text-white"
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={2.25} />
              Clear
            </button>
          )}
        </div>
        <a
          href={
            'https://github.com/kamranahmedse/developer-roadmap/issues/new?assignees=&labels=project+contribution&projects=&template=05-project-contribution.yml'
          }
          target={'_blank'}
          className="hidden items-center gap-2 rounded-md border border-transparent px-2 py-0.5 text-sm underline underline-offset-2 hover:bg-black hover:text-white hover:no-underline sm:flex"
        >
          <HeartHandshake className="h-4 w-4" />
          Submit a Project Idea
        </a>
      </div>
      <div className="mb-24 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
        {matchingProjects.length === 0 && (
          <div className="col-span-3 rounded-md border bg-white p-4 text-left text-sm text-gray-500">
            <p>No matching projects found.</p>
          </div>
        )}

        {matchingProjects
          .sort((project) => {
            return project.frontmatter.difficulty === 'beginner'
              ? -1
              : project.frontmatter.difficulty === 'intermediate'
                ? 0
                : 1;
          })
          .sort((a, b) => {
            return a.frontmatter.sort - b.frontmatter.sort;
          })
          .map((matchingProject) => {
            const count = userCounts[matchingProject?.id] || 0;
            return <ProjectCard project={matchingProject} userCount={count} />;
          })}
      </div>
    </div>
  );
}
