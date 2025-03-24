import { ChevronDown, Globe, Menu, Sparkles, Map } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { cn } from '../../lib/classname';
import {
  navigationDropdownOpen,
  roadmapsDropdownOpen,
} from '../../stores/page.ts';
import { useStore } from '@nanostores/react';

const links = [
  {
    link: '/roadmaps',
    label: 'Official Roadmaps',
    description: 'Made by subject matter experts',
    Icon: Map,
    isHighlighted: true,
  },
  {
    link: '/ai',
    label: 'AI Roadmaps',
    description: 'Generate roadmaps with AI',
    Icon: Sparkles,
    isHighlighted: false,
  },
  {
    link: '/community',
    label: 'Community Roadmaps',
    description: 'Made by community members',
    Icon: Globe,
    isHighlighted: false,
  },
];

export function RoadmapDropdownMenu() {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const $roadmapsDropdownOpen = useStore(roadmapsDropdownOpen);
  const $navigationDropdownOpen = useStore(navigationDropdownOpen);

  useOutsideClick(dropdownRef, () => {
    roadmapsDropdownOpen.set(false);
  });

  useEffect(() => {
    if ($navigationDropdownOpen) {
      roadmapsDropdownOpen.set(false);
    }
  }, [$navigationDropdownOpen]);

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        className={cn('text-gray-400 hover:text-white', {
          'text-white': $roadmapsDropdownOpen,
        })}
        onClick={() => roadmapsDropdownOpen.set(true)}
        onMouseOver={() => roadmapsDropdownOpen.set(true)}
        aria-label="Open Navigation Dropdown"
        aria-expanded={$roadmapsDropdownOpen}
      >
        Roadmaps{' '}
        <ChevronDown className="inline-block h-3 w-3" strokeWidth={4} />
      </button>
      <div
        className={cn(
          'pointer-events-none invisible absolute left-0 top-full z-[90] mt-2 w-48 min-w-[320px] -translate-y-1 rounded-lg bg-slate-800 py-2 opacity-0 shadow-2xl transition-all duration-100',
          {
            'pointer-events-auto visible translate-y-2.5 opacity-100':
              $roadmapsDropdownOpen,
          },
        )}
        role="menu"
      >
        {links.map((link) => (
          <a
            href={link.link}
            key={link.link}
            className={cn(
              'group flex items-center gap-3 px-4 py-2.5 text-gray-400 transition-colors hover:bg-slate-700',
              {
                'mx-2 mb-1 rounded-md border border-slate-600 bg-slate-700 text-gray-200 hover:bg-slate-600':
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
                {link.label}
              </span>
              <span className="text-sm">{link.description}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
