import type { RoadmapJSON } from '../../queries/roadmap';

type TutorIntroMessageProps = {
  roadmap: RoadmapJSON;
};

export function TutorIntroMessage(props: TutorIntroMessageProps) {
  const { roadmap } = props;

  const topicNodes = roadmap.nodes.filter((node) => node.type === 'topic');

  const firstTopicNode = topicNodes[0];
  const firstTopicTitle = firstTopicNode?.data?.label || 'XYZ';

  const secondTopicNode = topicNodes[1];
  const secondTopicTitle = secondTopicNode?.data?.label || 'XYZ';

  const capabilities = [
    {
      icon: '📚',
      title: 'Learn concepts:',
      description: 'Ask me about any topics on the roadmap',
      examples:
        '"Explain what React hooks are" or "How does async/await work?"',
    },
    {
      icon: '📊',
      title: 'Track progress:',
      description: 'Mark topics as done, learning, or skipped',
      examples: `"Mark ${firstTopicTitle} as done" or "Show my overall progress"`,
    },
    {
      icon: '🎯',
      title: 'Recommendations:',
      description: 'Find what to learn next or explore other roadmaps',
      examples: `"What should I learn next?" or "Recommend roadmaps for backend development"`,
    },
    {
      icon: '🔍',
      title: 'Find resources:',
      description: 'Get learning materials for specific topics',
      examples: `"Show me resources for learning ${secondTopicTitle}"`,
    },
    {
      icon: '🔗',
      title: 'Share progress:',
      description: 'Get a link to share your learning progress',
      examples: '"Give me my shareable progress link"',
    },
  ];

  return (
    <div className="space-y-2 text-sm text-gray-700">
      <div className="flex items-start gap-3">
        <div>
          <h3 className="mb-2 font-medium text-gray-900">
            Hi! I'm your AI learning assistant 👋
          </h3>
          <p className="mb-3">
            I'm here to guide you through your learning journey on this roadmap.
            I can help you understand concepts, track your progress, and provide
            personalized learning advice.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">
          Here's what I can help you with:
        </h4>

        <div className="space-y-3">
          {capabilities.map((capability, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className={`font-medium`}>{capability.icon}</span>
              <div>
                <span className="font-medium text-black">
                  {capability.title}
                </span>{' '}
                {capability.description}
                <div className="mt-1 text-xs text-gray-600">
                  Try: {capability.examples}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-gray-50 p-3">
        <p className="text-xs text-black">
          <span className="font-medium">Tip:</span> I can see your current
          progress on the roadmap, so my advice will be personalized to your
          learning journey. Just ask me anything about the topics you see on the
          roadmap!
        </p>
      </div>
    </div>
  );
}
