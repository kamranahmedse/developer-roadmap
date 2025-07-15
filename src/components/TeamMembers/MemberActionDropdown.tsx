import { useRef, useState } from 'react';
import type { TeamMemberDocument } from './TeamMembersPage';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { MoreVerticalIcon } from '../ReactIcons/MoreVerticalIcon.tsx';

export function MemberActionDropdown({
  member,
  onUpdateMember,
  onDeleteMember,
  onResendInvite,
  isDisabled = false,
  onSendProgressReminder,
  allowProgressReminder = false,
  allowUpdateRole = true,
}: {
  onDeleteMember: () => void;
  onUpdateMember: () => void;
  onResendInvite: () => void;
  onSendProgressReminder: () => void;
  isDisabled: boolean;
  allowProgressReminder: boolean;
  allowUpdateRole: boolean;
  member: TeamMemberDocument;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useOutsideClick(menuRef, () => {
    setIsOpen(false);
  });

  const actions = [
    ...(allowUpdateRole
      ? [
          {
            name: 'Update Role',
            handleClick: () => {
              onUpdateMember();
              setIsOpen(false);
            },
          },
        ]
      : []),
    ...(allowProgressReminder
      ? [
          {
            name: 'Send Progress Reminder',
            handleClick: () => {
              onSendProgressReminder();
              setIsOpen(false);
            },
          },
        ]
      : []),
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
    {
      name: 'Delete',
      handleClick: () => {
        onDeleteMember();
        setIsOpen(false);
      },
    },
  ];
  return (
    <div className="relative">
      <button
        disabled={isDisabled}
        onClick={() => setIsOpen(!isOpen)}
        className="ml-2 flex items-center opacity-60 transition-opacity hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <MoreVerticalIcon className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="align-right absolute right-0 top-full z-50 mt-1 w-[200px] rounded-md bg-slate-800 px-2 py-2 text-white shadow-md"
        >
          <ul>
            {actions.map((action, index) => {
              return (
                <li key={index}>
                  <button
                    onClick={action.handleClick}
                    disabled={isLoading}
                    className="flex w-full cursor-pointer items-center rounded-sm p-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
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
