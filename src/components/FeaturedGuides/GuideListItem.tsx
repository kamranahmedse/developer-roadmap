import type { GuideFileType, GuideFrontmatter } from '../../lib/guide';
import { type QuestionGroupType } from '../../lib/question-group';

export interface GuideListItemProps {
  guide: GuideFileType | QuestionGroupType;
}

function isQuestionGroupType(
  guide: GuideFileType | QuestionGroupType,
): guide is QuestionGroupType {
  return (guide as QuestionGroupType).questions !== undefined;
}

export function GuideListItem(props: GuideListItemProps) {
  const { guide } = props;
  const { frontmatter, id } = guide;

  let pageUrl = '';
  let guideType = '';

  if (isQuestionGroupType(guide)) {
    pageUrl = `/questions/${id}`;
    guideType = 'Questions';
  } else {
    const excludedBySlug = (frontmatter as GuideFrontmatter).excludedBySlug;
    pageUrl = excludedBySlug ? excludedBySlug : `/guides/${id}`;
    guideType = (frontmatter as GuideFrontmatter).type;
  }

  return (
    <a
      className="text-md group block flex items-center justify-between border-b py-2 text-gray-600 no-underline hover:text-blue-600"
      href={pageUrl}
    >
      <span className="text-sm transition-transform group-hover:translate-x-2 md:text-base">
        {frontmatter.title}

        {frontmatter.isNew && (
          <span className="ml-2.5 rounded-xs bg-green-300 px-1.5 py-0.5 text-xs font-medium uppercase text-green-900">
            New
            <span className="hidden sm:inline">
              &nbsp;&middot;&nbsp;
              {new Date(frontmatter.date || '').toLocaleString('default', {
                month: 'long',
              })}
            </span>
          </span>
        )}
      </span>
      <span className="hidden text-xs capitalize text-gray-500 sm:block">
        {guideType}
      </span>

      <span className="block text-xs text-gray-400 sm:hidden"> &raquo;</span>
    </a>
  );
}
