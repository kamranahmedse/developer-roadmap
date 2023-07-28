import { useRef, useState } from 'preact/hooks';
import type { TeamMemberDocument } from './TeamMembersPage';
import { httpDelete, httpPatch } from '../../lib/http';
import MoreIcon from '../../icons/more-vertical.svg';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useToast } from '../../hooks/use-toast';

export function MemberActionDropdown({
  member,
  onUpdateMember,
  onDeleteMember,
  onResendInvite,
  isDisabled = false,
}: {
  onDeleteMember: () => void;
  onUpdateMember: () => void;
  onResendInvite: () => void;
  isDisabled: boolean;
  member: TeamMemberDocument;
}) {
  const toast = useToast();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useOutsideClick(menuRef, () => {
    setIsOpen(false);
  });

  const actions = [
    {
      name: 'Delete',
      handleClick: () => {
        onDeleteMember();
        setIsOpen(false);
      },
    },
    {
      name: 'Update Role',
      handleClick: () => {
        onUpdateMember();
        setIsOpen(false);
      },
    },
    ...(['invited'].includes(member.status)
      ? [
          {
            name: 'Resend Invite',
            handleClick: () => {
              onResendInvite();
              setIsOpen(false);
            },
          },
        ]
      : []),
  ];
  return (
    <div className="relative">
      <button
        disabled={isDisabled}
        onClick={() => setIsOpen(!isOpen)}
        className="ml-2 flex items-center opacity-60 transition-opacity hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <img alt="menu" src={MoreIcon} className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="align-right absolute right-0 top-full z-50 mt-1 w-32 rounded-md bg-slate-800 px-2 py-2 text-white shadow-md"
        >
          <ul>
            {actions.map((action, index) => {
              return (
                <li key={index}>
                  <button
                    onClick={action.handleClick}
                    disabled={isLoading}
                    className="flex w-full cursor-pointer items-center rounded p-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
                  >
                    {action.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
