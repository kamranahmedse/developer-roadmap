import { BookOpen, Bot, Compass, Plus, Star } from 'lucide-react';

type AITutorSidebarProps = {
  activeTab: AITutorTab;
};

const sidebarItems = [
  {
    key: 'new',
    label: 'New Course',
    href: '/ai',
    icon: Plus,
  },
  {
    key: 'courses',
    label: 'My Courses',
    href: '/ai/courses',
    icon: BookOpen,
  },
  {
    key: 'staff-picks',
    label: 'Staff Picks',
    href: '/ai/staff-picks',
    icon: Star,
  },
  {
    key: 'explore',
    label: 'Explore',
    href: '/ai/explore',
    icon: Compass,
  },
];

export type AITutorTab = (typeof sidebarItems)[number]['key'];

export function AITutorSidebar(props: AITutorSidebarProps) {
  const { activeTab } = props;

  return (
    <aside className="hidden w-[255px] shrink-0 border-r border-slate-200 md:block">
      <div className="flex flex-col items-start justify-center px-6 py-5">
        <Bot className="mb-2 size-8 text-black" />
        <h2 className="mb-0.5 text-base font-semibold text-black">AI Tutor</h2>
        <p className="max-w-[150px] text-xs text-gray-500">
          Your personalized learning companion for any topic
        </p>
      </div>

      <ul className="space-y-1">
        {sidebarItems.map((item) => (
          <li key={item.key}>
            <a
              href={item.href}
              className={`font-regular flex w-full items-center border-r-2 px-5 py-2 text-sm transition-all ${
                activeTab === item.key
                  ? 'border-r-black bg-gray-100 text-black'
                  : 'border-r-transparent text-gray-500 hover:border-r-gray-300'
              }`}
            >
              <span className="flex grow items-center">
                <item.icon className="mr-2 size-4" />
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
