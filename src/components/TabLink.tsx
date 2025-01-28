import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/classname.ts';

type TabLinkProps = {
  icon: LucideIcon;
  text: string;
  isActive: boolean;
  isExternal?: boolean;
  badgeText?: string;
  hideTextOnMobile?: boolean;
  url: string;
};

export function TabLink(props: TabLinkProps) {
  const {
    icon: Icon,
    badgeText,
    isExternal = false,
    url,
    text,
    isActive,
    hideTextOnMobile = false,
  } = props;

  const className = cn(
    'inline-flex group transition-colors items-center gap-1.5 border-b-2 px-2 pb-2.5 text-sm',
    {
      'cursor-default border-b-black font-medium text-black': isActive,
      'border-b-transparent font-normal text-gray-400 hover:text-gray-700':
        !isActive,
      'font-medium hover:text-black text-gray-500 px-0': isExternal,
    },
  );

  const textClass = cn({
    'hidden sm:inline': hideTextOnMobile,
  });

  const badgeNode = badgeText && (
    <span
      className={cn(
        'ml-0.5 hidden items-center gap-0.5 rounded-full bg-yellow-200 px-2 py-0.5 text-xs font-medium text-black transition-colors sm:flex',
        {
          'bg-gray-200 text-black group-hover:bg-gray-300 ': badgeText?.toLowerCase() == 'soon',
          'bg-yellow-200 text-black group-hover:bg-yellow-300 ': badgeText?.toLowerCase() == 'new',
        },
      )}
    >
      <span className="relative -top-px">{badgeText}</span>
    </span>
  );

  if (isActive) {
    return (
      <span className={className}>
        <Icon className="h-4 w-4 shrink-0" />
        <span className={textClass}>{text}</span>
        {badgeNode}
      </span>
    );
  }

  return (
    <a
      target={isExternal ? '_blank' : undefined}
      onClick={(e) => {
        e.preventDefault();
      }}
      href={url}
      className={className}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className={textClass}>{text}</span>
      {badgeNode}
    </a>
  );
}
