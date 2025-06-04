import { useState } from 'react';
import { cn } from '../../lib/classname';

type QuickHelpPromptsProps = {
  onQuestionClick: (question: string) => void;
};

export function QuickHelpPrompts(props: QuickHelpPromptsProps) {
  const { onQuestionClick } = props;

  const [selectedActionIndex, setSelectedActionIndex] = useState<number>(0);

  const quickActions = [
    {
      label: 'Help select a career path',
      questions: [
        'What roadmap should I pick?',
        'What are the best jobs for me?',
        'Recommend me a project based on my expertise',
        'Recommend me a topic I can learn in an hour',
      ],
    },
    {
      label: 'Help me find a job',
      questions: [
        'How can I improve my resume?',
        'How to make a tech resume?',
        'What’s asked in coding interviews?',
        'Where to find remote dev jobs?',
      ],
    },
    {
      label: 'Learn a Topic',
      questions: [
        'What is the best way to learn React?',
        'What is an API?',
        'How do databases work?',
        'What is async in JS?',
      ],
    },
    {
      label: 'Test my Knowledge',
      questions: [
        'Quiz me on arrays.',
        'Test my SQL skills.',
        'Ask about REST basics.',
        'Test my JS async knowledge.',
      ],
    },
  ];

  const selectedAction = quickActions[selectedActionIndex];

  return (
    <div className="mt-24">
      <h2 className="text-2xl font-semibold">How can I help you?</h2>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {quickActions.map((action, index) => (
          <button
            className={cn(
              'pointer-events-auto flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border bg-white px-2 py-1.5 text-sm hover:bg-gray-100 hover:text-black',
              selectedActionIndex === index
                ? 'border-gray-300 bg-white text-black hover:bg-white'
                : 'border-gray-300 bg-gray-100 text-gray-500 hover:border-gray-300 hover:bg-gray-50',
            )}
            onClick={() => setSelectedActionIndex(index)}
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="mt-6 divide-y divide-gray-200">
        {selectedAction.questions.map((question) => (
          <button
            key={question}
            className="block w-full cursor-pointer p-2 text-left text-sm text-gray-500 hover:bg-gray-100 hover:text-black"
            onClick={() => onQuestionClick(question)}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
