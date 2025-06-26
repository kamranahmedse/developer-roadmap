import { ChevronDown, MessageCircle, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { NavigationDropdownMenu } from '../NavigationDropdownMenu.tsx';
import {
  navigationDropdownOpen,
  aiDropdownOpen,
  roadmapsDropdownOpen,
} from '../../stores/page.ts';
import { useStore } from '@nanostores/react';

const links = [
  {
    link: '/ai',
    label: 'Create with AI',
    description: 'Learn something new with AI',
    Icon: Plus,
  },
  {
    link: '/ai/chat',
    label: 'Ask AI Tutor',
    description: 'Career, resume guidance, and more',
    Icon: MessageCircle,
  },
];

export function AIDropdownMenu() {
  const isOpen = useStore(aiDropdownOpen);
  const isNavOpen = useStore(navigationDropdownOpen);

  useEffect(() => {
    if (isNavOpen) {
      aiDropdownOpen.set(false);
    }
  }, [isNavOpen]);

  return (
    <NavigationDropdownMenu
      links={links}
      trigger={
        <span className="group relative mr-3 flex items-center gap-1.5 text-blue-300 hover:text-white">
          AI Tutor
          <ChevronDown className="inline-block h-3 w-3" strokeWidth={4} />
          <span className="absolute top-0 -right-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
            </span>
          </span>
        </span>
      }
      isOpen={isOpen}
      onOpen={() => {
        navigationDropdownOpen.set(false);
        roadmapsDropdownOpen.set(false);
        aiDropdownOpen.set(true);
      }}
      onClose={() => aiDropdownOpen.set(false)}
    />
  );
}
