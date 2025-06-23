import { useRef, useState } from 'react';
import { QuestionsProgress } from './QuestionsProgress';
import { CheckCircle, SkipForward, Sparkles } from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { isLoggedIn } from '../../lib/jwt';
import type { QuestionType } from '../../lib/question-group';
import { QuestionFinished } from './QuestionFinished';
import { Confetti } from '../Confetti';

type UserQuestionProgress = {
  know: string[];
  dontKnow: string[];
  skip: string[];
};

export type QuestionProgressType = keyof UserQuestionProgress;

type QuestionsListProps = {
  groupId: string;
  questions: QuestionType[];
};

export function QuestionsList(props: QuestionsListProps) {
  const { questions } = props;

  const [showConfetti, setShowConfetti] = useState(false);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);

  const [userProgress, setUserProgress] = useState<UserQuestionProgress>({
    know: [],
    dontKnow: [],
    skip: [],
  });
  const containerRef = useRef<HTMLDivElement>(null);

  async function resetProgress() {
    setCurrQuestionIndex(0);
    setUserProgress({
      know: [],
      dontKnow: [],
      skip: [],
    });
  }

  function updateQuestionStatus(
    status: QuestionProgressType,
    questionId: string,
  ) {
    let newProgress = userProgress || { know: [], dontKnow: [], skip: [] };
    if (status === 'know') {
      newProgress.know.push(questionId);
    } else if (status == 'dontKnow') {
      newProgress.dontKnow.push(questionId);
    } else if (status == 'skip') {
      newProgress.skip.push(questionId);
    }

    const nextQuestionIndex = currQuestionIndex + 1;
    setUserProgress(newProgress);
    if (!nextQuestionIndex || !questions[nextQuestionIndex]) {
      setShowConfetti(true);
    }

    setCurrQuestionIndex(nextQuestionIndex);
  }

  const knowCount = userProgress?.know.length || 0;
  const dontKnowCount = userProgress?.dontKnow.length || 0;
  const skipCount = userProgress?.skip.length || 0;
  const hasProgress = knowCount > 0 || dontKnowCount > 0 || skipCount > 0;

  const currQuestion = questions[currQuestionIndex];
  const hasFinished = hasProgress && currQuestionIndex === -1;

  return (
    <div className="mb-0 gap-3 text-center sm:mb-40">
      <QuestionsProgress
        knowCount={knowCount}
        didNotKnowCount={dontKnowCount}
        skippedCount={skipCount}
        totalCount={questions?.length}
        onResetClick={() => {
          resetProgress().finally(() => null);
        }}
        onNextClick={() => {
          if (
            currQuestionIndex !== -1 &&
            currQuestionIndex < questions.length - 1
          ) {
            updateQuestionStatus('skip', currQuestion.id);
          }
        }}
        onPrevClick={() => {
          if (currQuestionIndex > 0) {
            const prevQuestion = questions[currQuestionIndex - 1];
            // remove last question from the progress of the user
            const tempUserProgress = {
              know:
                userProgress?.know.filter((id) => id !== prevQuestion.id) || [],
              dontKnow:
                userProgress?.dontKnow.filter((id) => id !== prevQuestion.id) ||
                [],
              skip:
                userProgress?.skip.filter((id) => id !== prevQuestion.id) || [],
            };

            setUserProgress(tempUserProgress);
            setCurrQuestionIndex(currQuestionIndex - 1);
          }
        }}
      />

      {showConfetti && containerRef.current && (
        <Confetti
          pieces={100}
          element={containerRef.current}
          onDone={() => {
            setShowConfetti(false);
          }}
        />
      )}

      <div
        ref={containerRef}
        className="relative mb-4 flex min-h-[250px] w-full overflow-hidden rounded-lg border border-gray-300 bg-white sm:min-h-[400px]"
      >
        {hasFinished && (
          <QuestionFinished
            totalCount={questions?.length || 0}
            knowCount={knowCount}
            didNotKnowCount={dontKnowCount}
            skippedCount={skipCount}
            onReset={() => {
              resetProgress().finally(() => null);
            }}
          />
        )}
        {currQuestion && <QuestionCard question={currQuestion} />}
      </div>

      <div
        className={`flex flex-col gap-1 transition-opacity duration-300 sm:flex-row sm:gap-3 ${
          hasFinished ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <button
          disabled={!currQuestion}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            updateQuestionStatus('know', currQuestion.id);
          }}
          className="flex flex-1 items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm text-black transition-colors hover:border-black hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-50 sm:rounded-lg sm:px-4 sm:py-3 sm:text-base"
        >
          <CheckCircle className="mr-1 h-4 text-current" />
          Already Know that
        </button>
        <button
          onClick={() => {
            updateQuestionStatus('dontKnow', currQuestion.id);
          }}
          disabled={!currQuestion}
          className="flex flex-1 items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm text-black transition-colors hover:border-black hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-50 sm:rounded-lg sm:px-4 sm:py-3 sm:text-base"
        >
          <Sparkles className="mr-1 h-4 text-current" />
          Didn't Know that
        </button>
        <button
          onClick={() => {
            updateQuestionStatus('skip', currQuestion.id);
          }}
          disabled={!currQuestion}
          data-next-question="skip"
          className="flex flex-1 items-center rounded-md border border-red-600 px-2 py-2 text-sm text-red-600 hover:bg-red-600 hover:text-white disabled:pointer-events-none disabled:opacity-50 sm:rounded-lg sm:px-4 sm:py-3 sm:text-base"
        >
          <SkipForward className="mr-1 h-4" />
          Skip Question
        </button>
      </div>
    </div>
  );
}
