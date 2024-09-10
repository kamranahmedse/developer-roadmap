import { isLoggedIn } from '../../lib/jwt.ts';
import { showLoginPopup } from '../../lib/popup.ts';

export function ProjectsPageHeader() {
  return (
    <div className="bg-white py-3 sm:py-12">
      <div className="container">
        <div className="flex flex-col items-start bg-white sm:items-center">
          <h1 className="text-2xl font-bold sm:text-5xl">Project Ideas</h1>
          <p className="mt-1 text-sm sm:my-3 sm:text-lg">
            Browse the ever-growing list of projects ideas and solutions.
          </p>
        </div>
      </div>
    </div>
  );
}
