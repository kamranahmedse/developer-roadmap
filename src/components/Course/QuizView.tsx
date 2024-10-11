import { useState } from 'react';
import { CourseSidebar } from './CourseSidebar';
import { CourseLayout } from './CourseLayout';
import { Circle, CircleCheck, CircleX } from 'lucide-react';
import { cn } from '../../lib/classname';

const questions = [
  {
    id: 1,
    title:
      'Which of the following SQL clauses is used to filter results after the GROUP BY clause?',
    options: [
      { id: 1, text: 'WHERE' },
      { id: 2, text: 'HAVING', isCorrectOption: true },
      { id: 3, text: 'GROUP BY' },
      { id: 4, text: 'ORDER BY' },
    ],
  },
  {
    id: 2,
    title:
      'Which SQL function is used to return the first non-null expression?',
    options: [
      { id: 1, text: 'COALESCE', isCorrectOption: true },
      { id: 2, text: 'IFNULL' },
      { id: 3, text: 'NULLIF' },
      { id: 4, text: 'NVL' },
    ],
  },
  {
    id: 3,
    title: 'What is the purpose of an SQL CTE (Common Table Expression)?',
    options: [
      {
        id: 1,
        text: 'To create temporary tables that last for the duration of a query',
        isCorrectOption: true,
      },
      { id: 2, text: 'To define reusable views' },
      { id: 3, text: 'To encapsulate subqueries' },
      { id: 4, text: 'To optimize the execution of queries' },
    ],
  },
  {
    id: 4,
    title:
      'In an SQL window function, which clause defines the subset of rows to apply the function on?',
    options: [
      { id: 1, text: 'ORDER BY' },
      { id: 2, text: 'PARTITION BY', isCorrectOption: true },
      { id: 3, text: 'GROUP BY' },
      { id: 4, text: 'DISTINCT' },
    ],
  },
  {
    id: 5,
    title:
      'Which SQL join returns all rows when there is a match in either of the tables?',
    options: [
      { id: 1, text: 'INNER JOIN' },
      { id: 2, text: 'LEFT JOIN' },
      { id: 3, text: 'RIGHT JOIN' },
      { id: 4, text: 'FULL OUTER JOIN', isCorrectOption: true },
    ],
  },
];

export function QuizView() {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, number | undefined>
  >({});

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
    <CourseLayout>
      <CourseSidebar />

      <div className="relative h-full">
        <div className="absolute inset-0 overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
          <div className="mx-auto max-w-xl p-4 py-10">
            <h3 className="mb-10 text-lg font-semibold">
              SQL Quiz: Intermediate
            </h3>

            <div className="flex flex-col gap-3">
              {questions.map((question) => {
                return (
                  <QuizItem
                    key={question.id}
                    id={question.id}
                    title={question.title}
                    disabled={status === 'submitted'}
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
                }}
              >
                Submit my Answers
              </button>
            </div>

            {isSubmitted && (
              <div className="mt-8 flex items-center justify-between gap-2 rounded-xl border border-zinc-800 p-4">
                <span>
                  You got {correctAnswerCount} out of {questions.length}{' '}
                  questions right
                </span>

                <a className="disabled:cusror-not-allowed rounded-xl border border-zinc-700 bg-zinc-800 p-2 px-4 text-sm font-medium text-white focus:outline-none">
                  Move to Next Lesson
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </CourseLayout>
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
