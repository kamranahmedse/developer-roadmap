import { useEffect, useRef, useState } from 'preact/hooks';
import { httpPost, httpPut } from '../../lib/http';
import { useTeamId } from '../../hooks/use-team-id';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { AllowedRoles, RoleDropdown } from '../CreateTeam/RoleDropdown';
import type { TeamMemberDocument } from './TeamMembersPage';

type InviteMemberPopupProps = {
  member: TeamMemberDocument;
  onUpdated: () => void;
  onClose: () => void;
};

export function UpdateMemberPopup(props: InviteMemberPopupProps) {
  const { onClose, onUpdated, member } = props;

  const popupBodyRef = useRef<HTMLDivElement>(null);
  const [selectedRole, setSelectedRole] = useState<AllowedRoles>(member.role);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { teamId } = useTeamId();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { response, error } = await httpPut(
      `${import.meta.env.PUBLIC_API_URL}/v1-update-member-role/${teamId}/${
        member._id
      }`,
      { role: selectedRole }
    );

    if (error || !response) {
      setIsLoading(false);
      setError(error?.message || 'Something went wrong');
      return;
    }

    setIsLoading(false);
    onUpdated();
  };

  const handleClosePopup = () => {
    setIsLoading(false);
    setError('');

    onClose();
  };

  useOutsideClick(popupBodyRef, handleClosePopup);

  return (
    <div class="popup fixed left-0 right-0 top-0 z-50 flex h-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50">
      <div class="relative h-full w-full max-w-md p-4 md:h-auto">
        <div
          ref={popupBodyRef}
          class="popup-body relative rounded-lg bg-white p-4 shadow"
        >
          <h3 class="mb-1.5 text-xl sm:text-2xl font-medium">Update Role</h3>
          <p className="mb-3 text-sm leading-none text-gray-400 hidden sm:block">
            Select the role to update for this member
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mt-0 sm:mt-4 my-4 flex flex-col gap-2">
              <span className="mt-2 block w-full rounded-md bg-gray-100 p-2">
                {member.invitedEmail}
              </span>

              <div className="flex h-[42px] w-full flex-col">
                <RoleDropdown
                  className="h-full w-full"
                  selectedRole={selectedRole}
                  setSelectedRole={setSelectedRole}
                />
              </div>

              {error && (
                <p className=" rounded-md border border-red-300 bg-red-50 p-2 text-sm text-red-700">
                  {error}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleClosePopup}
                className="flex-grow cursor-pointer rounded-lg bg-gray-200 py-2 text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !selectedRole}
                class="flex-grow cursor-pointer rounded-lg bg-black py-2 text-center text-white disabled:opacity-40"
              >
                {isLoading ? 'Please wait ..' : 'Update Role'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
