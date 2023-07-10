import { useState } from "preact/hooks"
import type { TeamMemberDocument } from "./TeamMembersPage"
import { httpDelete, httpPatch } from "../../lib/http";
import ChevronDownIcon from "../../icons/chevron-down.svg";

export function MemberActionDropdown({
  member
}: {
  member: TeamMemberDocument
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function deleteMember() {
    const { response, error } = await httpDelete(
      `${import.meta.env.PUBLIC_API_URL}/v1-delete-member/${member.teamId}/${member._id}`,
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
      `${import.meta.env.PUBLIC_API_URL}/v1-resend-invite/${member.teamId}/${member._id}`,
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
      handleClick: deleteMember
    },
    ...(['rejected', 'invited'].includes(member.status) ? [
      {
        name: 'Resend Invite',
        handleClick: resendInvite
      }
    ] : []),
  ]
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm"
      >
        Actions
        <img src={ChevronDownIcon} className="ml-2 w-3 h-3" />
      </button>

      {
        isOpen && (
          <div className="absolute top-full right-0 z-50 mt-1 w-full rounded-md bg-slate-800 px-2 py-2 text-white shadow-md align-right">
            <ul>
              {
                actions.map((action, index) => {
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
                  )
                })
              }
            </ul>
          </div>
        )}
    </div>
  )
}
