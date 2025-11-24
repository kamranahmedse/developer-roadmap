import { ProjectCard } from './ProjectCard.tsx';
import { Trash2 } from 'lucide-react';
import { cn } from '../../lib/classname.ts';
import { useEffect, useMemo, useState } from 'react';

import {
  deleteUrlParam,
  getUrlParams,
  setUrlParams,
} from '../../lib/browser.ts';
import { httpPost } from '../../lib/http.ts';
import { isLoggedIn } from '../../lib/jwt.ts';
import {
  allowedOfficialProjectDifficulty,
  type AllowedOfficialProjectDifficulty,
  type OfficialProjectDocument,
} from '../../queries/official-project.ts';

type DifficultyButtonProps = {
  difficulty: AllowedOfficialProjectDifficulty;
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

export type ListProjectStatusesResponse = Record<
  string,
  'completed' | 'started'
>;

type ProjectsListProps = {
  projects: OfficialProjectDocument[];
  userCounts: Record<string, number>;
};

export function ProjectsList(props: ProjectsListProps) {
  const { projects, userCounts } = props;

  const { difficulty: urlDifficulty } = getUrlParams();
  const [difficulty, setDifficulty] = useState<
    AllowedOfficialProjectDifficulty | undefined
  >(urlDifficulty);
  const [projectStatuses, setProjectStatuses] =
    useState<ListProjectStatusesResponse>();

  const loadProjectStatuses = async () => {
    if (!isLoggedIn()) {
      setProjectStatuses({});
      return;
    }

    const projectIds = projects.map((project) => project.slug);
    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-list-project-statuses`,
      {
        projectIds,
      },
    );

    if (error || !response) {
      console.error(error);
      return;
    }

    setProjectStatuses(response);
  };

  const projectsByDifficulty: Map<
    AllowedOfficialProjectDifficulty,
    OfficialProjectDocument[]
  > = useMemo(() => {
    const result = new Map<
      AllowedOfficialProjectDifficulty,
      OfficialProjectDocument[]
    >();

    for (const project of projects) {
      const difficulty = project.difficulty;

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

  useEffect(() => {
    loadProjectStatuses().finally();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="my-2.5 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {allowedOfficialProjectDifficulty.map((projectDifficulty) => (
            <DifficultyButton
              key={projectDifficulty}
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
      </div>
      <div className="mb-24 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
        {matchingProjects.length === 0 && (
          <div className="col-span-3 rounded-md border bg-white p-4 text-left text-sm text-gray-500">
            <p>No matching projects found.</p>
          </div>
        )}

        {matchingProjects
          .sort((project) => {
            return project.difficulty === 'beginner'
              ? -1
              : project.difficulty === 'intermediate'
                ? 0
                : 1;
          })
          .sort((a, b) => {
            return a.order - b.order;
          })
          .map((matchingProject) => {
            const count = userCounts[matchingProject?.slug] || 0;
            return (
              <ProjectCard
                key={matchingProject.slug}
                project={matchingProject}
                userCount={count}
                status={
                  projectStatuses
                    ? projectStatuses?.[matchingProject.slug] || 'none'
                    : undefined
                }
              />
            );
          })}
      </div>
    </div>
  );
}
