import { useId } from 'react';
import { cn } from '../../lib/classname';

type QuestionProps = {
  label: string;
  placeholder: string;
  autoFocus?: boolean;
  value: string;
  onChange: (value: string) => void;
};

function Question(props: QuestionProps) {
  const { label, placeholder, value, onChange, autoFocus = false } = props;
  const questionId = useId();

  return (
    <div className="flex flex-col">
      <label
        htmlFor={questionId}
        className="border-y bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <textarea
        id={questionId}
        placeholder={placeholder}
        className="min-h-[80px] w-full resize-none px-4 py-3 text-gray-700 placeholder:text-gray-400 focus:outline-hidden"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
      />
    </div>
  );
}

type FineTuneCourseProps = {
  hasFineTuneData: boolean;
  about: string;
  goal: string;
  customInstructions: string;

  setAbout: (about: string) => void;
  setGoal: (goal: string) => void;
  setCustomInstructions: (customInstructions: string) => void;
  className?: string;
};

export function FineTuneCourse(props: FineTuneCourseProps) {
  const {
    about,
    goal,
    customInstructions,
    hasFineTuneData,
    setAbout,
    setGoal,
    setCustomInstructions,
    className,
  } = props;

  if (!hasFineTuneData) {
    return null;
  }

  return (
    <div className={cn('mt-0 flex flex-col', className)}>
      <Question
        label="Tell us about yourself"
        placeholder="e.g. I am a frontend developer and have good knowledge of HTML, CSS, and JavaScript."
        value={about}
        onChange={setAbout}
        autoFocus={true}
      />
      <Question
        label="What is your goal with this course?"
        placeholder="e.g. I want to be able to build Node.js APIs with Express.js and MongoDB."
        value={goal}
        onChange={setGoal}
      />
      <Question
        label="Custom Instructions (Optional)"
        placeholder="Give additional instructions to the AI as if you were giving them to a friend."
        value={customInstructions}
        onChange={setCustomInstructions}
      />
    </div>
  );
}
