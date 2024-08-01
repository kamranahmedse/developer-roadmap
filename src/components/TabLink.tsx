import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/classname.ts';

type TabLinkProps = {
  icon: LucideIcon;
  text: string;
  isActive: boolean;
  isExternal?: boolean;
  url: string;
};

export function TabLink(props: TabLinkProps) {
  const { icon: Icon, isExternal = false, url, text, isActive } = props;

  const className = cn(
    'inline-flex items-center gap-1 border-b-2 px-2 pb-2.5 text-sm',
    {
      'cursor-default border-b-black font-medium text-black': isActive,
      'border-b-transparent font-normal text-gray-400 hover:text-gray-700':
        !isActive,
      'font-medium hover:text-black text-gray-500 px-0': isExternal,
    },
  );

  if (isActive) {
    return (
      <span className={className}>
        <Icon className="h-4 w-4 flex-shrink-0" />
        {text}
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
      <Icon className="h-4 w-4 flex-shrink-0" />
      {text}
    </a>
  );
}
