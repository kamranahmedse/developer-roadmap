import { ChevronDown, Globe, Map, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { NavigationDropdownMenu } from '../NavigationDropdownMenu.tsx';
import {
  aiDropdownOpen,
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
    link: '/ai?format=roadmap',
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
  const isOpen = useStore(roadmapsDropdownOpen);
  const isNavOpen = useStore(navigationDropdownOpen);

  useEffect(() => {
    if (isNavOpen) {
      roadmapsDropdownOpen.set(false);
    }
  }, [isNavOpen]);

  return (
    <NavigationDropdownMenu
      links={links}
      trigger={
        <span>
          Roadmaps{' '}
          <ChevronDown className="inline-block h-3 w-3" strokeWidth={4} />
        </span>
      }
      isOpen={isOpen}
      onOpen={() => {
        navigationDropdownOpen.set(false);
        aiDropdownOpen.set(false);
        roadmapsDropdownOpen.set(true);
      }}
      onClose={() => roadmapsDropdownOpen.set(false)}
    />
  );
}
