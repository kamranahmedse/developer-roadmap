import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/classname.ts';
import { Filter, X } from 'lucide-react';
import { CategoryFilterButton } from './CategoryFilterButton.tsx';
import { useOutsideClick } from '../../hooks/use-outside-click.ts';
import {
  deleteUrlParam,
  getUrlParams,
  setUrlParams,
} from '../../lib/browser.ts';
import { RoadmapCard } from './RoadmapCard.tsx';
import { httpGet } from '../../lib/http.ts';
import type { UserProgressResponse } from '../HeroSection/FavoriteRoadmaps.tsx';
import { isLoggedIn } from '../../lib/jwt.ts';

const groupNames = [
  'Absolute Beginners',
  'Web Development',
  'Languages / Platforms',
  'Frameworks',
  'Mobile Development',
  'Databases',
  'Computer Science',
  'Machine Learning',
  'Game Development',
  'Design',
  'DevOps',
  'Blockchain',
  'Cyber Security',
];

type AllowGroupNames = (typeof groupNames)[number];

export type GroupType = {
  group: AllowGroupNames;
  roadmaps: {
    title: string;
    link: string;
    type: 'role' | 'skill';
    otherGroups?: AllowGroupNames[];
  }[];
};

const groups: GroupType[] = [
  {
    group: 'Absolute Beginners',
    roadmaps: [
      {
        title: 'Frontend Beginner',
        link: '/frontend?r=frontend-beginner',
        type: 'role',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Backend Beginner',
        link: '/backend?r=backend-beginner',
        type: 'role',
        otherGroups: ['Web Development'],
      },
      {
        title: 'DevOps Beginner',
        link: '/devops?r=devops-beginner',
        type: 'role',
        otherGroups: ['Web Development'],
      },
    ],
  },
  {
    group: 'Web Development',
    roadmaps: [
      {
        title: 'Frontend',
        link: '/frontend',
        type: 'role',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Backend',
        link: '/backend',
        type: 'role',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Full Stack',
        link: '/full-stack',
        type: 'role',
        otherGroups: ['Web Development', 'Absolute Beginners'],
      },
      {
        title: 'API Design',
        link: '/api-design',
        type: 'role',
        otherGroups: ['Web Development'],
      },
      {
        title: 'QA',
        link: '/qa',
        type: 'role',
      },
      {
        title: 'GraphQL',
        link: '/graphql',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Git and GitHub',
        link: '/git-github',
        type: 'skill',
        otherGroups: ['Web Development', 'DevOps'],
      },
    ],
  },
  {
    group: 'Frameworks',
    roadmaps: [
      {
        title: 'React',
        link: '/react',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Vue',
        link: '/vue',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Angular',
        link: '/angular',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Spring Boot',
        link: '/spring-boot',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
      {
        title: 'ASP.NET Core',
        link: '/aspnet-core',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
    ],
  },
  {
    group: 'Languages / Platforms',
    roadmaps: [
      {
        title: 'JavaScript',
        link: '/javascript',
        type: 'skill',
        otherGroups: ['Web Development', 'DevOps', 'Mobile Development'],
      },
      {
        title: 'TypeScript',
        link: '/typescript',
        type: 'skill',
        otherGroups: ['Web Development', 'Mobile Development'],
      },
      {
        title: 'Node.js',
        link: '/nodejs',
        type: 'skill',
        otherGroups: ['Web Development', 'DevOps'],
      },
      {
        title: 'C++',
        link: '/cpp',
        type: 'skill',
      },
      {
        title: 'Go',
        link: '/golang',
        type: 'skill',
        otherGroups: ['Web Development', 'DevOps'],
      },
      {
        title: 'Rust',
        link: '/rust',
        type: 'skill',
        otherGroups: ['Web Development', 'DevOps'],
      },
      {
        title: 'Python',
        link: '/python',
        type: 'skill',
        otherGroups: ['Web Development', 'DevOps'],
      },
      {
        title: 'Java',
        link: '/java',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
      {
        title: 'SQL',
        link: '/sql',
        type: 'skill',
        otherGroups: ['Web Development', 'Databases', 'DevOps'],
      },
    ],
  },
  {
    group: 'DevOps',
    roadmaps: [
      {
        title: 'DevOps',
        link: '/devops',
        type: 'role',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Docker',
        link: '/docker',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Kubernetes',
        link: '/kubernetes',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
      {
        title: 'AWS',
        link: '/aws',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Linux',
        link: '/linux',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Terraform',
        link: '/terraform',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
    ],
  },
  {
    group: 'Mobile Development',
    roadmaps: [
      {
        title: 'Android',
        link: '/android',
        type: 'role',
      },
      {
        title: 'iOS',
        link: '/ios',
        type: 'role',
      },
      {
        title: 'React Native',
        link: '/react-native',
        type: 'skill',
      },
      {
        title: 'Flutter',
        link: '/flutter',
        type: 'skill',
      },
    ],
  },
  {
    group: 'Databases',
    roadmaps: [
      {
        title: 'PostgreSQL',
        link: '/postgresql-dba',
        type: 'role',
        otherGroups: ['Web Development'],
      },
      {
        title: 'MongoDB',
        link: '/mongodb',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Redis',
        link: '/redis',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
    ],
  },
  {
    group: 'Computer Science',
    roadmaps: [
      {
        title: 'Computer Science',
        link: '/computer-science',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Data Structures',
        link: '/datastructures-and-algorithms',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
      {
        title: 'System Design',
        link: '/system-design',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Design and Architecture',
        link: '/software-design-architecture',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Software Architect',
        link: '/software-architect',
        type: 'role',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Code Review',
        link: '/code-review',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
      {
        title: 'Technical Writer',
        link: '/technical-writer',
        type: 'role',
      },
      {
        title: 'Product Manager',
        link: '/product-manager',
        type: 'role',
      },
      {
        title: 'DevRel Engineer',
        link: '/devrel',
        type: 'role',
      },
    ],
  },
  {
    group: 'Machine Learning',
    roadmaps: [
      {
        title: 'AI and Data Scientist',
        link: '/ai-data-scientist',
        type: 'role',
      },
      {
        title: 'AI Engineer',
        link: '/ai-engineer',
        type: 'role',
      },
      {
        title: 'Data Analyst',
        link: '/data-analyst',
        type: 'role',
      },
      {
        title: 'MLOps',
        link: '/mlops',
        type: 'role',
      },
      {
        title: 'Prompt Engineering',
        link: '/prompt-engineering',
        type: 'skill',
      },
    ],
  },
  {
    group: 'Game Development',
    roadmaps: [
      {
        title: 'Client Side Game Dev.',
        link: '/game-developer',
        type: 'role',
      },
      {
        title: 'Server Side Game Dev.',
        link: '/server-side-game-developer',
        type: 'role',
      },
    ],
  },
  {
    group: 'Design',
    roadmaps: [
      {
        title: 'UX Design',
        link: '/ux-design',
        type: 'role',
      },
      {
        title: 'Design System',
        link: '/design-system',
        type: 'skill',
        otherGroups: ['Web Development'],
      },
    ],
  },
  {
    group: 'Blockchain',
    roadmaps: [
      {
        title: 'Blockchain',
        link: '/blockchain',
        type: 'role',
      },
    ],
  },
  {
    group: 'Cyber Security',
    roadmaps: [
      {
        title: 'Cyber Security',
        link: '/cyber-security',
        type: 'role',
      },
    ],
  },
];

const roleRoadmaps = groups.flatMap((group) =>
  group.roadmaps.filter((roadmap) => roadmap.type === 'role'),
);
const skillRoadmaps = groups.flatMap((group) =>
  group.roadmaps.filter((roadmap) => roadmap.type === 'skill'),
);

const allGroups = [
  {
    group: 'Role Based Roadmaps',
    roadmaps: roleRoadmaps,
  },
  {
    group: 'Skill Based Roadmaps',
    roadmaps: skillRoadmaps,
  },
];

export function RoadmapsPage() {
  const [activeGroup, setActiveGroup] = useState<AllowGroupNames>('');
  const [visibleGroups, setVisibleGroups] = useState<GroupType[]>(allGroups);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (!activeGroup) {
      setVisibleGroups(allGroups);
      return;
    }

    const group = groups.find((group) => group.group === activeGroup);
    if (!group) {
      return;
    }

    // other groups that have a roadmap that is in the same group
    const otherGroups = groups.filter((g) => {
      return (
        g.group !== group.group &&
        g.roadmaps.some((roadmap) => {
          return roadmap.otherGroups?.includes(group.group);
        })
      );
    });

    setVisibleGroups([
      group,
      ...otherGroups.map((g) => ({
        ...g,
        roadmaps: g.roadmaps.filter((roadmap) =>
          roadmap.otherGroups?.includes(group.group),
        ),
      })),
    ]);
  }, [activeGroup]);

  async function loadProgress() {
    const { response: progressList, error } =
      await httpGet<UserProgressResponse>(
        `${import.meta.env.PUBLIC_API_URL}/v1-get-hero-roadmaps`,
      );

    if (error || !progressList) {
      return;
    }

    progressList?.forEach((progress) => {
      window.dispatchEvent(
        new CustomEvent('mark-favorite', {
          detail: {
            resourceId: progress.resourceId,
            resourceType: progress.resourceType,
            isFavorite: progress.isFavorite,
          },
        }),
      );
    });
  }

  useEffect(() => {
    if (!isLoggedIn()) {
      return;
    }

    loadProgress().finally(() => { });
  }, []);

  useEffect(() => {
    const { g } = getUrlParams() as { g: AllowGroupNames };
    if (!g) {
      return;
    }

    setActiveGroup(g);
  }, []);

  return (
    <div className="border-t bg-gray-100">
      <button
        onClick={() => {
          setIsFilterOpen(!isFilterOpen);
        }}
        id="filter-button"
        className={cn(
          '-mt-1 flex w-full items-center justify-center bg-gray-300 py-2 text-sm text-black focus:shadow-none focus:outline-0 sm:hidden',
          {
            'mb-3': !isFilterOpen,
          },
        )}
      >
        {!isFilterOpen && <Filter size={13} className="mr-1" />}
        {isFilterOpen && <X size={13} className="mr-1" />}
        Categories
      </button>
      <div className="container relative flex flex-col gap-4 sm:flex-row">
        <div
          className={cn(
            'hidden w-full flex-col from-gray-100 sm:w-[180px] sm:border-r sm:bg-gradient-to-l sm:pt-6',
            {
              'hidden sm:flex': !isFilterOpen,
              'z-50 flex': isFilterOpen,
            },
          )}
        >
          <div className="absolute top-0 -mx-4 w-full bg-white pb-0 shadow-xl sm:sticky sm:top-10 sm:mx-0 sm:bg-transparent sm:pb-20 sm:shadow-none">
            <div className="grid grid-cols-1">
              <CategoryFilterButton
                onClick={() => {
                  setActiveGroup('');
                  setIsFilterOpen(false);
                  deleteUrlParam('g');
                }}
                category={'All Roadmaps'}
                selected={activeGroup === ''}
              />

              {groups.map((group) => (
                <CategoryFilterButton
                  key={group.group}
                  onClick={() => {
                    setActiveGroup(group.group);
                    setIsFilterOpen(false);
                    document?.getElementById('filter-button')?.scrollIntoView();
                    setUrlParams({ g: group.group });
                  }}
                  category={group.group}
                  selected={activeGroup === group.group}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-grow flex-col gap-6 pb-20 pt-2 sm:pt-8">
          {visibleGroups.map((group) => (
            <div key={`${group.group}-${group.roadmaps.length}`}>
              <h2 className="mb-2 text-xs uppercase tracking-wide text-gray-400">
                {group.group}
              </h2>

              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3">
                {group.roadmaps.map((roadmap) => (
                  <RoadmapCard roadmap={roadmap} key={roadmap.link} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
