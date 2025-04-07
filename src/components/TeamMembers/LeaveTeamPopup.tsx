import { type FormEvent, useEffect, useRef, useState } from 'react';
import { httpDelete } from '../../lib/http';
import { useTeamId } from '../../hooks/use-team-id';
import { useOutsideClick } from '../../hooks/use-outside-click';

type LeaveTeamPopupProps = {
  onClose: () => void;
};

export function LeaveTeamPopup(props: LeaveTeamPopupProps) {
  const { onClose } = props;

  const popupBodyRef = useRef<HTMLDivElement>(null);
  const confirmationEl = useRef<HTMLInputElement>(null);
  const [confirmationText, setConfirmationText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { teamId } = useTeamId();

  useEffect(() => {
    setError('');
    setConfirmationText('');
    confirmationEl?.current?.focus();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (confirmationText.toUpperCase() !== 'LEAVE') {
      setError('Verification text does not match');
      setIsLoading(false);
      return;
    }

    const { response, error } = await httpDelete(
      `${import.meta.env.PUBLIC_API_URL}/v1-leave-team/${teamId}`,
      {}
    );

    if (error || !response) {
      setIsLoading(false);
      setError(error?.message || 'Something went wrong');
      return;
    }

    window.location.href = '/account?c=tl';
  };

  const handleClosePopup = () => {
    setIsLoading(false);
    setError('');
    setConfirmationText('');

    onClose();
  };

  useOutsideClick(popupBodyRef, handleClosePopup);

  return (
    <div className="popup fixed left-0 right-0 top-0 z-50 flex h-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50">
      <div className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div
          ref={popupBodyRef}
          className="popup-body relative rounded-lg bg-white p-4 shadow-sm"
        >
          <h2 className="text-2xl font-semibold text-black">
            Leave Team
          </h2>
          <p className="text-gray-500">
            You will lose access to the team, the roadmaps and progress of other team members.
          </p>
          <p className="-mb-2 mt-3 text-base font-medium text-black">
            Please type "leave" to confirm.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <input
                ref={confirmationEl}
                type="text"
                name="leave-team"
                id="leave-team"
                className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 outline-hidden placeholder:text-gray-400 focus:border-gray-400"
                placeholder={'Type "leave" to confirm'}
                required
                autoFocus
                value={confirmationText}
                onInput={(e) =>
                  setConfirmationText((e.target as HTMLInputElement).value)
                }
              />
              {error && (
                <p className="mt-2 rounded-lg bg-red-100 p-2 text-red-700">
                  {error}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleClosePopup}
                className="grow cursor-pointer rounded-lg bg-gray-200 py-2 text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  isLoading || confirmationText.toUpperCase() !== 'LEAVE'
                }
                className="grow cursor-pointer rounded-lg bg-red-500 py-2 text-white disabled:opacity-40"
              >
                {isLoading ? 'Please wait ..' : 'Leave Team'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
