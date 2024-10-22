import { useState } from 'react';
import { Circle, CircleCheck, CircleX } from 'lucide-react';
import { cn } from '../../lib/classname';
import type { LessonFileType } from '../../lib/course';
import { currentLesson } from '../../stores/course';
import { useStore } from '@nanostores/react';

type QuizViewProps = {
  lesson: LessonFileType;
};

export function QuizView(props: QuizViewProps) {
  const { lesson } = props;

  const { frontmatter } = lesson;
  const { questions = [] } = frontmatter;

  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, number | undefined>
  >({});

  const $currentLesson = useStore(currentLesson);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isAllAnswered =
    Object.keys(selectedOptions).length === questions.length;
  const correctAnswerCount = questions.filter((question) => {
    const selectedOptionId = selectedOptions?.[question.id];
    const correctAnswerId = question.options.find(
      (option) => option.isCorrectOption,
    )?.id;

    return selectedOptionId === correctAnswerId;
  }).length;

  return (
    <div className="relative h-full">
      <div className="absolute inset-0 overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
        <div className="mx-auto max-w-xl p-4 py-10">
          <h3 className="mb-10 text-lg font-semibold">
            {lesson.frontmatter.title}
          </h3>

          <div className="flex flex-col gap-3">
            {questions.map((question) => {
              return (
                <QuizItem
                  key={question.id}
                  id={question.id}
                  title={question.title}
                  disabled={isSubmitted}
                  options={question.options.map((option) => {
                    const selectedOptionId = selectedOptions?.[question.id];

                    let optionStatus: QuizOptionStatus = 'default';
                    if (option.isCorrectOption && isSubmitted) {
                      optionStatus = 'correct';
                    } else if (selectedOptionId === option.id) {
                      optionStatus = isSubmitted ? 'wrong' : 'selected';
                    }

                    return {
                      ...option,
                      status: optionStatus,
                    };
                  })}
                  onOptionSelectChange={(id, optionId) => {
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [id]: optionId,
                    }));
                  }}
                  selectedOptionId={selectedOptions?.[question.id]}
                />
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-end">
            <button
              className="rounded-xl border border-zinc-700 bg-zinc-800 p-2 px-4 text-sm font-medium text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitted || !isAllAnswered}
              onClick={() => {
                setIsSubmitted(true);
                if (!$currentLesson) {
                  console.error('FIX: update current lesson');
                  return;
                }

                currentLesson.set({
                  ...$currentLesson,
                  quizStatus: 'correct',
                });
              }}
            >
              Submit my Answers
            </button>
          </div>

          {isSubmitted && (
            <div className="mt-8 flex items-center justify-between gap-2 rounded-xl border border-zinc-800 p-4">
              <span>
                You got {correctAnswerCount} out of {questions.length} questions
                right
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type QuizItemProps = {
  id: number;
  title: string;
  options: QuizOptionProps[];

  disabled?: boolean;
  selectedOptionId?: number;
  onOptionSelectChange?: (id: number, optionId: number) => void;
};

export function QuizItem(props: QuizItemProps) {
  const { id, title, options, onOptionSelectChange, disabled } = props;

  return (
    <div className="rounded-2xl bg-zinc-800 p-4">
      <h3 className="mx-2 text-balance text-lg font-medium">{title}</h3>

      <div className="mt-4 flex flex-col gap-1">
        {options.map((option, index) => {
          return (
            <QuizOption
              key={index}
              id={option.id}
              text={option.text}
              status={option.status}
              onSelect={() => onOptionSelectChange?.(id, option.id)}
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
  );
}

type QuizOptionStatus = 'selected' | 'wrong' | 'correct' | 'default';

type QuizOptionProps = {
  id: number;
  text: string;
  isCorrectOption?: boolean;
  status?: QuizOptionStatus;

  disabled?: boolean;
  onSelect?: () => void;
};

export function QuizOption(props: QuizOptionProps) {
  const { text, status = 'default', onSelect, disabled } = props;

  return (
    <button
      onClick={onSelect}
      className={cn(
        'flex items-start gap-2 rounded-xl p-2 text-sm disabled:cursor-not-allowed',
        status === 'selected' && 'ring-1 ring-zinc-500',
        status === 'wrong' && 'text-red-500 ring-1 ring-red-500',
        status === 'correct' && 'text-green-500 ring-1 ring-green-500',
        status === 'default' && 'hover:bg-zinc-700',
      )}
      disabled={disabled}
    >
      <span className="mt-0.5">
        {status === 'wrong' && <CircleX className="size-4" />}
        {status === 'correct' && <CircleCheck className="size-4" />}
        {(status === 'selected' || status === 'default') && (
          <Circle className="size-4" />
        )}
      </span>
      <p>{text}</p>
    </button>
  );
}
