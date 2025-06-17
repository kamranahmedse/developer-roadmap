import { cn } from '../../lib/classname.ts';
import type { AllowedLinkTypes } from '../CustomRoadmap/CustomRoadmap.tsx';

const linkTypes: Record<AllowedLinkTypes | string, string> = {
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

type TopicLinkBadgeProps = {
  isPaid: boolean;
  discountText?: string;
  type: AllowedLinkTypes | string;
  className?: string;
};

function TopicLinkBadge(props: TopicLinkBadgeProps) {
  const { isPaid, type, className } = props;

  const linkType = type === 'opensource' ? 'OpenSource' : type;
  const isDiscount = type.includes('% off');

  return (
    <span className={cn('mr-2', className)}>
      <span
        className={cn(
          'inline-block rounded-sm px-1.5 py-0.5 text-xs capitalize no-underline',
          (isPaid ? paidLinkTypes[type] : linkTypes[type]) || 'bg-gray-200',
          isDiscount && 'bg-green-300',
        )}
      >
        {linkType}
      </span>
    </span>
  );
}

type TopicDetailLinkProps = {
  url: string;
  onClick?: () => void;
  type: AllowedLinkTypes;
  title: string;
  isPaid?: boolean;
};

export function TopicDetailLink(props: TopicDetailLinkProps) {
  const { url, onClick, type, title, isPaid = false } = props;

  const isScrimbaLink = url.toLowerCase().includes('scrimba.com');

  return (
    <a
      href={url}
      target="_blank"
      className="group font-medium text-gray-800 underline underline-offset-1 hover:text-black"
      onClick={onClick}
    >
      <TopicLinkBadge
        isPaid={isPaid}
        type={type}
        discountText={isScrimbaLink ? '20% off' : undefined}
        className={isScrimbaLink ? 'mr-1' : 'mr-2'}
      />
      {isScrimbaLink && <TopicLinkBadge isPaid={isPaid} type="20% off" />}

      {title}
    </a>
  );
}
