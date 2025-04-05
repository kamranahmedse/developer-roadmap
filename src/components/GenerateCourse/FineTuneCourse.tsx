import { useState } from 'react';
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

  return (
    <div className="flex flex-col">
      <label className="border-y bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
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

  setHasFineTuneData: (hasMetadata: boolean) => void;
  setAbout: (about: string) => void;
  setGoal: (goal: string) => void;
  setCustomInstructions: (customInstructions: string) => void;
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
    setHasFineTuneData,
  } = props;

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 transition-all">
      <label
        className={cn(
          'group flex cursor-pointer select-none flex-row items-center gap-2.5 px-4 py-3 text-left text-gray-500 transition-colors hover:bg-gray-100 focus:outline-hidden',
          hasFineTuneData && 'bg-gray-100',
        )}
      >
        <input
          id="fine-tune-checkbox"
          type="checkbox"
          className="h-4 w-4 group-hover:fill-current"
          checked={hasFineTuneData}
          onChange={() => {
            setHasFineTuneData(!hasFineTuneData);
          }}
        />
        Tell us more to tailor the course (optional){' '}
        <span className="ml-auto rounded-md bg-gray-400 px-2 py-0.5 text-xs text-white">
          recommended
        </span>
      </label>

      {hasFineTuneData && (
        <div className="mt-0 flex flex-col">
          <Question
            label="Tell us about your self"
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
      )}
    </div>
  );
}
