import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import CheckIcon from '../../icons/check.svg';
import CloseIcon from '../../icons/close.svg';
import ResetIcon from '../../icons/reset.svg';
import SpinnerIcon from '../../icons/spinner.svg';

import { useKeydown } from '../../hooks/use-keydown';
import { useLoadTopic } from '../../hooks/use-load-topic';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useToggleTopic } from '../../hooks/use-toggle-topic';
import { httpGet } from '../../lib/http';
import { isLoggedIn } from '../../lib/jwt';
import {
  isTopicDone,
  renderTopicProgress,
  ResourceType,
  toggleMarkTopicDone as toggleMarkTopicDoneApi,
} from '../../lib/resource-progress';
import { pageLoadingMessage, sponsorHidden } from '../../stores/page';

export function TopicDetail() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [topicHtml, setTopicHtml] = useState('');

  const [isDone, setIsDone] = useState<boolean>();
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(true);

  const isGuest = useMemo(() => !isLoggedIn(), []);
  const topicRef = useRef<HTMLDivElement>(null);

  // Details of the currently loaded topic
  const [topicId, setTopicId] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [resourceType, setResourceType] = useState<ResourceType>('roadmap');

  const showLoginPopup = () => {
    const popupEl = document.querySelector(`#login-popup`);
    if (!popupEl) {
      return;
    }

    popupEl.classList.remove('hidden');
    popupEl.classList.add('flex');
    const focusEl = popupEl.querySelector<HTMLElement>('[autofocus]');
    if (focusEl) {
      focusEl.focus();
    }
  };

  const toggleMarkTopicDone = (isDone: boolean) => {
    setIsUpdatingProgress(true);
    toggleMarkTopicDoneApi({ topicId, resourceId, resourceType }, isDone)
      .then(() => {
        setIsDone(isDone);
        setIsActive(false);
        renderTopicProgress(topicId, isDone);
      })
      .catch((err) => {
        alert(err.message);
        console.error(err);
      })
      .finally(() => {
        setIsUpdatingProgress(false);
      });
  };

  // Load the topic status when the topic detail is active
  useEffect(() => {
    if (!topicId || !resourceId || !resourceType) {
      return;
    }

    setIsUpdatingProgress(true);
    isTopicDone({ topicId, resourceId, resourceType })
      .then((status: boolean) => {
        setIsUpdatingProgress(false);
        setIsDone(status);
      })
      .catch(console.error);
  }, [topicId, resourceId, resourceType]);

  // Close the topic detail when user clicks outside the topic detail
  useOutsideClick(topicRef, () => {
    setIsActive(false);
  });

  useKeydown('Escape', () => {
    setIsActive(false);
  });

  // Toggle topic is available even if the component UI is not active
  // This is used on the best practice screen where we have the checkboxes
  // to mark the topic as done/undone.
  useToggleTopic(({ topicId, resourceType, resourceId }) => {
    if (isGuest) {
      showLoginPopup();
      return;
    }

    pageLoadingMessage.set('Updating');

    // Toggle the topic status
    isTopicDone({ topicId, resourceId, resourceType })
      .then((oldIsDone) => {
        return toggleMarkTopicDoneApi(
          {
            topicId,
            resourceId,
            resourceType,
          },
          !oldIsDone
        );
      })
      .then((newIsDone) => renderTopicProgress(topicId, newIsDone))
      .catch((err) => {
        alert(err.message);
        console.error(err);
      })
      .finally(() => {
        pageLoadingMessage.set('');
      });
  });

  // Load the topic detail when the topic detail is active
  useLoadTopic(({ topicId, resourceType, resourceId }) => {
    setIsLoading(true);
    setIsActive(true);
    sponsorHidden.set(true);

    setTopicId(topicId);
    setResourceType(resourceType);
    setResourceId(resourceId);

    const topicPartial = topicId.replaceAll(':', '/');
    const topicUrl =
      resourceType === 'roadmap'
        ? `/${resourceId}/${topicPartial}`
        : `/best-practices/${resourceId}/${topicPartial}`;

    httpGet<string>(
      topicUrl,
      {},
      {
        headers: {
          Accept: 'text/html',
        },
      }
    )
      .then(({ response }) => {
        if (!response) {
          setError('Topic not found.');
          return;
        }

        // It's full HTML with page body, head etc.
        // We only need the inner HTML of the #main-content
        const node = new DOMParser().parseFromString(response, 'text/html');
        const topicHtml = node?.getElementById('main-content')?.outerHTML || '';

        setIsLoading(false);
        setTopicHtml(topicHtml);
      })
      .catch((err) => {
        setError('Something went wrong. Please try again later.');
        setIsLoading(false);
      });
  });

  if (!isActive) {
    return null;
  }

  return (
    <div>
      <div
        ref={topicRef}
        className="fixed right-0 top-0 z-40 h-screen w-full overflow-y-auto bg-white p-4 sm:max-w-[600px] sm:p-6"
      >
        {isLoading && (
          <div className="flex w-full justify-center">
            <img
              src={SpinnerIcon}
              alt="Loading"
              className="h-6 w-6 animate-spin fill-blue-600 text-gray-200 sm:h-12 sm:w-12"
            />
          </div>
        )}

        {!isLoading && !error && (
          <>
            {/* Actions for the topic */}
            <div className="mb-2">
              {isGuest && (
                <button
                  data-popup="login-popup"
                  className="inline-flex items-center rounded-md bg-green-600 p-1 px-2 text-sm text-white hover:bg-green-700"
                  onClick={() => setIsActive(false)}
                >
                  <img alt="Check" class='w-3' src={CheckIcon} />
                  <span className="ml-2">Mark as Done</span>
                </button>
              )}

              {!isGuest && (
                <>
                  {isUpdatingProgress && (
                    <button className="inline-flex cursor-default items-center rounded-md border border-gray-300 bg-white p-1 px-2 text-sm text-black">
                      <img
                        alt="Check"
                        class="h-4 w-4 animate-spin"
                        src={SpinnerIcon}
                      />
                      <span className="ml-2">Updating Status..</span>
                    </button>
                  )}
                  {!isUpdatingProgress && !isDone && (
                    <button
                      className="inline-flex items-center rounded-md border border-green-600 bg-green-600 p-1 px-2 text-sm text-white hover:bg-green-700"
                      onClick={() => toggleMarkTopicDone(true)}
                    >
                      <img alt="Check" class="w-3" src={CheckIcon} />
                      <span className="ml-2">Mark as Done</span>
                    </button>
                  )}

                  {!isUpdatingProgress && isDone && (
                    <button
                      className="inline-flex items-center rounded-md border border-red-600 bg-red-600 p-1 px-2 text-sm text-white hover:bg-red-700"
                      onClick={() => toggleMarkTopicDone(false)}
                    >
                      <img alt="Check" class="h-4" src={ResetIcon} />
                      <span className="ml-2">Mark as Pending</span>
                    </button>
                  )}
                </>
              )}

              <button
                type="button"
                id="close-topic"
                className="absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                onClick={() => setIsActive(false)}
              >
                <img alt="Close" class="h-5 w-5" src={CloseIcon} />
              </button>
            </div>

            {/* Topic Content */}
            <div
              id="topic-content"
              className="prose prose-quoteless prose-h1:mb-2.5 prose-h1:mt-7 prose-h2:mb-3 prose-h2:mt-0 prose-h3:mb-[5px] prose-h3:mt-[10px] prose-p:mb-2 prose-p:mt-0 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-li:m-0 prose-li:mb-0.5"
              dangerouslySetInnerHTML={{ __html: topicHtml }}
            ></div>
          </>
        )}
      </div>
      <div class="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"></div>
    </div>
  );
}
