import type { FunctionalComponent } from 'preact';
import { TeamDropdown } from './TeamDropdown/TeamDropdown';
import ChevronDown from '../icons/dropdown.svg';
import { useTeamId } from '../hooks/use-team-id';
import TeamProgress from '../icons/team-progress.svg';
import SettingsIcon from '../icons/cog.svg';
import ChatIcon from '../icons/chat.svg';
import MapIcon from '../icons/map.svg';
import GroupIcon from '../icons/group.svg';
import { useState } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import { $currentTeam } from '../stores/team';
import { SubmitFeedbackPopup } from './Feedback/SubmitFeedbackPopup';

export const TeamSidebar: FunctionalComponent<{
  activePageId: string;
}> = ({ activePageId, children }) => {
  const [menuShown, setMenuShown] = useState(false);
  const currentTeam = useStore($currentTeam);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);

  const { teamId } = useTeamId();

  const sidebarLinks = [
    {
      title: 'Progress',
      href: `/team/progress?t=${teamId}`,
      id: 'progress',
      icon: TeamProgress,
    },
    {
      title: 'Roadmaps',
      href: `/team/roadmaps?t=${teamId}`,
      id: 'roadmaps',
      icon: MapIcon,
      hasWarning: currentTeam?.roadmaps?.length === 0,
    },
    {
      title: 'Members',
      href: `/team/members?t=${teamId}`,
      id: 'members',
      icon: GroupIcon,
    },
    {
      title: 'Settings',
      href: `/team/settings?t=${teamId}`,
      id: 'settings',
      icon: SettingsIcon,
    },
  ];

  return (
    <>
      <div class="relative mb-5 block border-b p-4 shadow-inner md:hidden">
        <button
          class="flex h-10 w-full items-center justify-between rounded-md border bg-white px-2 text-center text-sm font-medium text-gray-900"
          id="settings-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setMenuShown(!menuShown)}
        >
          {
            sidebarLinks.find((sidebarLink) => sidebarLink.id === activePageId)
              ?.title
          }
          <img alt="menu" src={ChevronDown} class="h-4 w-4" />
        </button>
        {menuShown && (
          <ul
            id="settings-menu-dropdown"
            class="absolute left-0 right-0 z-50 mt-1 space-y-1.5 bg-white p-2 shadow-lg"
          >
            <li>
              <a
                href="/team"
                class={`flex w-full items-center rounded px-3 py-1.5 text-sm text-slate-900 hover:bg-slate-200 ${
                  activePageId === 'team' ? 'bg-slate-100' : ''
                }`}
              >
                <img alt={'teams'} src={GroupIcon} class={`mr-2 h-4 w-4`} />
                Personal Account / Teams
              </a>
            </li>
            {sidebarLinks.map((sidebarLink) => {
              const isActive = activePageId === sidebarLink.id;

              return (
                <li>
                  <a
                    href={sidebarLink.href}
                    class={`flex w-full items-center rounded px-3 py-1.5 text-sm text-slate-900 hover:bg-slate-200 ${
                      isActive ? 'bg-slate-100' : ''
                    }`}
                  >
                    <img
                      alt={'menu icon'}
                      src={sidebarLink.icon}
                      className="mr-2 h-4 w-4"
                    />
                    {sidebarLink.title}
                  </a>
                </li>
              );
            })}

            <li>
              <button
                className={`flex w-full items-center rounded px-3 py-1.5 text-sm text-slate-900 hover:bg-slate-200`}
                onClick={() => setShowFeedbackPopup(true)}
              >
                <img
                  alt={'menu icon'}
                  src={ChatIcon}
                  className="mr-2 h-4 w-4"
                />
                Send Feedback
              </button>
            </li>
          </ul>
        )}
      </div>
      {showFeedbackPopup && (
        <SubmitFeedbackPopup
          onClose={() => {
            setShowFeedbackPopup(false);
          }}
        />
      )}

      <div class="container flex min-h-screen items-stretch">
        <aside class="hidden w-44 shrink-0 border-r border-slate-200 py-10 md:block">
          <TeamDropdown />
          <nav>
            <ul class="space-y-1">
              {sidebarLinks.map((sidebarLink) => {
                const isActive = activePageId === sidebarLink.id;

                return (
                  <li>
                    <a
                      href={sidebarLink.href}
                      class={`font-regular flex w-full items-center border-r-2 px-2 py-1.5 text-sm ${
                        isActive
                          ? 'border-r-black bg-gray-100 text-black'
                          : 'border-r-transparent text-gray-500 hover:border-r-gray-300'
                      }`}
                    >
                      <span class="flex flex-grow items-center justify-between">
                        <span className="flex">
                          <img
                            alt="menu icon"
                            src={sidebarLink.icon}
                            className="relative top-[2px] mr-2 h-4 w-4"
                          />
                          {sidebarLink.title}
                        </span>
                        {sidebarLink.hasWarning && (
                          <span class="relative mr-1 flex items-center">
                            <span class="relative rounded-full bg-red-200 p-1 text-xs" />
                            <span class="absolute bottom-0 left-0 right-0 top-0 animate-ping rounded-full bg-red-400 p-1 text-xs" />
                          </span>
                        )}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <button
              className="mr-3 mt-4 flex items-center justify-center rounded-md border p-2 text-sm text-gray-500 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-black"
              onClick={() => setShowFeedbackPopup(true)}
            >
              <img src={ChatIcon} className="mr-2 h-4 w-4" />
              Send Feedback
            </button>
          </nav>
        </aside>
        <div className="grow px-0 py-0 md:px-10 md:py-10">{children}</div>
      </div>
    </>
  );
};
