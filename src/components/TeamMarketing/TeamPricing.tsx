import { Copy } from 'lucide-react';
import { useCopyText } from '../../hooks/use-copy-text.ts';
import { cn } from '../../lib/classname.ts';
import { isLoggedIn } from '../../lib/jwt.ts';
import { fireTeamCreationClick } from './TeamHeroBanner.tsx';
import { useEffect, useState } from 'react';

export function TeamPricing() {
  const { isCopied, copyText } = useCopyText();
  const teamEmail = 'teams@roadmap.sh';

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  return (
    <div className="border-t py-4 sm:py-8 md:py-12">
      <div className="container">
        <h2 className="mb-1 text-xl font-bold sm:mb-1.5 sm:text-2xl md:mb-2 md:text-3xl">
          Beta Pricing
        </h2>
        <p className="mb-4 text-base text-gray-600 sm:mb-8 sm:text-lg">
          We are currently in public beta and are offering free access to all
          features.
        </p>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-4">
          <div className="relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-purple-500">
            <div className="px-8 pb-2 pt-5 text-center sm:pt-4">
              <h3 className="mb-1 text-2xl font-bold">Free</h3>
              <p className="text-sm text-gray-500">No credit card required</p>
              <p className="flex items-start justify-center gap-1 py-6 text-3xl">
                <span className="text-base text-gray-600">$</span>
                <span className="text-5xl font-bold">0</span>
              </p>

              <a
                onClick={() => {
                  fireTeamCreationClick();
                  if (isAuthenticated) {
                    return;
                  }

                  localStorage.setItem('redirect', '/team/new');
                }}
                href={isAuthenticated ? '/team/new' : '/signup'}
                className="block rounded-md bg-purple-600 px-6 py-2 text-center text-sm font-medium leading-6 text-white shadow-sm transition hover:bg-gray-700 hover:shadow-lg focus:outline-hidden"
              >
                {isAuthenticated ? 'Create your Team' : 'Sign up for free'}
              </a>
            </div>
            <div className="flex w-full flex-col gap-1 border-t px-8 py-5 text-center sm:py-3">
              <p className="font-semibold text-black">All the features</p>
              <p className="text-gray-600">Roles and Permissions</p>
              <p className="text-gray-600">Custom Roadmaps</p>
              <p className="text-gray-600">Sharing Options</p>
              <p className="text-gray-600">Progress Tracking</p>
              <p className="text-gray-600">Team Insights</p>
              <p className="text-gray-600">Onboarding support</p>
            </div>
          </div>
          <div className="flex grow flex-col items-center justify-center rounded-md border border-gray-300 py-8">
            <img
              alt={'waving hand'}
              src={'/images/team-promo/contact.png'}
              className="mb-3 h-40"
            />
            <p className="mb-2 font-medium text-gray-500">
              Questions? We are here to help!
            </p>
            <p className="text-gray-600">
              <button
                onClick={() => {
                  copyText(teamEmail);
                }}
                className={cn(
                  'relative flex items-center justify-between gap-3 overflow-hidden rounded-md border border-black bg-white px-4 py-2 text-black hover:bg-gray-100',
                )}
              >
                {teamEmail}
                <Copy
                  className="relative top-[1px] ml-2 inline-block text-black transition-opacity"
                  size={16}
                />

                <span
                  className={cn(
                    'absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black text-white transition-all',
                    {
                      'top-full': !isCopied,
                      'top-0': isCopied,
                      'opacity-0': !isCopied,
                    },
                  )}
                >
                  Email copied!
                </span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
