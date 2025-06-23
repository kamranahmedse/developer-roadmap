import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import {
  aiQuestionSuggestionsOptions,
  type AIQuestionSuggestionsResponse,
} from '../../queries/user-ai-session';
import type { AllowedFormat } from './ContentGenerator';
import { Loader2Icon, RotateCwIcon, SendIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '../../lib/classname';
import { flushSync } from 'react-dom';
import { CheckIcon } from '../ReactIcons/CheckIcon';

export type QuestionAnswerChatMessage =
  | { role: 'user'; answer: string }
  | {
      role: 'assistant';
      question: string;
      possibleAnswers: string[];
    };

type QuestionAnswerChatProps = {
  term: string;
  format: AllowedFormat;
  questionAnswerChatMessages: QuestionAnswerChatMessage[];
  setQuestionAnswerChatMessages: (
    messages: QuestionAnswerChatMessage[],
  ) => void;
  onGenerateNow: () => void;
  defaultQuestions?: AIQuestionSuggestionsResponse['questions'];
};

export function QuestionAnswerChat(props: QuestionAnswerChatProps) {
  const {
    term,
    format,
    defaultQuestions,
    questionAnswerChatMessages,
    setQuestionAnswerChatMessages,
    onGenerateNow,
  } = props;

  const [activeMessageIndex, setActiveMessageIndex] = useState(
    defaultQuestions?.length ?? 0,
  );
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'answering' | 'done'>('answering');

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const {
    data: aiQuestionSuggestions,
    isLoading: isLoadingAiQuestionSuggestions,
  } = useQuery(
    aiQuestionSuggestionsOptions({ term, format }, defaultQuestions),
    queryClient,
  );

  const activeMessage = aiQuestionSuggestions?.questions[activeMessageIndex];

  const scrollToBottom = () => {
    if (!scrollAreaRef.current) {
      return;
    }

    scrollAreaRef.current.scrollTo({
      top: scrollAreaRef.current.scrollHeight,
      behavior: 'instant',
    });
  };
  const handleAnswerSelect = (answer: string) => {
    const trimmedAnswer = answer.trim();
    if (!activeMessage || !trimmedAnswer) {
      return;
    }

    const newMessages: QuestionAnswerChatMessage[] = [
      ...questionAnswerChatMessages,
      {
        role: 'assistant',
        ...activeMessage,
      },
      {
        role: 'user',
        answer: trimmedAnswer,
      },
    ];

    setQuestionAnswerChatMessages(newMessages);
    setMessage('');

    const hasMoreMessages =
      activeMessageIndex < aiQuestionSuggestions.questions.length - 1;
    if (!hasMoreMessages) {
      setStatus('done');
      return;
    }

    flushSync(() => {
      setActiveMessageIndex(activeMessageIndex + 1);
      setStatus('answering');
    });

    scrollToBottom();
  };

  const canGenerateNow =
    // user can generate after answering 5 questions -> 5 * 2 messages (user and assistant)
    !isLoadingAiQuestionSuggestions && questionAnswerChatMessages.length >= 10;

  const canReset = questionAnswerChatMessages.length >= 2;
  const handleReset = () => {
    setQuestionAnswerChatMessages([]);
    setActiveMessageIndex(0);
    setStatus('answering');
  };

  return (
    <>
      <div className="relative h-[420px] w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
        {isLoadingAiQuestionSuggestions && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="flex animate-pulse items-center gap-2 rounded-full border border-gray-200 bg-gray-50 p-2 px-4 text-sm">
              <Loader2Icon className="size-4 animate-spin" />
              <span>Generating personalized questions...</span>
            </div>
          </div>
        )}

        {!isLoadingAiQuestionSuggestions && status === 'done' && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center">
              <CheckIcon additionalClasses="size-12" />
              <p className="mt-3 text-lg">Preferences saved</p>
              <p className="text-sm text-gray-500">
                You can now start generating {format}
              </p>
            </div>
          </div>
        )}

        {!isLoadingAiQuestionSuggestions && status === 'answering' && (
          <>
            {canReset && (
              <div className="absolute top-2 left-2 z-10">
                <button
                  className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-gray-50 px-2 py-1 text-xs text-gray-500 hover:bg-gray-200 focus:outline-none"
                  onClick={handleReset}
                >
                  <RotateCwIcon className="size-3" />
                  Reset and Restart Asking
                </button>
              </div>
            )}

            <div className="flex h-full w-full flex-col bg-white">
              <div
                ref={scrollAreaRef}
                className="relative h-full w-full grow overflow-y-auto"
              >
                <div className="absolute inset-0 flex flex-col">
                  <div className="flex w-full grow flex-col justify-end gap-2 p-2">
                    {questionAnswerChatMessages.map((message, index) => (
                      <QuestionAnswerChatMessage
                        key={index}
                        role={message.role}
                        question={
                          message.role === 'assistant'
                            ? message.question
                            : undefined
                        }
                        answer={
                          message.role === 'user' ? message.answer : undefined
                        }
                      />
                    ))}

                    {activeMessage && (
                      <QuestionAnswerChatMessage
                        role="assistant"
                        question={activeMessage?.question ?? ''}
                      />
                    )}
                  </div>
                </div>
              </div>

              {activeMessage && (
                <div className="p-2">
                  <div className="rounded-lg border border-gray-200 bg-white">
                    <div className="border-b border-gray-200 p-2">
                      <p className="text-sm text-gray-500">
                        Pick an answer from these or write it below
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
                        {activeMessage.possibleAnswers.map((answer) => (
                          <button
                            type="button"
                            key={answer}
                            className="cursor-pointer rounded-lg bg-gray-100 p-1 px-2 hover:bg-gray-200 focus:outline-none"
                            onClick={() => {
                              handleAnswerSelect(answer);
                            }}
                          >
                            {answer}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div
                      className="flex w-full items-center justify-between gap-2 p-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAnswerSelect(message);
                      }}
                    >
                      <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-transparent text-sm focus:outline-none"
                        placeholder="Write your answer here..."
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleAnswerSelect(message);
                            setMessage('');
                          }
                        }}
                      />

                      <button
                        type="button"
                        className="flex size-7 shrink-0 items-center justify-center rounded-md hover:bg-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <SendIcon className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {canGenerateNow && status !== 'done' && activeMessage && (
        <div className="flex w-full items-center rounded-lg border border-gray-200 bg-white p-2">
          <p className="text-sm">
            Keep answering for better output or{' '}
            <button
              className="text-blue-500 underline underline-offset-2 hover:no-underline focus:outline-none"
              onClick={onGenerateNow}
            >
              Generate now.
            </button>
          </p>
        </div>
      )}
    </>
  );
}

type QuestionAnswerChatMessageProps = {
  role: 'user' | 'assistant';
  question?: string;
  answer?: string;
};

function QuestionAnswerChatMessage(props: QuestionAnswerChatMessageProps) {
  const { role, question, answer } = props;

  return (
    <div
      className={cn(
        'flex w-fit items-center gap-2 rounded-lg border p-2 text-pretty',
        role === 'user' && 'self-end border-gray-200 bg-gray-300/30',
        role === 'assistant' && 'border-yellow-200 bg-yellow-300/30',
      )}
    >
      {role === 'assistant' && <div className="text-sm">{question}</div>}
      {role === 'user' && <div className="text-sm">{answer}</div>}
    </div>
  );
}
