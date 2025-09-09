import { guideRenderer } from '../../lib/guide-renderer';
import type { OfficialProjectDocument } from '../../queries/official-project';

type ProjectContentProps = {
  project: OfficialProjectDocument;
};

export function ProjectContent(props: ProjectContentProps) {
  const { project } = props;

  const isContentString = typeof project?.content === 'string';

  return (
    <div
      className="prose prose-h2:mb-3 prose-h2:mt-5 prose-h3:mb-1 prose-h3:mt-5 prose-p:mb-2 prose-blockquote:font-normal prose-blockquote:text-gray-500 prose-pre:my-3 prose-ul:my-3.5 prose-hr:my-5 prose-li:[&>p]:m-0 max-w-full [&>ul>li]:my-1"
      {...(isContentString
        ? {
            dangerouslySetInnerHTML: { __html: project?.content },
          }
        : {
            children: guideRenderer.render(project?.content),
          })}
    />
  );
}
