import { DateTime } from 'luxon';
import {
  getOfficialGuideHref,
  type OfficialGuideDocument,
} from '../../queries/official-guide';

export interface GuideListItemProps {
  guide: OfficialGuideDocument;
}

export function GuideListItem(props: GuideListItemProps) {
  const { guide } = props;
  const { title, slug, publishedAt, roadmapId } = guide;

  let guideType = 'Textual';
  if (roadmapId === 'questions') {
    guideType = 'Question';
  }

  const publishedAtDate = publishedAt
    ? DateTime.fromJSDate(new Date(publishedAt))
    : null;

  const isNew =
    publishedAtDate && DateTime.now().diff(publishedAtDate, 'days').days < 15;
  const publishedAtMonth = publishedAtDate
    ? publishedAtDate.toFormat('MMMM')
    : '';

  return (
    <a
      className="text-md group flex items-center justify-between border-b py-2 text-gray-600 no-underline hover:text-blue-600"
      href={getOfficialGuideHref(slug, roadmapId)}
    >
      <span className="text-sm transition-transform group-hover:translate-x-2 md:text-base">
        {title}

        {isNew && (
          <span className="ml-2.5 rounded-xs bg-green-300 px-1.5 py-0.5 text-xs font-medium text-green-900 uppercase">
            New
            <span className="hidden sm:inline">
              &nbsp;&middot;&nbsp;
              {publishedAtMonth}
            </span>
          </span>
        )}
      </span>
      <span className="hidden text-xs text-gray-500 capitalize sm:block">
        {guideType}
      </span>

      <span className="block text-xs text-gray-400 sm:hidden"> &raquo;</span>
    </a>
  );
}
