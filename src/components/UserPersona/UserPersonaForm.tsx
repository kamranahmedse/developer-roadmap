import { useId, useRef, useState } from 'react';
import { SelectNative } from '../SelectNative';
import { Loader2Icon, MessageCircle } from 'lucide-react';
import { cn } from '../../lib/classname';

export type UserPersonaFormData = {
  expertise: string;
  goal: string;
  commit: string;
};

type UserPersonaFormProps = {
  roadmapTitle: string;
  defaultValues?: UserPersonaFormData;
  onSubmit: (data: UserPersonaFormData) => void;

  className?: string;

  isLoading?: boolean;
};

export function UserPersonaForm(props: UserPersonaFormProps) {
  const {
    roadmapTitle,
    defaultValues,
    className = '',
    onSubmit,
    isLoading,
  } = props;
  const [expertise, setExpertise] = useState(
    defaultValues?.expertise ?? 'no-experience',
  );

  const [hasInitialGoal, setHasInitialGoal] = useState(!!defaultValues?.goal);
  const [goal, setGoal] = useState(defaultValues?.goal ?? '');
  const [commit, setCommit] = useState(defaultValues?.commit ?? '');

  const expertiseFieldId = useId();
  const goalFieldId = useId();
  const commitFieldId = useId();

  const goalRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ expertise, goal, commit });
  };

  const hasFormCompleted = !!expertise && !!goal && !!commit;

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-8', className)}>
      <div className="flex flex-col gap-3">
        <label
          className="text-sm font-medium text-gray-700"
          htmlFor={expertiseFieldId}
        >
          Rate your expertise in {roadmapTitle}:
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
                className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600 transition-all hover:border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                onClick={() => {
                  if (goalTemplate !== 'Other (tell us more)') {
                    setGoal(`${goalTemplate}.`);
                  }

                  setHasInitialGoal(true);
                  setTimeout(() => {
                    goalRef.current?.focus();
                  }, 0);
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
          htmlFor={commitFieldId}
        >
          How many hours per week can you commit to learning?
        </label>

        <input
          id={commitFieldId}
          className="block h-[40px] w-full resize-none rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          placeholder="e.g. 10 hours per week"
          value={commit}
          onChange={(e) => setCommit(e.target.value)}
        />
      </div>

      <button
        disabled={isLoading || !hasFormCompleted}
        type="submit"
        className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-black px-6 py-2 text-sm text-white transition-all hover:bg-gray-900 disabled:pointer-events-none disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2Icon className="size-4 animate-spin stroke-[2.5]" />
        ) : (
          <>
            {defaultValues ? (
              <>
                <MessageCircle className="size-4" />
                Update Information
              </>
            ) : (
              <>
                <MessageCircle className="size-4" />
                Start Chatting
              </>
            )}
          </>
        )}
      </button>
    </form>
  );
}
