import { useState } from 'react';
import type { AIQuestionSuggestionsResponse } from '../../queries/user-ai-session';
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
    questionAndAnswers,
    term,
    format,
    onUpdatePreferences,
    isUpdating,
  } = props;

  const [questionAnswerChatMessages, setQuestionAnswerChatMessages] = useState<
    QuestionAnswerChatMessage[]
  >(questionAndAnswers || []);

  const defaultQuestions = questionAndAnswers
    ?.filter((message) => message.role === 'assistant')
    .map((message) => ({
      question: message.question,
      possibleAnswers: message.possibleAnswers,
    }));

  return (
    <Modal
      onClose={onClose}
      bodyClassName="p-4 flex flex-col gap-4"
      wrapperClassName="max-w-xl"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">Update Preferences</h2>
        <p className="text-sm text-gray-500">
          Update the preferences for the AI to generate a guide.
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
      />

      <button
        className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
        disabled={isUpdating}
        onClick={() => {
          onUpdatePreferences(questionAnswerChatMessages);
        }}
      >
        {isUpdating ? 'Updating...' : 'Update Preferences'}
      </button>
    </Modal>
  );
}
