import { useState } from 'react';
import type { QuizQuestion } from '../../queries/ai-quiz';
import { AIMCQQuestion } from './AIMCQQuestion';
import { AIOpenEndedQuestion } from './AIOpenEndedQuestion';
import { QuizTopNavigation } from './QuizTopNavigation';
import { getPercentage } from '../../lib/number';
import { AIQuizResults } from './AIQuizResults';
import { flushSync } from 'react-dom';
import { AIQuizResultStrip } from './AIQuizResultStrip';
import { cn } from '../../lib/classname';
import { httpPost } from '../../lib/query-http';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';

type AIQuizResultFeedbackBody = {
  questionsWithAnswers: string;
};

type AIQuizResultFeedbackQuery = {};

export type AIQuizResultFeedbackResponse = {
  summary?: string;
  guideTopics?: string[];
  courseTopics?: string[];
};

export type QuestionState = {
  isSubmitted: boolean;
  selectedOptions?: number[];
  userAnswer?: string;
  correctAnswer?: string;
  status: 'correct' | 'incorrect' | 'skipped' | 'pending' | 'can_be_improved';
};

const DEFAULT_QUESTION_STATE: QuestionState = {
  isSubmitted: false,
  selectedOptions: [],
  userAnswer: '',
  correctAnswer: '',
  status: 'pending',
};

type QuizStatus = 'answering' | 'submitted' | 'reviewing';

type AIQuizContentProps = {
  quizSlug?: string;
  questions: QuizQuestion[];
  isLoading?: boolean;
  isStreaming?: boolean;
};

