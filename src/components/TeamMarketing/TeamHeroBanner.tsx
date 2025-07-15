import { CheckCircle } from 'lucide-react';
import { isLoggedIn } from '../../lib/jwt.ts';
import { useEffect, useState } from 'react';

const featureList = [
  'Create custom roadmaps for your team',
  "Plan, track and document your team's skills and growth",
  'Invite your team members',
  "Get insights on your team's skills and growth",
];

export function fireTeamCreationClick() {
  window.fireEvent({
    category: 'FeatureClick',
    action: `Pages / Teams`,
    label: 'Create your Team',
  });
}

export function TeamHeroBanner() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  return (
    <div className="bg-white py-8 lg:py-12">
      <div className="container">
        <div className="flex flex-row items-center justify-start text-left lg:justify-between">
          <div className="flex grow flex-col">
            <h1 className="mb-0.5 text-2xl font-bold sm:mb-2.5 sm:text-4xl lg:mb-4 lg:text-5xl">
              Roadmaps for Teams
            </h1>
            <p className="mb-4 text-base leading-normal text-gray-600 sm:mb-0 sm:leading-none lg:text-lg">
              Train, plan and track your team's skills and career growth.
            </p>

            <ul className="mb-4 mt-0 hidden text-sm leading-7 sm:mb-4 sm:mt-4 sm:flex sm:flex-col lg:mb-6 lg:mt-6 lg:text-base lg:leading-8">
              {featureList.map((feature, index) => (
                <li key={feature}>
                  <CheckCircle className="hidden h-6 w-6 text-green-500 sm:inline-block" />
                  <span className="ml-0 sm:ml-2">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
              <a
                onClick={() => {
                  fireTeamCreationClick();
                }}
                href={isAuthenticated ? '/team/new' : '/signup'}
                className="flex w-full items-center justify-center rounded-lg border border-transparent bg-purple-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto sm:text-base"
              >
                Create your Team
              </a>
              {!isAuthenticated && (
                <>
                  <span className="ml-1 hidden text-base sm:inline">
                    or &nbsp;
                    <a
                      href="/login"
                      onClick={() => {
                        fireTeamCreationClick();
                        localStorage.setItem('authRedirect', '/team/new');
                      }}
                      className="text-purple-600 underline  hover:text-purple-700"
                    >
                      Login to your account
                    </a>
                  </span>
                  <a
                    href="/login"
                    onClick={() => {
                      fireTeamCreationClick();
                      localStorage.setItem('authRedirect', '/team/new');
                    }}
                    className="flex w-full items-center justify-center rounded-lg border border-purple-600 px-5 py-2 text-base text-sm font-medium text-purple-600 hover:bg-blue-700 sm:hidden sm:text-base"
                  >
                    Login to your account
                  </a>
                </>
              )}
            </div>
          </div>
          <img
            alt={'team roadmaps'}
            className="hidden h-64 md:block lg:h-80"
            src="/images/team-promo/hero-img.png"
          />
        </div>
      </div>
    </div>
  );
}
