import type { AIGuideDocument } from '../../queries/ai-guide';
import { AIGuideActions } from './AIGuideActions';

type AIGuideCardProps = {
  guide: Pick<AIGuideDocument, 'slug' | 'title' | 'depth'>;
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
        href={`/ai/guides/${guide.slug}`}
        className="hover:border-gray-3 00 group relative flex h-full min-h-[140px] w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4 text-left transition-all hover:bg-gray-50"
      >
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full text-xs font-medium capitalize opacity-80 ${guideDepthColor}`}
          >
            {guide.depth}
          </span>
        </div>

        <h3 className="my-2 text-base font-semibold text-gray-900">
          {guide.title}
        </h3>
      </a>

      {showActions && guide.slug && (
        <div className="absolute top-2 right-2">
          <AIGuideActions guideSlug={guide.slug} />
        </div>
      )}
    </div>
  );
}
