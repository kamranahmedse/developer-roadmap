import { type FormEvent, useEffect, useRef, useState } from 'react';
import { httpDelete } from '../lib/http';
import type { TeamDocument } from './CreateTeam/CreateTeamForm';
import { useTeamId } from '../hooks/use-team-id';
import { useOutsideClick } from '../hooks/use-outside-click';
import { useKeydown } from '../hooks/use-keydown';
import { useToast } from '../hooks/use-toast';

type DeleteTeamPopupProps = {
  onClose: () => void;
};

export function DeleteTeamPopup(props: DeleteTeamPopupProps) {
  const { onClose } = props;

  const toast = useToast();
  const popupBodyEl = useRef<HTMLDivElement>(null);
  const inputEl = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationText, setConfirmationText] = useState('');
  const { teamId } = useTeamId();

  useOutsideClick(popupBodyEl, () => {
    onClose();
  });

  useKeydown('Escape', () => {
    onClose();
  });

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (confirmationText.toUpperCase() !== 'DELETE') {
      setError('Verification text does not match');
      setIsLoading(false);
      return;
    }

    const { response, error } = await httpDelete<TeamDocument>(
      `${import.meta.env.PUBLIC_API_URL}/v1-delete-team/${teamId}`
    );

    if (error || !response) {
      setIsLoading(false);
      setError(error?.message || 'Something went wrong');
      return;
    }

    toast.success('Team deleted successfully');
    window.location.href = '/account';
  };

  const handleClosePopup = () => {
    setIsLoading(false);
    setError('');
    setConfirmationText('');

    onClose();
  };

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 flex h-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50">
        <div className="relative h-full w-full max-w-md p-4 md:h-auto">
          <div
            ref={popupBodyEl}
            className="popup-body relative rounded-lg bg-white p-4 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-black">Delete Team</h2>
            <p className="text-gray-500">
              This will permanently delete your team and all associated data.
            </p>

            <p className="-mb-2 mt-3 text-base font-medium text-black">
              Please type "delete" to confirm.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="my-4">
                <input
                  ref={inputEl}
                  type="text"
                  name="delete-account"
                  id="delete-account"
                  className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 outline-hidden placeholder:text-gray-400 focus:border-gray-400"
                  placeholder={'Type "delete" to confirm'}
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
                    isLoading || confirmationText.toUpperCase() !== 'DELETE'
                  }
                  className="grow cursor-pointer rounded-lg bg-red-500 py-2 text-white disabled:opacity-40"
                >
                  {isLoading ? 'Please wait ..' : 'Confirm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
