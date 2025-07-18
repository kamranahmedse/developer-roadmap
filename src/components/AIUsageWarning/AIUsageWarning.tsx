import { isLoggedIn } from '../../lib/jwt';

type AIUsageWarningProps = {
  type: 'course' | 'guide' | 'roadmap' | 'quiz';
  totalCount?: number;
  isPaidUser?: boolean;
  usedCount?: number;
  limitCount?: number;
  onUpgrade: () => void;
};

export function AIUsageWarning(props: AIUsageWarningProps) {
  const { type, totalCount, isPaidUser, usedCount, limitCount, onUpgrade } =
    props;

  const isUserAuthenticated = isLoggedIn();

  const typeLabels = {
    course: 'courses',
    guide: 'guides',
    roadmap: 'roadmaps',
    quiz: 'quizzes',
  };

  const typeLabel = typeLabels[type];

  return (
    <p className="mb-4 text-sm text-gray-500">
      {isUserAuthenticated ? (
        isPaidUser ? (
          `You have generated ${totalCount} ${typeLabel} so far.`
        ) : (
          <>
            <span className="text-gray-500">You have used</span>{' '}
            <span className="text-gray-500">
              {usedCount} of {limitCount} {typeLabel}
            </span>
            <button
              onClick={onUpgrade}
              className="ml-2 text-blue-600 underline underline-offset-2 hover:text-blue-700"
            >
              Need more? Upgrade
            </button>
          </>
        )
      ) : (
        `Sign up or login to generate your first ${type}. Takes 2s to do so.`
      )}
    </p>
  );
}
