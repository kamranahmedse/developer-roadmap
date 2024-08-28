import { cn } from '../../lib/classname.ts';
import type { AllowedLinkTypes } from '../CustomRoadmap/CustomRoadmap.tsx';

const linkTypes: Record<AllowedLinkTypes, string> = {
  article: 'bg-yellow-300',
  course: 'bg-green-400',
  opensource: 'bg-black text-white',
  'roadmap.sh': 'bg-black text-white',
  roadmap: 'bg-black text-white',
  podcast: 'bg-purple-300',
  video: 'bg-purple-300',
  website: 'bg-blue-300',
  official: 'bg-blue-600 text-white',
  feed: 'bg-[#ce3df3] text-white',
};

const paidLinkTypes: Record<string, string> = {
  course: 'bg-yellow-300',
};

type TopicDetailLinkProps = {
  url: string;
  onClick?: () => void;
  type: AllowedLinkTypes;
  title: string;
  isPaid?: boolean;
};

export function TopicDetailLink(props: TopicDetailLinkProps) {
  const { url, onClick, type, title, isPaid = false } = props;

  return (
    <a
      href={url}
      target="_blank"
      className="group font-medium text-gray-800 underline underline-offset-1 hover:text-black"
      onClick={onClick}
    >
      <span
        className={cn(
          'mr-2 inline-block rounded px-1.5 py-0.5 text-xs uppercase no-underline',
          (isPaid ? paidLinkTypes[type] : linkTypes[type]) || 'bg-gray-200',
        )}
      >
        {type === 'opensource' ? (
          <>
            {url.includes('github') && 'GitHub'}
            {url.includes('gitlab') && 'GitLab'}
          </>
        ) : (
          type
        )}
      </span>
      {title}
    </a>
  );
}
