import { useId, useState } from 'react';
import { SelectNative } from '../SelectNative';
import AutogrowTextarea from 'react-textarea-autosize';
import { Loader2Icon, PlayIcon } from 'lucide-react';

export type UserPersonaFormData = {
  expertise: string;
  goal: string;
  commit: string;
};

type UserPersonaFormProps = {
  roadmapTitle: string;
  defaultValues?: UserPersonaFormData;
  onSubmit: (data: UserPersonaFormData) => void;

  isLoading?: boolean;
};

export function UserPersonaForm(props: UserPersonaFormProps) {
  const { roadmapTitle, defaultValues, onSubmit, isLoading } = props;
  const [expertise, setExpertise] = useState(
    defaultValues?.expertise ?? 'no-experience',
  );
  const [goal, setGoal] = useState(defaultValues?.goal ?? '');
  const [commit, setCommit] = useState(defaultValues?.commit ?? '');

  const expertiseFieldId = useId();
  const goalFieldId = useId();
  const commitFieldId = useId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ expertise, goal, commit });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2.5">
        <label
          className="text-sm leading-none text-gray-500"
          htmlFor={expertiseFieldId}
        >
          Rate your expertise in {roadmapTitle}:
        </label>
        <SelectNative
          id={expertiseFieldId}
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
        >
          <option value="" selected hidden>
            Select your expertise
          </option>
          <option value="no-experience">No experience</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
          <option value="master">Master</option>
        </SelectNative>
      </div>
      <div className="mt-4 flex flex-col gap-2.5">
        <label
          className="text-sm leading-none text-gray-500"
          htmlFor={goalFieldId}
        >
          Define your goal:
        </label>

        <AutogrowTextarea
          id={goalFieldId}
          className="block min-h-20 w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-500 focus:border-gray-500"
          placeholder={`e.g. I am a beginner in ${roadmapTitle} and need to find a job as soon as possible`}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        <label
          className="text-sm leading-none text-gray-500"
          htmlFor={commitFieldId}
        >
          How many hours per week can you commit to learning?
        </label>

        <AutogrowTextarea
          id={commitFieldId}
          className="block min-h-20 w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-500 focus:border-gray-500"
          placeholder="e.g. 10 hours per week"
          value={commit}
          onChange={(e) => setCommit(e.target.value)}
        />
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-sm text-white"
      >
        {isLoading ? (
          <Loader2Icon className="size-4 animate-spin stroke-[2.5]" />
        ) : (
          <>
            {defaultValues ? (
              <>
                <PlayIcon className="size-4" />
                Update Persona
              </>
            ) : (
              <>
                <PlayIcon className="size-4" />
                Start Chatting
              </>
            )}
          </>
        )}
      </button>
    </form>
  );
}
