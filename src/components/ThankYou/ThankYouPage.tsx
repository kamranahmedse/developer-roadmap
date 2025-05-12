import { useEffect, useState } from 'react';
import { getUrlParams } from '../../lib/browser';
import { Spinner } from '../ReactIcons/Spinner';
import { VerifyUpgrade } from '../Billing/VerifyUpgrade';
import { ChevronRight } from 'lucide-react';

export function ThankYouPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [shouldVerifyUpgrade, setShouldVerifyUpgrade] = useState(false);

  useEffect(() => {
    const params = getUrlParams();
    const next = params?.next;
    const shouldVerifyUpgrade = params?.s === '1';
    if (!next) {
      window.location.href = '/';
      return;
    }

    let decodedNextPage = decodeURIComponent(next);

    if (decodedNextPage === '/courses/sql') {
      decodedNextPage = `${import.meta.env.PUBLIC_COURSE_APP_URL}/sql`;
    }

    setNextPage(decodedNextPage);
    setIsLoading(false);
    setShouldVerifyUpgrade(shouldVerifyUpgrade);
  }, []);

  const pageType = nextPage?.startsWith('/courses/')
    ? 'course'
    : nextPage?.startsWith('/ai')
      ? 'ai-tutor'
      : 'other';

  if (isLoading) {
    return (
      <div className="flex flex-grow flex-col items-center justify-center py-20">
        <Spinner isDualRing={false} className="mb-5 h-7 w-7" />
        <p className="mb-1 text-xl font-medium">Please wait</p>
        <p className="text-gray-500">This may take a few seconds</p>
      </div>
    );
  }

  return (
    <>
      {shouldVerifyUpgrade && <VerifyUpgrade />}

      <div className="flex flex-grow flex-col items-center justify-center px-4">
        <div className="flex max-w-2xl flex-col items-center text-center">
          <img
            src="/images/gifs/party-popper.gif"
            alt="Thank you"
            className="relative left-6 mb-6 aspect-square w-24"
          />

          <h1 className="mb-3 text-4xl font-bold text-gray-800 md:text-5xl">
            Thank you!
          </h1>

          <p className="mb-8 text-lg text-gray-600">
            Your transaction was successful and your access has been activated.
          </p>

          {nextPage && (
            <a
              href={nextPage}
              className="group flex items-center gap-2 rounded-lg bg-purple-500 px-5 py-2.5 font-medium text-white transition-all hover:bg-blue-600"
            >
              {pageType === 'course'
                ? 'Continue to Course'
                : pageType === 'ai-tutor'
                  ? 'Continue to AI Tutor'
                  : 'Continue'}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          )}
        </div>

        <div className="mt-12 flex gap-4 text-sm text-gray-500">
          <a href="/terms" className="hover:text-gray-800">
            Terms of Use
          </a>
          <a href="/privacy" className="hover:text-gray-800">
            Privacy Policy
          </a>
        </div>
      </div>
    </>
  );
}
