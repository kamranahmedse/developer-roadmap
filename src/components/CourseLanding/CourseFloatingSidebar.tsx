import { cn } from '../../lib/classname';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';

type CourseFloatingSidebarProps = {
  isSticky: boolean;
};

export function CourseFloatingSidebar(props: CourseFloatingSidebarProps) {
  const { isSticky } = props;

  const whatYouGet = [
    'Full access to all the courses',
    'Personalized access using AI',
    'Certificate of Completion',
    'Playground for live-coding',
    'Challenges / Quizes',
  ];

  return (
    <div
      className={cn(
        'sticky top-8 -translate-y-1/2 overflow-hidden rounded-lg border bg-white shadow-sm transition-transform',
        isSticky && '-translate-y-0',
      )}
    >
      <figure>
        <img
          src="https://images.unsplash.com/photo-1732200584655-3511db5c24e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
          alt="SQL 101"
          className="aspect-video w-full object-cover"
        />
      </figure>

      <div className="p-2">
        <button
          className="flex w-full items-center justify-between gap-1 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 p-2 px-3 text-slate-50"
          onClick={() => {
            if (!isLoggedIn()) {
              showLoginPopup();
              return;
            }
          }}
        >
          <span>Enroll now</span>
          <span>5$ / month</span>
        </button>
      </div>

      <div className="border-b p-2 pb-4">
        <h4 className="text-lg font-medium">Certificate of Completion</h4>
        <p className="text-xs text-gray-500">
          Certificate will be issued on completion
        </p>
        <figure className="mt-4">
          <img
            src="https://images.unsplash.com/photo-1732465286852-a0b95393a90d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D"
            alt="SQL 101"
            className="aspect-video w-full rounded-lg object-cover"
          />
        </figure>
      </div>

      <div className="p-2">
        <h4 className="text-lg font-medium">What you get</h4>
        <ul
          role="list"
          className="mt-2 flex list-disc flex-col gap-1 pl-4 text-sm text-gray-700 marker:text-gray-400"
        >
          {whatYouGet.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
