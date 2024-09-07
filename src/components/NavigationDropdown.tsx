import {
  BookOpenText,
  CheckSquare,
  FileQuestion,
  FolderKanban,
  Menu,
  Shirt,
  Video,
  Waypoints,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/classname.ts';
import { useOutsideClick } from '../hooks/use-outside-click.ts';
import {
  navigationDropdownOpen,
  roadmapsDropdownOpen,
} from '../stores/page.ts';
import { useStore } from '@nanostores/react';

const links = [
  {
    link: '/roadmaps',
    label: 'Official Roadmaps',
    description: 'Made by subject matter experts',
    Icon: Waypoints,
  },
  {
    link: '/backend/projects',
    label: 'Projects',
    description: 'Skill-up with real-world projects',
    Icon: FolderKanban,
  },
  {
    link: '/best-practices',
    label: 'Best Practices',
    description: "Do's and don'ts",
    Icon: CheckSquare,
  },
  {
    link: '/questions',
    label: 'Questions',
    description: 'Test and Practice your knowledge',
    Icon: FileQuestion,
  },
  {
    link: '/guides',
    label: 'Guides',
    description: 'In-depth articles and tutorials',
    Icon: BookOpenText,
  },
  {
    link: 'https://youtube.com/@roadmapsh',
    label: 'Videos',
    description: 'Animated and interactive content',
    Icon: Video,
    isExternal: true,
  },
  {
    link: 'https://cottonbureau.com/people/roadmapsh',
    label: 'Shop',
    description: 'Get some cool swag',
    Icon: Shirt,
    isExternal: true,
  },
  {
    link: '/advertise',
    label: 'Advertise',
    description: 'Promote your product or service',
    Icon: Menu,
  },
];

export function NavigationDropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const $navigationDropdownOpen = useStore(navigationDropdownOpen);
  const $roadmapsDropdownOpen = useStore(roadmapsDropdownOpen);

  useOutsideClick(dropdownRef, () => {
    navigationDropdownOpen.set(false);
  });

  useEffect(() => {
    if ($roadmapsDropdownOpen) {
      navigationDropdownOpen.set(false);
    }
  }, [$roadmapsDropdownOpen]);

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        className={cn('text-gray-400 hover:text-white', {
          'text-white': $navigationDropdownOpen,
        })}
        onClick={() => navigationDropdownOpen.set(true)}
        onMouseOver={() => navigationDropdownOpen.set(true)}
        aria-label="Open Navigation Dropdown"
        aria-expanded={$navigationDropdownOpen}
      >
        <Menu className="h-5 w-5" />
      </button>
      <div
        className={cn(
          'pointer-events-none invisible absolute left-0 top-full z-[999] mt-2 w-48 min-w-[320px] -translate-y-1 rounded-lg bg-slate-800 py-2 opacity-0 shadow-xl transition-all duration-100',
          {
            'pointer-events-auto visible translate-y-2.5 opacity-100':
              $navigationDropdownOpen,
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
            className="group flex items-center gap-3 px-4 py-2.5 text-gray-400 transition-colors hover:bg-slate-700"
            role="menuitem"
          >
            <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-slate-600 transition-colors group-hover:bg-slate-500 group-hover:text-slate-100">
              <link.Icon className="inline-block h-5 w-5" />
            </span>
            <span className="flex flex-col">
              <span className="font-medium text-slate-300 transition-colors group-hover:text-slate-100">
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
