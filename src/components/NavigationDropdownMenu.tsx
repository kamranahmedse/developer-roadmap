import { useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/classname.ts';
import { useOutsideClick } from '../hooks/use-outside-click.ts';

export interface DropdownLink {
  link: string;
  label: string;
  description: string;
  Icon: LucideIcon;
  isExternal?: boolean;
  isHighlighted?: boolean;
  isNew?: boolean;
}

interface NavigationDropdownMenuProps {
  links: DropdownLink[];
  trigger: React.ReactNode;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function NavigationDropdownMenu(props: NavigationDropdownMenuProps) {
  const { links, trigger, isOpen, onOpen, onClose } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, onClose);

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        className={cn('text-gray-400 hover:text-white', {
          'text-white': isOpen,
        })}
        onClick={onOpen}
        onMouseOver={onOpen}
        aria-label="Open Navigation Dropdown"
        aria-expanded={isOpen}
      >
        {trigger}
      </button>
      <div
        className={cn(
          'pointer-events-none invisible absolute top-full left-0 z-90 mt-2 w-48 min-w-[320px] -translate-y-1 rounded-lg bg-slate-800 py-2 opacity-0 shadow-xl transition-all duration-100',
          {
            'pointer-events-auto visible translate-y-2.5 opacity-100': isOpen,
          },
        )}
        role="menu"
      >
        {links.map((link) => (
          <a
            href={link.link}
            target={link.isExternal ? '_blank' : undefined}
            rel={link.isExternal ? 'noopener noreferrer' : undefined}
            key={link.link}
            className={cn(
              'group flex items-center gap-3 px-4 py-2.5 text-gray-400 transition-colors hover:bg-slate-700',
              {
                'mx-2 mb-1 rounded-md border border-slate-600 bg-slate-700 pl-2.5 text-gray-200 hover:bg-slate-600':
                  link.isHighlighted,
              },
            )}
            role="menuitem"
          >
            <span
              className={cn(
                'flex h-[40px] w-[40px] items-center justify-center rounded-full bg-slate-600 transition-colors group-hover:bg-slate-500 group-hover:text-slate-100',
                {
                  'bg-slate-500 text-slate-100': link.isHighlighted,
                },
              )}
            >
              <link.Icon className="inline-block h-5 w-5" />
            </span>
            <span className="flex flex-col">
              <span
                className={cn(
                  'font-medium text-slate-300 transition-colors group-hover:text-slate-100',
                  {
                    'text-white': link.isHighlighted,
                  },
                )}
              >
                {link.label}{' '}
                {link.isNew && (
                  <span className="relative -top-0.5 rounded-full bg-yellow-400 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-black uppercase">
                    New
                  </span>
                )}
              </span>
              <span className="text-sm">{link.description}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
