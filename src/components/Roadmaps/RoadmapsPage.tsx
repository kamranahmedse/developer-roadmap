import { useEffect, useState } from 'react';
import { cn } from '../../lib/classname.ts';

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

type GroupType = {
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
      },
      {
        title: 'Backend Beginner',
        link: '/backend?r=backend-beginner',
        type: 'role',
      },
      {
        title: 'DevOps Beginner',
        link: '/devops?r=devops-beginner',
        type: 'role',
      },
      {
        title: 'Full-Stack Developer',
        link: '/full-stack',
        type: 'role',
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
        title: 'DevOps',
        link: '/devops',
        type: 'role',
      },
      {
        title: 'Full Stack',
        link: '/full-stack',
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
    group: 'Mobile Development',
    roadmaps: [
      {
        title: 'Android',
        link: '/android',
        type: 'role',
      },
      {
        title: 'React Native',
        link: '/react-native',
        type: 'role',
      },
      {
        title: 'Flutter',
        link: '/flutter',
        type: 'role',
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
        link: '/data-structures-and-algorithms',
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

export function RoadmapsPage() {
  const [activeGroup, setActiveGroup] = useState<AllowGroupNames>('');
  const [visibleGroups, setVisibleGroups] = useState<GroupType[]>([]);

  useEffect(() => {
    if (!activeGroup) {
      const roleRoadmaps = groups.flatMap((group) =>
        group.roadmaps.filter((roadmap) => roadmap.type === 'role'),
      );
      const skillRoadmaps = groups.flatMap((group) =>
        group.roadmaps.filter((roadmap) => roadmap.type === 'skill'),
      );

      setVisibleGroups([
        {
          group: 'Role Based Roadmaps',
          roadmaps: roleRoadmaps,
        },
        {
          group: 'Skill Based Roadmaps',
          roadmaps: skillRoadmaps,
        },
      ]);
    } else {
      const group = groups.find((group) => group.group === activeGroup);

      if (group) {
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
      }
    }
  }, [activeGroup]);

  return (
    <div className="border-t bg-gray-100">
      <div className="container flex flex-row gap-4">
        <div className="w-[180px] border-r bg-gradient-to-l from-gray-100 pt-6">
          <div className="sticky top-10 pb-20">
            <div className="grid grid-cols-1">
              <button
                onClick={() => setActiveGroup('')}
                className={cn('border-b py-1.5 pr-3 text-right text-sm', {
                  'font-bold text-gray-900': activeGroup === '',
                })}
              >
                {' '}
                All Roadmaps
              </button>
              {groups.map((group) => (
                <button
                  className={cn(
                    'border-b bg-gradient-to-l py-1.5 pr-3 text-right text-sm text-gray-500 hover:from-white hover:text-gray-900',
                    {
                      'from-white font-semibold text-gray-900':
                        activeGroup === group.group,
                    },
                  )}
                  type="button"
                  onClick={() => setActiveGroup(group.group)}
                >
                  {group.group}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-grow flex-col gap-6 pb-20 pt-8">
          {visibleGroups.map((group) => (
            <div>
              <h2 className="mb-2 text-xs uppercase tracking-wide text-gray-400">
                {group.group}
              </h2>

              <div className="grid grid-cols-3 gap-1.5">
                {group.roadmaps.map((roadmap) => (
                  <a
                    className="rounded-md border bg-white px-3 py-2 text-left text-sm shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
                    href={roadmap.link}
                  >
                    {roadmap.title}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
