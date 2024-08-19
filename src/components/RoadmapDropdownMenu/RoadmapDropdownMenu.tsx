import { ChevronDown, Globe, Menu, Sparkles, Waypoints } from 'lucide-react';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { cn } from '../../lib/classname';

const links = [
  {
    link: '/roadmaps',
    label: 'Roadmaps',
    description: 'Step by step learning paths',
    Icon: Waypoints,
  },
  {
    link: '/ai/explore',
    label: 'AI Roadmaps',
    description: 'AI generated learning paths',
    Icon: Sparkles,
  },
  {
    link: '/community',
    label: 'Community Roadmaps',
    description: 'Community built learning paths',
    Icon: Globe,
  },
];

export function RoadmapDropdownMenu() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        className={cn('text-gray-400 hover:text-white', {
          'text-white': isOpen,
        })}
        onClick={() => setIsOpen(true)}
        onMouseOver={() => setIsOpen(true)}
        aria-label="Open Navigation Dropdown"
      >
        Roadmaps <ChevronDown className="inline-block h-5 w-5" />
      </button>
      <div
        className={cn(
          'pointer-events-none invisible absolute left-0 top-full z-[999] mt-2 w-48 min-w-[320px] -translate-y-1 rounded-lg bg-slate-800 py-2 opacity-0 shadow-xl transition-all duration-100',
          {
            'pointer-events-auto visible translate-y-2.5 opacity-100': isOpen,
          },
        )}
        onMouseLeave={() => setIsOpen(false)}
      >
        {links.map((link) => (
          <a
            href={link.link}
            key={link.link}
            className="group flex items-center gap-3 px-4 py-2.5 text-gray-400 transition-colors hover:bg-slate-700"
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
