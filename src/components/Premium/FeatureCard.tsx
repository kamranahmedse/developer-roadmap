import { Lock, Play } from 'lucide-react';
import { markdownToHtml } from '../../lib/markdown';

interface FeatureCardProps {
  title: string;
  description: string;
  duration?: string;
  videoId?: string;
  thumbnail?: string;
  onClick?: () => void;
  isComingSoon?: boolean;
}

export function FeatureCard(props: FeatureCardProps) {
  const {
    title,
    description,
    duration = '2:30',
    videoId,
    thumbnail,
    onClick,
    isComingSoon = false,
  } = props;

  if (isComingSoon) {
    return (
      <div className="group relative overflow-hidden rounded-lg border border-dashed border-slate-600/50 bg-slate-800/30 p-4 text-left opacity-90">
        <div className="relative block aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm">
              <Lock className="h-6 w-6 text-indigo-400/70" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-1 text-sm font-medium text-slate-100">{title}</h3>
          <p className="text-xs leading-relaxed text-slate-500">
            {description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-slate-700 bg-[#151F33] p-4 hover:border-blue-400">
      <button
        onClick={onClick}
        className="relative block aspect-video w-full cursor-pointer overflow-hidden rounded-lg bg-slate-900/50"
      >
        <img
          src={thumbnail}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute inset-0 -m-4 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <Play className="h-6 w-6 fill-current text-white" strokeWidth={2} />
          </span>
        </span>
      </button>
      <span className="absolute top-1 right-1 rounded bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
        {duration}
      </span>
      <div className="mt-4">
        <h3 className="mb-1 text-sm font-medium text-white">{title}</h3>
        <p
          className="text-xs [&_a]:text-blue-400 [&_a]:underline-offset-2 [&_a]:underline leading-relaxed text-slate-400"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(description) }}
        />
      </div>
    </div>
  );
}
