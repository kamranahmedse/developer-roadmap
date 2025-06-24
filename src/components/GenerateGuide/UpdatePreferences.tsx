import { useMemo, useState } from 'react';
import type { AllowedFormat } from '../ContentGenerator/ContentGenerator';
import {
  QuestionAnswerChat,
  type QuestionAnswerChatMessage,
} from '../ContentGenerator/QuestionAnswerChat';
import { Modal } from '../Modal';

type UpdatePreferencesProps = {
  onClose: () => void;
  term: string;
  format: AllowedFormat;
  questionAndAnswers?: QuestionAnswerChatMessage[];
  onUpdatePreferences: (
    questionAndAnswers: QuestionAnswerChatMessage[],
  ) => void;
  isUpdating: boolean;
};

export function UpdatePreferences(props: UpdatePreferencesProps) {
  const {
    onClose,
    questionAndAnswers: defaultQuestionAndAnswers,
    term,
    format,
    onUpdatePreferences,
    isUpdating,
  } = props;

  const [questionAnswerChatMessages, setQuestionAnswerChatMessages] = useState<
    QuestionAnswerChatMessage[]
  >(defaultQuestionAndAnswers || []);

  const defaultQuestions = defaultQuestionAndAnswers
    ?.filter((message) => message.role === 'assistant')
    .map((message) => ({
      question: message.question,
      possibleAnswers: message.possibleAnswers,
    }));

  const hasChangedQuestionAndAnswers = useMemo(() => {
    return (
      JSON.stringify(questionAnswerChatMessages) !==
      JSON.stringify(defaultQuestionAndAnswers)
    );
  }, [questionAnswerChatMessages, defaultQuestionAndAnswers]);

  console.log(questionAnswerChatMessages);
  console.log(defaultQuestionAndAnswers);

  return (
    <Modal
      onClose={onClose}
      bodyClassName="p-4 flex flex-col gap-4"
      wrapperClassName="max-w-xl  h-auto"
      overlayClassName="items-start md:items-center"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">Update Preferences</h2>
        <p className="text-sm text-gray-500">
          Update your preferences for better content
        </p>
      </div>

      <QuestionAnswerChat
        term={term}
        format={format}
        questionAnswerChatMessages={questionAnswerChatMessages}
        setQuestionAnswerChatMessages={setQuestionAnswerChatMessages}
        defaultQuestions={defaultQuestions}
        onGenerateNow={() => {
          onUpdatePreferences(questionAnswerChatMessages);
        }}
        className="-mx-2 h-[400px] border-none p-0"
        type="update"
      />

      {hasChangedQuestionAndAnswers && (
        <button
          className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-80 disabled:opacity-50"
          disabled={isUpdating || !hasChangedQuestionAndAnswers}
          onClick={() => {
            onUpdatePreferences(questionAnswerChatMessages);
          }}
        >
          {isUpdating ? 'Updating...' : 'Apply preferences'}
        </button>
      )}
    </Modal>
  );
}
