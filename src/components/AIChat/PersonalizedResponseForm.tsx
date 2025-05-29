import { Loader2Icon } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { memo, useId, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Modal } from '../Modal';
import { cn } from '../../lib/classname';
import { SelectNative } from '../SelectNative';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { httpPost } from '../../lib/query-http';
import { userPersonaOptions } from '../../queries/user-persona';
import { useToast } from '../../hooks/use-toast';

export type ChatPreferencesFormData = {
  expertise: string;
  goal: string;
  about: string;
  specialInstructions?: string;
};

type PersonalizedResponseFormProps = {
  defaultValues?: ChatPreferencesFormData;
  onClose: () => void;
};

export const PersonalizedResponseForm = memo(
  (props: PersonalizedResponseFormProps) => {
    const { defaultValues, onClose } = props;

    const toast = useToast();

    const [expertise, setExpertise] = useState(defaultValues?.expertise ?? '');

    const [hasInitialGoal, setHasInitialGoal] = useState(!!defaultValues?.goal);
    const [goal, setGoal] = useState(defaultValues?.goal ?? '');
    const [about, setAbout] = useState(defaultValues?.about ?? '');
    const [specialInstructions, setSpecialInstructions] = useState(
      defaultValues?.specialInstructions ?? '',
    );

    const expertiseFieldId = useId();
    const goalFieldId = useId();
    const aboutFieldId = useId();
    const specialInstructionsFieldId = useId();

    const goalRef = useRef<HTMLTextAreaElement>(null);

    const { mutate: setChatPreferences, isPending } = useMutation(
      {
        mutationFn: (data: ChatPreferencesFormData) => {
          return httpPost('/v1-set-chat-preferences', data);
        },
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries(userPersonaOptions());
        },
        onError: (error) => {
          toast.error(error?.message ?? 'Something went wrong');
        },
      },
      queryClient,
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setChatPreferences({
        expertise,
        goal,
        about,
        specialInstructions,
      });
    };

    const hasFormCompleted = !!expertise && !!goal && !!about;

    return (
      <Modal onClose={onClose}>
        <div className="p-4">
          <form onSubmit={handleSubmit} className={cn('space-y-3')}>
            <div className="flex flex-col gap-3">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor={expertiseFieldId}
              >
                Rate your Experience
              </label>
              <SelectNative
                id={expertiseFieldId}
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                className="h-[40px] border-gray-300 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
              >
                <option value="" selected hidden>
                  Select your expertise
                </option>
                {[
                  'No experience (just starting out)',
                  'Beginner (less than 1 year of experience)',
                  'Intermediate (1-3 years of experience)',
                  'Expert (3-5 years of experience)',
                  'Master (5+ years of experience)',
                ].map((expertise) => (
                  <option key={expertise} value={expertise}>
                    {expertise}
                  </option>
                ))}
              </SelectNative>
            </div>
            <div className="flex flex-col gap-3">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor={goalFieldId}
              >
                What is your goal?{' '}
                {hasInitialGoal &&
                  !defaultValues?.goal &&
                  `Tell us more about yourself`}
              </label>

              {!hasInitialGoal && (
                <div className="flex flex-row flex-wrap gap-2">
                  {[
                    'Finding a job',
                    'Learning for fun',
                    'Building a side project',
                    'Switching careers',
                    'Getting a promotion',
                    'Filling knowledge gaps',
                    'Other (tell us more)',
                  ].map((goalTemplate) => (
                    <button
                      key={goalTemplate}
                      className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-100"
                      onClick={() => {
                        if (goalTemplate !== 'Other (tell us more)') {
                          setGoal(`${goalTemplate}.`);
                        }

                        setHasInitialGoal(true);
                        flushSync(() => {
                          goalRef.current?.focus();
                        });
                      }}
                      type="button"
                    >
                      {goalTemplate}
                    </button>
                  ))}
                </div>
              )}

              <textarea
                ref={goalRef}
                id={goalFieldId}
                className={cn(
                  'block min-h-24 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500',
                  !hasInitialGoal && 'hidden',
                )}
                placeholder={`e.g. need to find a job as soon as possible`}
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor={aboutFieldId}
              >
                Tell us more about yourself
              </label>

              <input
                id={aboutFieldId}
                className="block h-[40px] w-full resize-none rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                placeholder="e.g. I'm a software engineer with 5 years of experience"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor={specialInstructionsFieldId}
              >
                Special Instructions
              </label>

              <input
                id={specialInstructionsFieldId}
                className="block h-[40px] w-full resize-none rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                placeholder="e.g. Prefer concise responses with code examples"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </div>

            <button
              disabled={!hasFormCompleted || isPending}
              type="submit"
              className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-black px-6 py-2 text-sm text-white transition-all hover:bg-gray-900 disabled:pointer-events-none disabled:opacity-50"
            >
              {isPending ? (
                <Loader2Icon className="size-4 animate-spin stroke-[2.5]" />
              ) : (
                <>
                  <MessageCircle className="size-4" />
                  {defaultValues ? 'Update Preferences' : 'Set Preferences'}
                </>
              )}
            </button>
          </form>
        </div>
      </Modal>
    );
  },
);
