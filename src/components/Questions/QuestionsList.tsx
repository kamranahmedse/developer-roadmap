import { useEffect, useRef, useState } from 'react';
import { QuestionsProgress } from './QuestionsProgress';
import { CheckCircle, SkipForward, Sparkles } from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { QuestionLoader } from './QuestionLoader';
import { isLoggedIn } from '../../lib/jwt';
import type { QuestionType } from '../../lib/question-group';
import { Confetti } from '../Confetti';
import { httpGet, httpPut } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';

type UserQuestionProgress = {
  know: string[];
  didNotKnow: string[];
  skipped: string[];
};

type QuestionsListProps = {
  groupId: string;
  questions: QuestionType[];
};

export function QuestionsList(props: QuestionsListProps) {
  const { questions: unshuffledQuestions, groupId } = props;

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [confettiEl, setConfettiEl] = useState<HTMLElement | null>(null);

  const [questions, setQuestions] = useState<QuestionType[]>();
  const [pendingQuestions, setPendingQuestions] = useState<QuestionType[]>([]);

  const [userProgress, setUserProgress] = useState<UserQuestionProgress>();
  const alreadyKnowRef = useRef<HTMLButtonElement>(null);
  const didNotKnowRef = useRef<HTMLButtonElement>(null);

  function showConfetti(el: HTMLElement | null) {
    // If confetti is already showing, remove that first
    if (confettiEl) {
      setConfettiEl(null);
    }

    window.setTimeout(() => {
      setConfettiEl(el);
    }, 0);
  }

  async function fetchUserProgress(): Promise<
    UserQuestionProgress | undefined
  > {
    if (!isLoggedIn()) {
      return;
    }

    const { response, error } = await httpGet<UserQuestionProgress>(
      `/v1-get-user-question-progress/${groupId}`
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
    const didNotKnowQuestions = userProgress?.didNotKnow || [];
    const skippedQuestions = userProgress?.skipped || [];

    const pendingQuestions = unshuffledQuestions.filter((question) => {
      return (
        !knownQuestions.includes(question.id) &&
        !didNotKnowQuestions.includes(question.id) &&
        !skippedQuestions.includes(question.id)
      );
    });

    // Shuffle and set pending questions
    setPendingQuestions(pendingQuestions.sort(() => Math.random() - 0.5));
    setQuestions(unshuffledQuestions);

    setIsLoading(false);
  }

  async function updateQuestionStatus(
    status: 'know' | 'dontKnow' | 'skip',
    questionId: string
  ) {
    setIsLoading(true);
    let newProgress = userProgress || { know: [], didNotKnow: [], skipped: [] };

    if (!isLoggedIn()) {
      if (status === 'know') {
        newProgress.know.push(questionId);
      } else if (status == 'dontKnow') {
        newProgress.didNotKnow.push(questionId);
      } else if (status == 'skip') {
        newProgress.skipped.push(questionId);
      }
    } else {
      const { response, error } = await httpPut<UserQuestionProgress>(
        `/v1-update-question-status/${groupId}`,
        {
          status,
          questionId,
          questionGroupId: groupId,
        }
      );

      if (error || !response) {
        toast.error(error?.message || 'Error marking question status');
        return;
      }

      newProgress = response;
    }

    setUserProgress(newProgress);
    setPendingQuestions(pendingQuestions.filter((q) => q.id !== questionId));
    setIsLoading(false);
  }

  useEffect(() => {
    loadQuestions().then(() => null);
  }, [unshuffledQuestions]);

  const knownCount = userProgress?.know.length || 0;
  const didNotKnowCount = userProgress?.didNotKnow.length || 0;
  const skippedCount = userProgress?.skipped.length || 0;
  const hasProgress = knownCount > 0 || didNotKnowCount > 0 || skippedCount > 0;

  const currQuestion = pendingQuestions[0];

  return (
    <div className="mb-40 gap-3 text-center">
      <Confetti
        element={confettiEl}
        onDone={() => {
          setConfettiEl(null);
        }}
      />

      <QuestionsProgress
        knowCount={knownCount}
        didNotKnowCount={didNotKnowCount}
        skippedCount={skippedCount}
        totalCount={unshuffledQuestions?.length || questions?.length}
        isLoading={isLoading}
        showLoginAlert={!isLoggedIn() && hasProgress}
      />

      <div className="relative mb-4 flex min-h-[400px] w-full overflow-hidden rounded-lg border border-gray-300 bg-white">
        {!isLoading && <QuestionCard question={currQuestion} />}
        {isLoading && <QuestionLoader />}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          disabled={isLoading}
          ref={alreadyKnowRef}
          onClick={(e) => {
            showConfetti(alreadyKnowRef.current);
            updateQuestionStatus('know', currQuestion.id).finally(() => null);
          }}
          className="flex flex-1 items-center rounded-xl border border-gray-300 bg-white py-3 px-4 text-black transition-colors hover:border-black hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-50"
        >
          <CheckCircle className="mr-1 h-4 text-current" />
          Already Know that
        </button>
        <button
          ref={didNotKnowRef}
          onClick={() => {
            showConfetti(didNotKnowRef.current);
            updateQuestionStatus('dontKnow', currQuestion.id).finally(
              () => null
            );
          }}
          disabled={isLoading}
          className="flex flex-1 items-center rounded-xl border border-gray-300 bg-white py-3 px-4 text-black transition-colors hover:border-black hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-50"
        >
          <Sparkles className="mr-1 h-4 text-current" />
          Didn't Know that
        </button>
        <button
          onClick={() => {
            updateQuestionStatus('skip', currQuestion.id).finally(() => null);
          }}
          disabled={isLoading}
          data-next-question="skip"
          className="flex flex-1 items-center rounded-xl border border-red-600 p-3 text-red-600 hover:bg-red-600 hover:text-white disabled:pointer-events-none disabled:opacity-50"
        >
          <SkipForward className="mr-1 h-4" />
          Skip Question
        </button>
      </div>
    </div>
  );
}
