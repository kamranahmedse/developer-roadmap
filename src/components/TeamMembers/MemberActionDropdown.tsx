import { useRef, useState } from 'preact/hooks';
import type { TeamMemberDocument } from './TeamMembersPage';
import { httpDelete, httpPatch } from '../../lib/http';
import MoreIcon from '../../icons/more-vertical.svg';
import { useOutsideClick } from '../../hooks/use-outside-click';

export function MemberActionDropdown({
  member,
}: {
  member: TeamMemberDocument;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useOutsideClick(menuRef, () => {
    setIsOpen(false);
  });

  async function deleteMember() {
    const { response, error } = await httpDelete(
      `${import.meta.env.PUBLIC_API_URL}/v1-delete-member/${member.teamId}/${
        member._id
      }`,
      {}
    );

    if (error || !response) {
      setIsLoading(false);
      alert(error?.message || 'Something went wrong');
      return;
    }

    window.location.reload();
  }

  async function resendInvite() {
    const { response, error } = await httpPatch(
      `${import.meta.env.PUBLIC_API_URL}/v1-resend-invite/${member.teamId}/${
        member._id
      }`,
      {}
    );

    if (error || !response) {
      setIsLoading(false);
      alert(error?.message || 'Something went wrong');
      return;
    }

    window.location.reload();
  }

  const actions = [
    {
      name: 'Delete',
      handleClick: deleteMember,
    },
    ...(['invited'].includes(member.status)
      ? [
          {
            name: 'Resend Invite',
            handleClick: resendInvite,
          },
        ]
      : []),
  ];
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-2 flex items-center opacity-50 hover:opacity-100 transition-opacity"
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
