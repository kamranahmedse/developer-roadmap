import { type FormEvent, useEffect, useRef, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { useTeamId } from '../../hooks/use-team-id';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useKeydown } from '../../hooks/use-keydown';
import { httpPost } from '../../lib/http';
import { CheckIcon } from '../ReactIcons/CheckIcon';

type SubmitFeedbackPopupProps = {
  onClose: () => void;
};

export function SubmitFeedbackPopup(props: SubmitFeedbackPopupProps) {
  const { onClose } = props;

  const popupBodyEl = useRef<HTMLDivElement>(null);
  const inputEl = useRef<HTMLTextAreaElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
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

    const { response, error } = await httpPost<{ status: 'ok' }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-submit-team-feedback/${teamId}`,
      {
        feedback: feedbackText,
      }
    );

    if (error || !response) {
      setIsLoading(false);
      setError(error?.message || 'Something went wrong');
      return;
    }

    setIsSuccess(true);
  };

  const handleClosePopup = () => {
    setIsLoading(false);
    setError('');
    setFeedbackText('');

    onClose();
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50">
      <div className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div
          ref={popupBodyEl}
          className="popup-body relative rounded-lg bg-white p-4 shadow-sm"
        >
          {!isSuccess && (
            <>
              <h2 className="mb-1 text-xl font-semibold text-black">
                Enter your feedback
              </h2>
              <p className={'text-sm text-gray-500'}>
                Help us improve your experience.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="my-4">
                  <textarea
                    ref={inputEl}
                    name="submit-feedback"
                    id="submit-feedback"
                    className="mt-2 block min-h-[150px] w-full resize-none rounded-md border border-gray-300 px-3 py-2 outline-hidden placeholder:text-gray-400"
                    placeholder="Enter your feedback"
                    required
                    autoFocus
                    value={feedbackText}
                    onInput={(e) =>
                      setFeedbackText((e.target as HTMLInputElement).value)
                    }
                  />
                  {error && (
                    <p className="mt-2 rounded-md bg-red-100 p-2 text-red-700">
                      {error}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={handleClosePopup}
                    className="grow cursor-pointer rounded-md bg-gray-200 py-2 text-center"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="grow cursor-pointer rounded-md bg-black py-2 text-white disabled:opacity-40"
                  >
                    {isLoading ? 'Please wait ..' : 'Send'}
                  </button>
                </div>
              </form>
            </>
          )}

          {isSuccess && (
            <div className="flex w-full flex-col items-center">
              <CheckIcon additionalClasses="w-14 h-14 text-green-500 mt-4" />
              <h1 className="mt-4 text-xl font-semibold text-black sm:text-2xl">
                Feedback Submitted
              </h1>
              <p className="text-center text-sm text-gray-500 sm:text-base">
                Thank you for submitting your feedback.
              </p>
              <button
                type="button"
                onClick={handleClosePopup}
                className="mt-4 w-full grow cursor-pointer rounded-lg bg-black py-2 text-center text-white disabled:opacity-40"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
