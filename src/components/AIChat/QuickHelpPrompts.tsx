import { QuickActionButton } from './QuickActionButton';

type QuickHelpPromptsProps = {
  onQuickActionClick: (action: string) => void;
  onPredefinedQuestionClick: (question: string) => void;
};

export function QuickHelpPrompts(props: QuickHelpPromptsProps) {
  const { onQuickActionClick, onPredefinedQuestionClick } = props;

  const quickActions = [
    'Help select a career path',
    'Help me find a job',
    'Learn a Topic',
    'Test my Knowledge',
  ];

  const predefinedQuestions = [
    'What roadmap should I pick?',
    'What are the best jobs for me?',
    'Recommend me a project based on my expertise',
    'Recommend me a topic I can learn in an hour',
  ];

  return (
    <div className="mt-24">
      <h2 className="text-2xl font-semibold">How can I help you?</h2>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {quickActions.map((action) => (
          <QuickActionButton
            key={action}
            label={action}
            className="text-xs"
            onClick={() => onQuickActionClick(action)}
          />
        ))}
      </div>

      <div className="mt-6 divide-y divide-gray-200">
        {predefinedQuestions.map((question) => (
          <button
            key={question}
            className="block w-full cursor-pointer p-2 text-left text-sm text-gray-500 hover:bg-gray-100 hover:text-black"
            onClick={() => onPredefinedQuestionClick(question)}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
