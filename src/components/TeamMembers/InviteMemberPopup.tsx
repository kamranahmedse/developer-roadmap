import { type FormEvent, useEffect, useRef, useState } from 'react';
import { httpPost } from '../../lib/http';
import { useTeamId } from '../../hooks/use-team-id';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { type AllowedRoles, RoleDropdown } from '../CreateTeam/RoleDropdown';

type InviteMemberPopupProps = {
  onInvited: () => void;
  onClose: () => void;
  teamId?: string;
};

export function InviteMemberPopup(props: InviteMemberPopupProps) {
  const { onClose, onInvited, teamId: defaultTeamId } = props;

  const popupBodyRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [selectedRole, setSelectedRole] = useState<AllowedRoles>('member');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { teamId = defaultTeamId } = useTeamId();

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-invite-member/${teamId}`,
      { email, role: selectedRole },
    );

    if (error || !response) {
      setIsLoading(false);
      setError(error?.message || 'Something went wrong');
      return;
    }

    setIsLoading(false);
    handleClosePopup();
    onInvited();
  };

  const handleClosePopup = () => {
    setIsLoading(false);
    setError('');

    onClose();
  };

  useOutsideClick(popupBodyRef, handleClosePopup);

  return (
    <div className="popup fixed left-0 right-0 top-0 z-50 flex h-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50">
      <div className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div
          ref={popupBodyRef}
          className="popup-body relative rounded-lg bg-white p-4 shadow"
        >
          <h3 className="mb-1.5 text-xl font-medium sm:text-2xl">
            Invite Member
          </h3>
          <p className="mb-3 hidden text-sm leading-none text-gray-400 sm:block">
            Enter the email and role below to invite a member.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="my-4 mt-0 flex flex-col gap-2 sm:mt-4">
              <input
                ref={emailRef}
                type="email"
                name="invite-member"
                id="invite-member"
                className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none placeholder:text-gray-400 focus:border-gray-400"
                placeholder="Enter email address"
                required
                autoFocus
                value={email}
                onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              />

              <div className="flex h-[42px] w-full flex-col">
                <RoleDropdown
                  className="h-full w-full"
                  selectedRole={selectedRole}
                  setSelectedRole={setSelectedRole}
                />
              </div>

              {error && (
                <p className="rounded-md border border-red-300 bg-red-50 p-2 text-sm text-red-700">
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
                disabled={isLoading || !email}
                className="flex-grow cursor-pointer rounded-lg bg-black py-2 text-center text-white disabled:opacity-40"
              >
                {isLoading ? 'Please wait ..' : 'Invite'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
