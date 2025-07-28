import { useQuery } from '@tanstack/react-query';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Compass,
  FileText,
  Map,
  MessageCircle,
  Star,
  Swords,
  X,
  Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUrlParams } from '../../lib/browser';
import { cn } from '../../lib/classname';
import { isLoggedIn } from '../../lib/jwt';
import { aiLimitOptions } from '../../queries/ai-course';
import { useIsPaidUser } from '../../queries/billing';
import { queryClient } from '../../stores/query-client';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { AILimitsPopup } from '../GenerateCourse/AILimitsPopup';
import { AITutorLogo } from '../ReactIcons/AITutorLogo';
import { UpgradeSidebarCard } from './UpgradeSidebarCard';
import { UserDropdown } from './UserDropdown';

type AITutorSidebarProps = {
  isFloating: boolean;
  activeTab?: AITutorTab;
  onClose: () => void;
};

const sidebarItems = [
  {
    key: 'new',
    label: 'Create with AI',
    href: '/ai',
    icon: Zap,
    children: [
      {
        key: 'create-course',
        label: 'Course',
        href: '/ai?format=course',
        icon: BookOpen,
      },
      {
        key: 'create-guide',
        label: 'Guide',
        href: '/ai?format=guide',
        icon: FileText,
      },
      {
        key: 'create-roadmap',
        label: 'Roadmap',
        href: '/ai?format=roadmap',
        icon: Map,
      },
      {
        key: 'quiz',
        label: 'Quiz',
        href: '/ai/quiz',
        icon: Swords,
      },
    ],
  },
  {
    key: 'chat',
    label: 'Ask AI Tutor',
    href: '/ai/chat',
    icon: MessageCircle,
  },
  {
    key: 'roadmap-chat',
    label: 'Roadmap Chat',
    href: '/ai/roadmap-chat',
    icon: Map,
  },
  {
    key: 'library',
    label: 'My Learning',
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
    key: 'community',
    label: 'Community',
    href: '/ai/community',
    icon: Compass,
  },
];

export type AITutorTab = (typeof sidebarItems)[number]['key'];

export function AITutorSidebar(props: AITutorSidebarProps) {
  const { activeTab, isFloating, onClose } = props;

  const [format, setFormat] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    new: true, // Keep "Create with AI" expanded by default
  });

  const [showAILimitsPopup, setShowAILimitsPopup] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const { isPaidUser, isLoading: isPaidUserLoading } = useIsPaidUser();

  const { data: limits, isLoading: isLimitsLoading } = useQuery(
    aiLimitOptions(),
    queryClient,
  );

  useEffect(() => {
    const { format } = getUrlParams();
    setFormat(format || 'course');
    setIsInitialLoad(false);
  }, []);

  const isLoading = isPaidUserLoading || isLimitsLoading;

  const toggleExpanded = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      {isUpgradeModalOpen && (
        <UpgradeAccountModal onClose={() => setIsUpgradeModalOpen(false)} />
      )}

      {showAILimitsPopup && (
        <AILimitsPopup
          onClose={() => setShowAILimitsPopup(false)}
          onUpgrade={() => {
            setIsUpgradeModalOpen(true);
            setShowAILimitsPopup(false);
          }}
        />
      )}

      <aside
        className={cn(
          'flex w-[255px] shrink-0 flex-col border-r border-slate-200',
          isFloating
            ? 'fixed top-0 bottom-0 left-0 z-50 flex border-r-0 bg-white shadow-xl'
            : 'hidden lg:flex',
        )}
      >
        {isFloating && (
          <button className="absolute top-3 right-3" onClick={onClose}>
            <X
              strokeWidth={3}
              className="size-3.5 text-gray-400 hover:text-black"
            />
          </button>
        )}
        <div className="flex flex-col items-start justify-center px-6 py-5">
          <div className="flex flex-row items-center gap-1">
            <AITutorLogo className="size-11 text-gray-500" color="black" />
          </div>
          <div className="my-3 flex flex-col">
            <h2 className="-mb-px text-base font-semibold text-black">
              AI Tutor
            </h2>
            <span className="text-xs text-gray-500">
              by{' '}
              <a href="/" className="underline-offset-2 hover:underline">
                roadmap.sh
              </a>
            </span>
          </div>
          <p className="max-w-[150px] text-xs text-gray-500">
            Your personalized learning companion for any topic
          </p>
        </div>

        <ul className="list-none space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.key}>
              <AITutorSidebarItem
                item={item}
                isActive={activeTab === item.key}
                isExpanded={expandedItems[item.key] || false}
                onToggleExpanded={() => toggleExpanded(item.key)}
              />
              {item.children && expandedItems[item.key] && (
                <ul className="relative list-none">
                  <div className="absolute top-0 bottom-0 left-7 w-px bg-gray-200" />
                  {item.children.map((child) => (
                    <li key={child.key}>
                      <AITutorSidebarItem
                        item={child}
                        isActive={
                          (activeTab === item.key &&
                            `create-${format}` === child.key) ||
                          activeTab === child.key
                        }
                        isChild={true}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          {!isInitialLoad && isLoggedIn() && !isPaidUser && !isLoading && (
            <li>
              <UpgradeSidebarCard
                onUpgrade={() => setIsUpgradeModalOpen(true)}
              />
            </li>
          )}
        </ul>
        <div className="mx-2 mt-auto mb-2">
          <UserDropdown />
        </div>
      </aside>
      {isFloating && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      )}
    </>
  );
}

type SidebarItem = {
  key: string;
  label: string;
  href: string;
  icon: any;
  children?: {
    key: string;
    label: string;
    href: string;
    icon: any;
  }[];
};

type ChildItem = {
  key: string;
  label: string;
  href: string;
  icon: any;
};

type AITutorSidebarItemProps = {
  item: SidebarItem | ChildItem;
  as?: 'a' | 'button';
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
  isChild?: boolean;
};

function AITutorSidebarItem(props: AITutorSidebarItemProps) {
  const {
    item,
    as = 'a',
    onClick,
    className,
    isActive,
    isExpanded,
    onToggleExpanded,
    isChild,
  } = props;

  const hasChildren = 'children' in item && item.children;
  const Component = hasChildren ? 'button' : as;

  return (
    <Component
      {...(Component === 'a' && !hasChildren ? { href: item.href } : {})}
      {...(Component === 'button'
        ? { onClick: hasChildren ? onToggleExpanded : onClick }
        : {})}
      className={cn(
        'font-regular flex w-full items-center border-r-2 px-5 py-2 text-sm transition-all',
        isActive && !hasChildren
          ? 'border-r-black bg-gray-100 text-black'
          : 'border-r-transparent text-gray-500',
        !isActive && !hasChildren && 'hover:bg-gray-50 hover:text-gray-700',
        !isActive && hasChildren && 'hover:text-gray-700',
        isChild && 'border-r-transparent py-1.5 pl-11',
        isChild && isActive && 'border-r-black border-r-2 bg-gray-100 text-black',
        className,
      )}
    >
      <span className="flex grow items-center">
        {!isChild && <item.icon className="mr-2 size-4" />}
        {item.label}
      </span>
      {hasChildren && (
        <span className="ml-auto">
          {isExpanded ? (
            <ChevronDown className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </span>
      )}
    </Component>
  );
}
