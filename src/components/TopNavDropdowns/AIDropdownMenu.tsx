import { useStore } from '@nanostores/react';
import { ChevronDown, Map, MessageCircle, Plus, Swords } from 'lucide-react';
import { useEffect } from 'react';
import {
  aiDropdownOpen,
  navigationDropdownOpen,
  roadmapsDropdownOpen,
} from '../../stores/page.ts';
import { NavigationDropdownMenu } from '../NavigationDropdownMenu.tsx';

const links = [
  {
    link: '/ai',
    label: 'Create with AI',
    description: 'Learn something new with AI',
    Icon: Plus,
  },
  {
    link: '/ai/quiz',
    label: 'Test my Skills',
    description: 'Test your skills with AI',
    Icon: Swords,
  },
  {
    link: '/ai/chat',
    label: 'Ask AI Tutor',
    description: 'Career, resume guidance, and more',
    Icon: MessageCircle,
  },
  {
    link: '/ai/roadmap-chat',
    label: 'Roadmap Chat',
    description: 'Chat with AI Tutor about a roadmap',
    Icon: Map,
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
        <span className="group relative flex items-center gap-1 hover:text-white">
          AI Tutor
          <ChevronDown className="inline-block h-3 w-3" strokeWidth={4} />
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
