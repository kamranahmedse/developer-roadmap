import { useState } from 'react';
import type { QuizQuestion } from '../../queries/ai-quiz';
import { AIMCQQuestion } from './AIMCQQuestion';
import { AIOpenEndedQuestion } from './AIOpenEndedQuestion';
import { QuizTopNavigation } from './QuizTopNavigation';
import { getPercentage } from '../../lib/number';
import { AIQuizResults } from './AIQuizResults';
import { flushSync } from 'react-dom';

export type QuestionState = {
  isSubmitted: boolean;
  selectedOptions?: number[];
  userAnswer?: string;
  correctAnswer?: string;
  status: 'correct' | 'incorrect' | 'skipped' | 'pending';
};

const DEFAULT_QUESTION_STATE: QuestionState = {
  isSubmitted: false,
  selectedOptions: [],
  userAnswer: '',
  correctAnswer: '',
  status: 'pending',
};

type AIQuizContentProps = {
  quizSlug?: string;
  questions: QuizQuestion[];
  isLoading?: boolean;
};

export function AIQuizContent(props: AIQuizContentProps) {
  const { quizSlug, questions, isLoading } = props;

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const activeQuestion = questions[activeQuestionIndex];

  const [questionStates, setQuestionStates] = useState<
    Record<number, QuestionState>
  >({});
  const [isAllQuestionsSubmitted, setIsAllQuestionsSubmitted] = useState(false);

  const activeQuestionState =
    questionStates[activeQuestionIndex] ?? DEFAULT_QUESTION_STATE;

  const handleSubmit = (status: QuestionState['status']) => {
    setQuestionStates((prev) => {
      const oldState = prev[activeQuestionIndex] ?? DEFAULT_QUESTION_STATE;

      const newSelectedOptions = {
        ...prev,
        [activeQuestionIndex]: {
          ...oldState,
          isSubmitted: true,
          status,
        },
      };

      return newSelectedOptions;
    });

    setIsAllQuestionsSubmitted(activeQuestionIndex === questions.length - 1);
  };

  const handleSetUserAnswer = (userAnswer: string) => {
    setQuestionStates((prev) => {
      const oldState = prev[activeQuestionIndex] ?? DEFAULT_QUESTION_STATE;

      const newSelectedOptions = {
        ...prev,
        [activeQuestionIndex]: {
          ...oldState,
          userAnswer,
        },
      };

      return newSelectedOptions;
    });
  };

  const handleSetCorrectAnswer = (correctAnswer: string) => {
    flushSync(() => {
      setQuestionStates((prev) => {
        const oldState = prev[activeQuestionIndex] ?? DEFAULT_QUESTION_STATE;

        const newSelectedOptions = {
          ...prev,
          [activeQuestionIndex]: {
            ...oldState,
            correctAnswer,
          },
        };

        return newSelectedOptions;
      });
    });
  };

  const handleSelectOptions = (options: number[]) => {
    setQuestionStates((prev) => {
      const oldState = prev[activeQuestionIndex] ?? DEFAULT_QUESTION_STATE;

      const newSelectedOptions = {
        ...prev,
        [activeQuestionIndex]: {
          ...oldState,
          selectedOptions: options,
        },
      };

      return newSelectedOptions;
    });
  };

  const handleNext = () => {
    setActiveQuestionIndex(activeQuestionIndex + 1);
  };

  const handleRetry = () => {
    setActiveQuestionIndex(0);
    setQuestionStates({});
    setIsAllQuestionsSubmitted(false);
  };

  const totalQuestions = questions?.length ?? 0;
  const progressPercentage = isLoading
    ? 0
    : getPercentage(activeQuestionIndex + 1, totalQuestions);

  return (
    <div className="mx-auto w-full max-w-lg py-10">
      {!isAllQuestionsSubmitted && (
        <QuizTopNavigation
          activeQuestionIndex={activeQuestionIndex}
          totalQuestions={totalQuestions}
          progressPercentage={progressPercentage}
          onPrevious={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          onNext={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
        />
      )}

      {isAllQuestionsSubmitted && (
        <AIQuizResults
          questionStates={questionStates}
          totalQuestions={totalQuestions}
          onRetry={handleRetry}
          onNewQuiz={() => {
            window.location.href = '/ai/quiz';
          }}
        />
      )}

      {!isAllQuestionsSubmitted && (
        <>
          {activeQuestion && activeQuestion.type === 'mcq' && (
            <AIMCQQuestion
              question={activeQuestion}
              questionState={activeQuestionState}
              setSelectedOptions={handleSelectOptions}
              onSubmit={handleSubmit}
              onNext={handleNext}
            />
          )}

          {activeQuestion && activeQuestion.type === 'open-ended' && (
            <AIOpenEndedQuestion
              quizSlug={quizSlug ?? ''}
              question={activeQuestion}
              questionState={activeQuestionState}
              onSubmit={handleSubmit}
              onNext={handleNext}
              setUserAnswer={handleSetUserAnswer}
              setCorrectAnswer={handleSetCorrectAnswer}
            />
          )}
        </>
      )}
    </div>
  );
}