export function AIQuizContent(props: AIQuizContentProps) {
  const { quizSlug, questions, isLoading, isStreaming = false } = props;

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const activeQuestion = questions[activeQuestionIndex];

  const [questionStates, setQuestionStates] = useState<
    Record<number, QuestionState>
  >({});
  const [quizStatus, setQuizStatus] = useState<QuizStatus>('answering');

  const activeQuestionState =
    questionStates[activeQuestionIndex] ?? DEFAULT_QUESTION_STATE;
  const isLastQuestion = activeQuestionIndex === questions.length - 1;

  const {
    mutate: userQuizResultFeedback,
    isPending: isUserQuizResultFeedbackPending,
    data: userQuizResultFeedbackData,
    status: userQuizResultFeedbackStatus,
    reset: resetUserQuizResultFeedback,
  } = useMutation(
    {
      mutationKey: ['user-quiz-result-feedback', quizSlug],
      mutationFn: (body: AIQuizResultFeedbackBody) => {
        return httpPost<AIQuizResultFeedbackResponse>(
          `/v1-ai-quiz-result-feedback/${quizSlug}`,
          body,
        );
      },
    },
    queryClient,
  );

  const handleSubmit = (status: QuestionState['status']) => {
    const oldState =
      questionStates[activeQuestionIndex] ?? DEFAULT_QUESTION_STATE;

    const newQuestionStates = {
      ...questionStates,
      [activeQuestionIndex]: {
        ...oldState,
        isSubmitted: true,
        status,
      },
    };

    setQuestionStates(newQuestionStates);
    return newQuestionStates;
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

  const handleRetry = () => {
    setActiveQuestionIndex(0);
    setQuestionStates({});
    setQuizStatus('answering');
    resetUserQuizResultFeedback();
  };

  const hasNextQuestion = activeQuestionIndex < questions.length - 1;
  const hasPreviousQuestion = activeQuestionIndex > 0;
  const totalQuestions = questions?.length ?? 0;
  const isAllQuestionsSubmitted =
    Object.values(questionStates).filter((state) => state.status !== 'pending')
      .length === totalQuestions;

  const progressPercentage = isLoading
    ? 0
    : getPercentage(activeQuestionIndex + 1, totalQuestions);

  const shouldShowQuestions =
    quizStatus === 'answering' || quizStatus === 'reviewing';

  const handleNextQuestion = () => {
    if (!hasNextQuestion) {
      setQuizStatus(isAllQuestionsSubmitted ? 'submitted' : 'reviewing');
      return;
    }

    setActiveQuestionIndex(activeQuestionIndex + 1);
  };

  const handleSkip = () => {
    const prevStatus = questionStates[activeQuestionIndex]?.status ?? 'pending';
    const newQuestionStates = handleSubmit(
      prevStatus === 'pending' ? 'skipped' : prevStatus,
    );

    if (hasNextQuestion) {
      handleNextQuestion();
    } else {
      handleComplete(newQuestionStates);
    }
  };

  const handleComplete = (
    newQuestionStates?: Record<number, QuestionState>,
  ) => {
    const states = newQuestionStates ?? questionStates;
    setQuizStatus('submitted');

    const questionsWithAnswers = questions
      .map((question, index) => {
        const questionState = states[index];

        let questionWithAnswer = `## Question ${index + 1} (${question.type === 'mcq' ? 'MCQ' : 'Open Ended'}): ${question.title}`;
        if (question.type === 'mcq') {
          questionWithAnswer += `\n### Options:`;
          question?.options?.forEach((option, optionIndex) => {
            questionWithAnswer += `\n${optionIndex + 1}. ${option.title} (${option.isCorrect ? 'Correct' : 'Incorrect'})`;
          });

          if (questionState?.selectedOptions?.length) {
            questionWithAnswer += `\n### User Selected Answer:`;
            questionState?.selectedOptions?.forEach((optionIndex) => {
              questionWithAnswer += `\n${optionIndex + 1}. ${question.options[optionIndex].title}`;
            });
          }
        } else {
          if (questionState?.userAnswer) {
            questionWithAnswer += `\n### User Answer: ${questionState?.userAnswer}`;
          }

          if (questionState?.correctAnswer) {
            questionWithAnswer += `\n### AI Feedback: ${questionState?.correctAnswer}`;
          }
        }

        questionWithAnswer += `\n### Final Status: ${questionState?.status}`;

        return questionWithAnswer;
      })
      .join('\n\n');

    if (userQuizResultFeedbackStatus === 'idle') {
      userQuizResultFeedback({ questionsWithAnswers });
    }
  };

  return (
    <div
      className={cn('flex h-full w-full flex-col', {
        'animate-pulse cursor-progress': isStreaming,
      })}
    >
      <div
        className={cn('relative flex h-full flex-col overflow-y-auto', {
          'pointer-events-none': isStreaming,
        })}
      >
        <div className="absolute inset-0 z-10">
          <div className="mx-auto max-w-2xl bg-white px-4 py-10">
            {shouldShowQuestions && (
              <QuizTopNavigation
                activeQuestionIndex={activeQuestionIndex}
                totalQuestions={totalQuestions}
                progressPercentage={progressPercentage}
                onSkip={handleSkip}
                isStreaming={isStreaming}
                onPrevious={() => {
                  if (!hasPreviousQuestion) {
                    return;
                  }

                  setActiveQuestionIndex(activeQuestionIndex - 1);
                }}
                onNext={handleNextQuestion}
              />
            )}

            {quizStatus === 'submitted' && (
              <AIQuizResults
                questionStates={questionStates}
                totalQuestions={totalQuestions}
                onRetry={handleRetry}
                onNewQuiz={() => {
                  window.location.href = '/ai/quiz';
                }}
                onReview={(questionIndex) => {
                  setActiveQuestionIndex(questionIndex);
                  setQuizStatus('reviewing');
                }}
                isFeedbackLoading={isUserQuizResultFeedbackPending}
                feedback={userQuizResultFeedbackData}
              />
            )}

            {shouldShowQuestions && (
              <>
                {activeQuestion && activeQuestion.type === 'mcq' && (
                  <AIMCQQuestion
                    question={activeQuestion}
                    questionState={activeQuestionState}
                    setSelectedOptions={handleSelectOptions}
                    onSubmit={handleSubmit}
                    onNext={handleNextQuestion}
                    onSkip={handleSkip}
                    isLastQuestion={isLastQuestion}
                    onComplete={handleComplete}
                  />
                )}

                {activeQuestion && activeQuestion.type === 'open-ended' && (
                  <AIOpenEndedQuestion
                    key={activeQuestion.id}
                    quizSlug={quizSlug ?? ''}
                    question={activeQuestion}
                    questionState={activeQuestionState}
                    onSubmit={handleSubmit}
                    onNext={handleNextQuestion}
                    setUserAnswer={handleSetUserAnswer}
                    setCorrectAnswer={handleSetCorrectAnswer}
                    isLastQuestion={isLastQuestion}
                    onComplete={handleComplete}
                    onSkip={handleSkip}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {quizStatus === 'reviewing' && (
        <AIQuizResultStrip
          activeQuestionIndex={activeQuestionIndex}
          questionStates={questionStates}
          onReview={(questionIndex) => {
            setActiveQuestionIndex(questionIndex);
            setQuizStatus('reviewing');
          }}
          onComplete={() => {
            setQuizStatus('submitted');
          }}
        />
      )}
    </div>
  );
}
