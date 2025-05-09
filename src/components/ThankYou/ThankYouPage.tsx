import { useEffect, useState } from 'react';
import { getUrlParams } from '../../lib/browser';
import { Spinner } from '../ReactIcons/Spinner';
import { VerifyUpgrade } from '../Billing/VerifyUpgrade';

export function ThankYouPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [shouldVerifyUpgrade, setShouldVerifyUpgrade] = useState(false);

  useEffect(() => {
    const params = getUrlParams();
    const next = params?.next;
    const shouldVerifyUpgrade = params?.s === '1';
    if (!next) {
      return;
    }

    const decodedNextPage = decodeURIComponent(next);
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
      <div className="flex min-h-[472px] flex-col items-center justify-center py-20">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <>
      {shouldVerifyUpgrade && <VerifyUpgrade />}

      <div className="flex flex-col items-center justify-center py-28 pb-36">
        <img
          src="/images/party.gif"
          alt="Thank you"
          className="aspect-square w-24"
        />
        <h1 className="mt-4 text-3xl font-bold">Thank you!</h1>
        <p className="mt-1 text-gray-500">Your purchase has been successful</p>
        {nextPage && (
          <div className="mt-4">
            <a
              href={nextPage}
              className="rounded-md bg-black px-4 py-1.5 text-white hover:bg-gray-800"
            >
              {pageType === 'course'
                ? 'Visit the Course'
                : pageType === 'ai-tutor'
                  ? 'Visit the AI Tutor'
                  : 'Visit the Page'}
            </a>
          </div>
        )}
      </div>
    </>
  );
}
