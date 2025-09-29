import { type AiGuideResource } from '../../lib/ai-guide';
import { track } from '../../lib/analytics';
import { getResourceUrl } from '../../lib/resource-helper';
import { Globe, Youtube } from 'lucide-react';

type AIGuideCardProps = {
  resource: AiGuideResource;
};

export function AIGuideCard(props: AIGuideCardProps) {
  const { resource } = props;

  // Strip HTML tags and decode HTML entities for safe text display
  const getPlainTextDescription = (description: string) => {
    return description
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/&amp;/g, '&') // Replace &amp; with &
      .replace(/&lt;/g, '<') // Replace &lt; with <
      .replace(/&gt;/g, '>') // Replace &gt; with >
      .replace(/&quot;/g, '"') // Replace &quot; with "
      .replace(/&#39;/g, "'") // Replace &#39; with '
      .trim();
  };

  return (
    <div className="group relative flex flex-col rounded-md border border-gray-300 bg-white p-4 text-sm leading-normal text-gray-800 shadow-sm transition-all sm:p-5">
      <p className="mb-2 grow text-gray-500">
        {resource.description ? getPlainTextDescription(resource.description) : ''}
      </p>

      <div className="mt-auto flex items-center justify-between">
        <a
          href={getResourceUrl(resource)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-all group-hover:text-gray-800"
          onClick={() => {
            track('AI Guide Resource Click', {
              url: getResourceUrl(resource),
              title: resource.title,
            });
          }}
        >
          {resource.type === 'video' ? (
            <Youtube size={14} />
          ) : (
            <Globe size={14} />
          )}
          {new URL(getResourceUrl(resource)).hostname}
        </a>
      </div>
    </div>
  );
}
