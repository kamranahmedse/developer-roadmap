import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleIcon,
  CircleXIcon,
  FlaskConicalIcon,
  FrownIcon,
  Loader2Icon,
} from 'lucide-react';
import { cn } from '../../lib/classname';
import {
  generateAiCourseLessonQuestions,
  readStream,
  type Question,
} from '../../lib/ai';
import { useCallback, useMemo, useState } from 'react';
import { isLoggedIn, removeAuthToken } from '../../lib/jwt';

type TestMyKnowledgeActionProps = {
  courseSlug: string;
  activeModuleIndex: number;
  activeLessonIndex: number;
};

export function TestMyKnowledgeAction(props: TestMyKnowledgeActionProps) {
  const { courseSlug, activeModuleIndex, activeLessonIndex } = props;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isKnowledgeTestOpen, setIsKnowledgeTestOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const abortController = useMemo(
    () => new AbortController(),
    [activeModuleIndex, activeLessonIndex],
  );

  const generateAiLessonQuestions = async () => {
    setIsLoading(true);
    setError('');

    if (!isLoggedIn()) {
      setIsLoading(false);
      setError('Please login to generate course content');
      return;
    }

    const response = await fetch(
      `${import.meta.env.PUBLIC_API_URL}/v1-generate-ai-course-lesson-question/${courseSlug}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: abortController.signal,
        credentials: 'include',
        body: JSON.stringify({
          moduleIndex: activeModuleIndex,
          lessonIndex: activeLessonIndex,
        }),
      },
    );

    if (!response.ok) {
      const data = await response.json();

      setError(data?.message || 'Something went wrong');
      setIsLoading(false);

      // Logout user if token is invalid
      if (data.status === 401) {
        removeAuthToken();
        window.location.reload();
      }
      return;
    }

    if (!response.body) {
      setIsLoading(false);
      setError('No response body received');
      return;
    }

    try {
      const reader = response.body.getReader();
      setIsLoading(false);
      setIsGenerating(true);
      await readStream(reader, {
        onStream: async (result) => {
          if (abortController.signal.aborted) {
            return;
          }

          const questions = generateAiCourseLessonQuestions(result);
          setQuestions(questions);
        },
        onStreamEnd: async (result) => {
          if (abortController.signal.aborted) {
            return;
          }

          const questions = generateAiCourseLessonQuestions(result);
          setQuestions(questions);
          setIsGenerating(false);
        },
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      setIsLoading(false);
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-10 flex flex-col gap-4">
      {!isKnowledgeTestOpen && (
        <div className="flex items-center gap-2">
          <button
            className={cn(
              'group flex flex-shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all hover:border-black hover:bg-gray-50 hover:text-gray-900',
              {
                'bg-gray-100 text-gray-900': isKnowledgeTestOpen,
              },
            )}
            onClick={() => {
              if (isGenerating || isLoading) {
                return;
              }

              if (!isKnowledgeTestOpen) {
                setIsKnowledgeTestOpen(true);
                generateAiLessonQuestions();
              } else {
                setIsKnowledgeTestOpen(false);
              }
            }}
          >
            <FlaskConicalIcon className="size-5 shrink-0 transition-transform group-hover:scale-110" />
            <span>Test My Knowledge</span>
          </button>
        </div>
      )}

      {error && (
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-xl bg-red-50/80 p-6 text-red-500">
          <FrownIcon className="size-12 shrink-0" />
          <span className="text-center font-semibold">{error}</span>
        </div>
      )}

      {!error && isKnowledgeTestOpen && (
        <ListQuestions
          isLoading={isLoading}
          isGenerating={isGenerating}
          questions={questions}
        />
      )}
    </div>
  );
}

type ListQuestionsProps = {
  isLoading: boolean;
  isGenerating: boolean;
  questions: Question[];
};

export function ListQuestions(props: ListQuestionsProps) {
  const { isLoading, isGenerating, questions } = props;

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string[]>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const activeQuestion = questions[activeQuestionIndex];

  const handleOptionSelectChange = function (
    questionId: string,
    optionId: string,
  ) {
    setSelectedAnswers((prev) => {
      const newAnswers = { ...prev };

      const canMultiSelect =
        activeQuestion.options.filter((option) => option.isCorrect).length > 1;
      const isAlreadySelected = selectedAnswers[questionId]?.includes(optionId);

      if (isAlreadySelected) {
        newAnswers[questionId] = newAnswers[questionId].filter(
          (id) => id !== optionId,
        );
      } else {
        if (canMultiSelect) {
          newAnswers[questionId] = [
            ...(newAnswers[questionId] || []),
            optionId,
          ];
        } else {
          newAnswers[questionId] = [optionId];
        }
      }

      return newAnswers;
    });
  };

  const handleNext = useCallback(() => {
    const isLastQuestion = activeQuestionIndex === questions.length - 1;
    if (isLastQuestion) {
      setSubmitted(true);
      setActiveQuestionIndex(0);
      return;
    }

    setActiveQuestionIndex(activeQuestionIndex + 1);
  }, [activeQuestionIndex, questions, submitted]);

  const handlePrevious = useCallback(() => {
    setActiveQuestionIndex((prev) => Math.max(prev - 1, 0));
  }, [questions]);

  const handleTryAgain = useCallback(() => {
    setSelectedAnswers({});
    setSubmitted(false);
    setActiveQuestionIndex(0);
  }, []);

  const correctAnswerCount = useMemo(() => {
    if (!submitted) {
      return 0;
    }

    return questions.filter((question) => {
      const selectedOptionIds = selectedAnswers[question.id];
      const correctAnswerIds = question.options
        .filter((option) => option.isCorrect)
        .map((option) => option.id);

      return (
        correctAnswerIds.length === selectedOptionIds?.length &&
        correctAnswerIds.every((correctAnswerId) =>
          selectedOptionIds?.includes(correctAnswerId),
        )
      );
    }).length;
  }, [questions, selectedAnswers, submitted]);

  if (isLoading || !questions.length) {
    return (
      <div className="flex h-[306px] w-full items-center justify-center rounded-lg border p-5 text-black">
        <Loader2Icon className="size-8 animate-spin stroke-[2.5] text-gray-400" />
      </div>
    );
  }

  return (
    <QuizItem
      counter={activeQuestionIndex + 1}
      totalQuestions={questions.length}
      correctAnswerCount={correctAnswerCount}
      isLoading={isGenerating}
      question={activeQuestion}
      onOptionSelectChange={handleOptionSelectChange}
      selectedOptionIds={selectedAnswers[activeQuestion.id]}
      submitted={submitted}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onTryAgain={handleTryAgain}
    />
  );
}

type QuizItemProps = {
  totalQuestions: number;
  correctAnswerCount: number;
  counter: number;

  question: Question;
  onOptionSelectChange?: (id: string, optionId: string) => void;
  selectedOptionIds?: string[];
  submitted?: boolean;

  isLoading: boolean;

  onNext?: () => void;
  onPrevious?: () => void;
  onTryAgain?: () => void;
};

export function QuizItem(props: QuizItemProps) {
  const {
    totalQuestions,
    correctAnswerCount,
    counter,
    isLoading,
    question,
    onOptionSelectChange,
    selectedOptionIds,
    submitted = false,
    onNext,
    onPrevious,
    onTryAgain,
  } = props;
  const { id: questionId, title, options } = question;

  const canMultiSelect =
    options.filter((option) => option.isCorrect).length > 1;

  const correctAnswerIds = options
    .filter((option) => option.isCorrect)
    .map((option) => option.id);

  const isAllCorrectAnswer =
    correctAnswerIds.length === selectedOptionIds?.length &&
    correctAnswerIds.every((correctAnswerId) =>
      selectedOptionIds?.includes(correctAnswerId),
    );
  const hasWrongAnswer = submitted && !isAllCorrectAnswer;
  const hasCorrectAnswer = submitted && isAllCorrectAnswer;

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-xl border text-black transition-all',
        {
          'border-red-400': hasWrongAnswer,
          'border-green-500': hasCorrectAnswer,
        },
      )}
    >
      <div className="flex items-center gap-4 rounded-t-xl border-b bg-gradient-to-r from-gray-50 to-white p-5">
        <span className="text-sm font-medium text-gray-700">
          Question {counter} of {totalQuestions}
        </span>
        <div className="h-2 flex-1 rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-black transition-all duration-300"
            style={{ width: `${(counter / totalQuestions) * 100}%` }}
          />
        </div>
        {submitted && (
          <span
            className={cn('rounded-full px-3 py-1 text-xs font-medium', {
              'bg-red-500 text-white': hasWrongAnswer,
              'bg-green-500 text-white': hasCorrectAnswer,
            })}
          >
            {hasWrongAnswer ? 'Wrong' : 'Correct'}
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="mx-2 text-balance text-xl font-medium">
          {title} {canMultiSelect ? '(Select Multiple)' : ''}
        </h3>

        <div className="mt-6 flex flex-col gap-0.5">
          {options.map((option, index) => {
            let status: QuizOptionStatus = 'default';
            if (submitted) {
              if (option.isCorrect) {
                status = 'correct';
              } else if (selectedOptionIds?.includes(option.id)) {
                status = 'wrong';
              }
            } else {
              if (selectedOptionIds?.includes(option.id)) {
                status = 'selected';
              }
            }

            return (
              <QuizOption
                key={index}
                title={option.title}
                status={status}
                onSelect={() => onOptionSelectChange?.(questionId, option.id)}
                submitted={submitted}
              />
            );
          })}
        </div>

        <div className="mt-6 flex w-full items-center justify-between px-2">
          <div className="text-gray-600">
            {submitted ? (
              <span className="flex items-center gap-2">
                You got {correctAnswerCount} out of {totalQuestions} correct.
                <button
                  className="relative rounded-md bg-black px-3 py-1 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-black/80"
                  onClick={onTryAgain}
                >
                  Try again
                </button>
              </span>
            ) : (
              <span>Answer all questions to submit</span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              className="group flex h-10 items-center justify-center gap-1 rounded-lg border border-gray-200 p-2 pr-4 text-sm text-black transition-all hover:border-black hover:bg-black hover:text-white focus:outline-none max-sm:pr-2"
              onClick={onPrevious}
            >
              <ChevronLeftIcon className="size-5 shrink-0 transition-transform group-hover:-translate-x-0.5" />
              <span className="max-sm:hidden">Previous</span>
            </button>
            <button
              className="group flex h-10 items-center justify-center gap-1 rounded-lg border border-gray-200 p-2 pl-4 text-sm text-black transition-all hover:border-black hover:bg-black hover:text-white focus:outline-none max-sm:pl-2"
              onClick={onNext}
            >
              <span className="max-sm:hidden">Next</span>
              <ChevronRightIcon className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="absolute bg-white right-3 top-3 flex h-8 items-center justify-center gap-1 rounded-lg border border-gray-200 p-2 text-sm text-black hover:bg-black hover:text-white focus:outline-none">
          <Loader2Icon className="size-5 animate-spin text-gray-400" />
        </div>
      )}
    </div>
  );
}

type QuizOptionStatus = 'default' | 'selected' | 'wrong' | 'correct';

type QuizOptionProps = {
  title: string;
  status?: QuizOptionStatus;
  onSelect: () => void;
  submitted?: boolean;
};

export function QuizOption(props: QuizOptionProps) {
  const { title, status = 'default', onSelect, submitted = false } = props;

  return (
    <button
      onClick={onSelect}
      className={cn(
        'group flex items-start gap-3 rounded-xl p-4 text-base transition-all disabled:cursor-not-allowed',
        status === 'selected' && 'bg-black text-white',
        status === 'wrong' && submitted && 'bg-red-100 text-red-800',
        status === 'correct' && submitted && 'bg-green-100 text-green-800',
        status === 'default' && 'bg-white hover:bg-gray-50',
        submitted && status !== 'correct' && 'opacity-40',
      )}
      disabled={submitted}
    >
      <span className="mt-[2px]">
        {status === 'wrong' && submitted && <CircleXIcon className="size-5" />}
        {status === 'correct' && submitted && (
          <CircleCheckIcon className="size-5" />
        )}

        {(status === 'selected' || status === 'default') && (
          <CircleIcon className="size-5" />
        )}
      </span>
      <p className="text-left">{title}</p>
    </button>
  );
}
