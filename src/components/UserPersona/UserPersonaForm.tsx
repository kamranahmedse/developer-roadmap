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
  const [expertise, setExpertise] = useState(defaultValues?.expertise ?? '');

  const goalOptions = [
    'Finding a job',
    'Learning for fun',
    'Building a side project',
    'Switching careers',
    'Getting a promotion',
    'Filling knowledge gaps',
    'Other',
  ];

  const getInitialGoalSelection = () => {
    if (!defaultValues?.goal) {
      return '';
    }

    // Check if the goal matches any predefined option
    for (const option of goalOptions.slice(0, -1)) {
      // Exclude 'Other'
      if (defaultValues.goal.startsWith(option)) {
        return option;
      }
    }

    return 'Other';
  };

  const [selectedGoal, setSelectedGoal] = useState(getInitialGoalSelection());
  const [goal, setGoal] = useState(defaultValues?.goal ?? '');
  const [commit, setCommit] = useState(defaultValues?.commit ?? '');

  const expertiseFieldId = useId();
  const goalFieldId = useId();
  const goalSelectId = useId();
  const commitFieldId = useId();

  const goalRef = useRef<HTMLTextAreaElement>(null);

  const handleGoalSelectionChange = (value: string) => {
    setSelectedGoal(value);

    if (value === 'Other') {
      setGoal('');
      setTimeout(() => {
        goalRef.current?.focus();
      }, 0);
    } else {
      setGoal(value);
    }
  };

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
          defaultValue={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          className="h-[40px] border-gray-300 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        >
          <option value="">Select your expertise</option>
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
          htmlFor={goalSelectId}
        >
          What is your goal?
        </label>

        <SelectNative
          id={goalSelectId}
          value={selectedGoal}
          onChange={(e) => handleGoalSelectionChange(e.target.value)}
          className="h-[40px] border-gray-300 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        >
          <option value="">Select your goal</option>
          {goalOptions.map((goalOption) => (
            <option key={goalOption} value={goalOption}>
              {goalOption}
            </option>
          ))}
        </SelectNative>

        {selectedGoal === 'Other' && (
          <textarea
            ref={goalRef}
            id={goalFieldId}
            className="block min-h-24 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            placeholder="e.g. need to find a job as soon as possible"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        )}
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
