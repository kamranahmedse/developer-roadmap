import { ChevronLeft, PlusCircle, BookOpen, Compass } from 'lucide-react';

type AITutorSidebarProps = {
  activeTab: 'new' | 'courses' | 'explore';
};

const sidebarItems = [
  {
    key: 'new',
    label: 'New Course',
    href: '/ai/new',
    icon: PlusCircle,
  },
  {
    key: 'courses',
    label: 'My Courses',
    href: '/ai/courses',
    icon: BookOpen,
  },
  {
    key: 'explore',
    label: 'Explore',
    href: '/ai/explore',
    icon: Compass,
  },
];

export function AITutorSidebar(props: AITutorSidebarProps) {
  const { activeTab } = props;

  return (
    <div className="flex w-[240px] flex-col border-r border-gray-200 bg-gradient-to-b from-white to-gray-50">
      <a
        href="https://roadmap.sh"
        className="flex w-full items-center justify-start gap-1.5 border-b border-gray-200 px-5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-black"
      >
        <ChevronLeft className="size-4" />
        Back to <span className="font-semibold text-black">roadmap.sh</span>
      </a>

      <div className="px-6 pt-6 pb-2">
        <h2 className="text-lg font-semibold text-gray-900">Learn with AI</h2>
        <p className="mt-1 text-sm text-gray-500">
          Your personalized learning companion for any topic
        </p>
      </div>

      <div className="flex-1 px-3 py-3">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:text-black ${
                activeTab === item.key ? 'bg-gray-100 text-black' : ''
              }`}
            >
              <item.icon className="size-4" />
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
