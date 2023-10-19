import { useEffect, useRef, useState } from 'react';
import { QuestionsProgress } from './QuestionsProgress';
import { CheckCircle, SkipForward, Sparkles } from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { QuestionLoader } from './QuestionLoader';
import { isLoggedIn } from '../../lib/jwt';
import type { QuestionType } from '../../lib/question-group';
import { httpGet, httpPut } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
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
  const { questions: unshuffledQuestions, groupId } = props;

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [questions, setQuestions] = useState<QuestionType[]>();
  const [pendingQuestions, setPendingQuestions] = useState<QuestionType[]>([]);

  const [userProgress, setUserProgress] = useState<UserQuestionProgress>();
  const containerRef = useRef<HTMLDivElement>(null);

  async function fetchUserProgress(): Promise<
    UserQuestionProgress | undefined
  > {
    if (!isLoggedIn()) {
      return;
    }

    const { response, error } = await httpGet<UserQuestionProgress>(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-get-user-question-progress/${groupId}`,
    );

    if (error) {
      toast.error(error.message || 'Error fetching user progress');
      return;
    }

    return response;
  }

  async function loadQuestions() {
    const userProgress = await fetchUserProgress();
    setUserProgress(userProgress);

    const knownQuestions = userProgress?.know || [];
    const didNotKnowQuestions = userProgress?.dontKnow || [];
    const skipQuestions = userProgress?.skip || [];

    const pendingQuestions = unshuffledQuestions.filter((question) => {
      return (
        !knownQuestions.includes(question.id) &&
        !didNotKnowQuestions.includes(question.id) &&
        !skipQuestions.includes(question.id)
      );
    });

    // Shuffle and set pending questions
    setPendingQuestions(pendingQuestions.sort(() => Math.random() - 0.5));
    setQuestions(unshuffledQuestions);

    setIsLoading(false);
  }

  async function resetProgress(type: QuestionProgressType | 'reset' = 'reset') {
    let knownQuestions = userProgress?.know || [];
    let didNotKnowQuestions = userProgress?.dontKnow || [];
    let skipQuestions = userProgress?.skip || [];

    if (!isLoggedIn()) {
      if (type === 'know') {
        knownQuestions = [];
      } else if (type === 'dontKnow') {
        didNotKnowQuestions = [];
      } else if (type === 'skip') {
        skipQuestions = [];
      } else if (type === 'reset') {
        knownQuestions = [];
        didNotKnowQuestions = [];
        skipQuestions = [];
      }
    } else {
      setIsLoading(true);

      const { response, error } = await httpPut<UserQuestionProgress>(
        `${
          import.meta.env.PUBLIC_API_URL
        }/v1-reset-question-progress/${groupId}`,
        {
          status: type,
        },
      );

      if (error) {
        toast.error(error.message || 'Error resetting progress');
        return;
      }

      knownQuestions = response?.know || [];
      didNotKnowQuestions = response?.dontKnow || [];
      skipQuestions = response?.skip || [];
    }

    const pendingQuestions = unshuffledQuestions.filter((question) => {
      return (
        !knownQuestions.includes(question.id) &&
        !didNotKnowQuestions.includes(question.id) &&
        !skipQuestions.includes(question.id)
      );
    });

    setUserProgress({
      know: knownQuestions,
      dontKnow: didNotKnowQuestions,
      skip: skipQuestions,
    });

    setPendingQuestions(pendingQuestions.sort(() => Math.random() - 0.5));
    setIsLoading(false);
  }

  async function updateQuestionStatus(
    status: QuestionProgressType,
    questionId: string,
  ) {
    setIsLoading(true);
    let newProgress = userProgress || { know: [], dontKnow: [], skip: [] };

    if (!isLoggedIn()) {
      if (status === 'know') {
        newProgress.know.push(questionId);
      } else if (status == 'dontKnow') {
        newProgress.dontKnow.push(questionId);
      } else if (status == 'skip') {
        newProgress.skip.push(questionId);
      }
    } else {
      const { response, error } = await httpPut<UserQuestionProgress>(
        `${
          import.meta.env.PUBLIC_API_URL
        }/v1-update-question-status/${groupId}`,
        {
          status,
          questionId,
          questionGroupId: groupId,
        },
      );

      if (error || !response) {
        toast.error(error?.message || 'Error marking question status');
        return;
      }

      newProgress = response;
    }

    const updatedQuestionList = pendingQuestions.filter(
      (q) => q.id !== questionId,
    );

    setUserProgress(newProgress);
    setPendingQuestions(updatedQuestionList);
    setIsLoading(false);

    if (updatedQuestionList.length === 0) {
      setShowConfetti(true);
    }
  }

  useEffect(() => {
    loadQuestions().then(() => null);
  }, [unshuffledQuestions]);

  const knowCount = userProgress?.know.length || 0;
  const dontKnowCount = userProgress?.dontKnow.length || 0;
  const skipCount = userProgress?.skip.length || 0;
  const hasProgress = knowCount > 0 || dontKnowCount > 0 || skipCount > 0;

  const currQuestion = pendingQuestions[0];
  const hasFinished = !isLoading && hasProgress && !currQuestion;

  return (
    <div className="mb-0 gap-3 text-center sm:mb-40">
      <QuestionsProgress
        knowCount={knowCount}
        didNotKnowCount={dontKnowCount}
        skippedCount={skipCount}
        totalCount={unshuffledQuestions?.length || questions?.length}
        isLoading={isLoading}
        showLoginAlert={!isLoggedIn() && hasProgress}
        onResetClick={() => {
          resetProgress('reset').finally(() => null);
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
            totalCount={unshuffledQuestions?.length || questions?.length || 0}
            knowCount={knowCount}
            didNotKnowCount={dontKnowCount}
            skippedCount={skipCount}
            onReset={(type: QuestionProgressType | 'reset') => {
              resetProgress(type).finally(() => null);
            }}
          />
        )}
        {!isLoading && currQuestion && <QuestionCard question={currQuestion} />}
        {isLoading && <QuestionLoader />}
      </div>

      <div
        className={`flex flex-col gap-1 transition-opacity duration-300 sm:flex-row sm:gap-3 ${
          hasFinished ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <button
          disabled={isLoading || !currQuestion}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            updateQuestionStatus('know', currQuestion.id).finally(() => null);
          }}
          className="flex flex-1 items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm text-black transition-colors hover:border-black hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-50 sm:rounded-lg sm:px-4 sm:py-3 sm:text-base"
        >
          <CheckCircle className="mr-1 h-4 text-current" />
          Already Know that
        </button>
        <button
          onClick={() => {
            updateQuestionStatus('dontKnow', currQuestion.id).finally(
              () => null,
            );
          }}
          disabled={isLoading || !currQuestion}
          className="flex flex-1 items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm text-black transition-colors hover:border-black hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-50 sm:rounded-lg sm:px-4 sm:py-3 sm:text-base"
        >
          <Sparkles className="mr-1 h-4 text-current" />
          Didn't Know that
        </button>
        <button
          onClick={() => {
            updateQuestionStatus('skip', currQuestion.id).finally(() => null);
          }}
          disabled={isLoading || !currQuestion}
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
