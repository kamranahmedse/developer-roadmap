import type { ListUserAIGuidesResponse } from '../../queries/ai-guide';
import { AIGuideActions } from './AIGuideActions';

type AIGuideCardProps = {
  guide: ListUserAIGuidesResponse['data'][number] & {
    html: string;
  };
  showActions?: boolean;
};

export function AIGuideCard(props: AIGuideCardProps) {
  const { guide, showActions = true } = props;

  const guideDepthColor =
    {
      essentials: 'text-green-700',
      detailed: 'text-blue-700',
      complete: 'text-purple-700',
    }[guide.depth] || 'text-gray-700';

  return (
    <div className="relative flex flex-grow flex-col">
      <a
        href={`/ai/guide/${guide.slug}`}
        className="group relative flex h-full min-h-[140px] w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4 text-left hover:border-gray-300 hover:bg-gray-50"
      >
        <div className="mb-4 flex items-center justify-between">
          <span
            className={`rounded-full text-xs font-medium capitalize opacity-80 ${guideDepthColor}`}
          >
            {guide.depth}
          </span>
        </div>

        <div className="relative max-h-[290px] min-h-[290px] overflow-y-hidden">
          <div
            className="prose prose-sm prose-pre:bg-gray-100 [&_h1]:hidden [&_h1:first-child]:block [&_h1:first-child]:text-lg [&_h1:first-child]:font-bold [&_h1:first-child]:text-pretty [&_h2]:hidden [&_h3]:hidden [&_h4]:hidden [&_h5]:hidden [&_h6]:hidden"
            dangerouslySetInnerHTML={{ __html: guide.html }}
          />

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent group-hover:from-gray-50" />
        </div>
      </a>

      {showActions && guide.slug && (
        <div className="absolute top-2 right-2">
          <AIGuideActions guideSlug={guide.slug} />
        </div>
      )}
    </div>
  );
}
