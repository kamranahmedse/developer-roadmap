import type { ProjectPageType } from '../../api/roadmap';
import { ProjectProgress } from '../Activity/ProjectProgress';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions';

type UserPublicProjectsProps = {
  userId: string;
  projects: ProjectStatusDocument[];
  projectDetails: ProjectPageType[];
};

export function UserPublicProjects(props: UserPublicProjectsProps) {
  const { projects, projectDetails } = props;

  const enrichedProjects =
    projects
      .map((project) => {
        const projectDetail = projectDetails.find(
          (projectDetail) => projectDetail.id === project.projectId,
        );

        return {
          ...project,
          title: projectDetail?.title || 'N/A',
        };
      })
      ?.sort((a, b) => {
        const isPendingA = !a.repositoryUrl && !a.submittedAt;
        const isPendingB = !b.repositoryUrl && !b.submittedAt;

        if (isPendingA && !isPendingB) {
          return -1;
        }

        if (!isPendingA && isPendingB) {
          return 1;
        }

        return 0;
      }) || [];

  return (
    <div className="mt-5">
      <h2 className="mb-2 text-xs uppercase tracking-wide text-gray-400">
        Projects I have worked on
      </h2>
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3">
        {enrichedProjects.map((project) => (
          <ProjectProgress
            key={project._id}
            projectStatus={project}
            showActions={false}
          />
        ))}
      </div>
    </div>
  );
}
