import { useEffect, useMemo, useRef, useState } from 'react';

import { useKeydown } from '../../hooks/use-keydown';
import { useLoadTopic } from '../../hooks/use-load-topic';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useToggleTopic } from '../../hooks/use-toggle-topic';
import { httpGet } from '../../lib/http';
import { isLoggedIn } from '../../lib/jwt';
import type { ResourceType } from '../../lib/resource-progress';
import {
  isTopicDone,
  refreshProgressCounters,
  renderTopicProgress,
  updateResourceProgress as updateResourceProgressApi,
} from '../../lib/resource-progress';
import { pageProgressMessage } from '../../stores/page';
import { showLoginPopup } from '../../lib/popup';
import { useToast } from '../../hooks/use-toast';
import type {
  AllowedLinkTypes,
  RoadmapContentDocument,
} from '../CustomRoadmap/CustomRoadmap';
import { markdownToHtml, sanitizeMarkdown } from '../../lib/markdown';
import { Ban, FileText, HeartHandshake, Star, X } from 'lucide-react';
import { getUrlParams, parseUrl } from '../../lib/browser';
import { Spinner } from '../ReactIcons/Spinner';
import { GitHubIcon } from '../ReactIcons/GitHubIcon.tsx';
import { GoogleIcon } from '../ReactIcons/GoogleIcon.tsx';
import { YouTubeIcon } from '../ReactIcons/YouTubeIcon.tsx';
import { resourceTitleFromId } from '../../lib/roadmap.ts';
import { lockBodyScroll } from '../../lib/dom.ts';
import { TopicDetailLink } from './TopicDetailLink.tsx';
import { ResourceListSeparator } from './ResourceListSeparator.tsx';
import { PaidResourceDisclaimer } from './PaidResourceDisclaimer.tsx';
import {
  TopicDetailsTabs,
  type AllowedTopicDetailsTabs,
} from './TopicDetailsTabs.tsx';
import { TopicDetailAI } from './TopicDetailAI.tsx';
import { cn } from '../../lib/classname.ts';
import type { AIChatHistoryType } from '../GenerateCourse/AICourseLessonChat.tsx';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal.tsx';
import { TopicProgressButton } from './TopicProgressButton.tsx';

type TopicDetailProps = {
  resourceId?: string;
  resourceTitle?: string;
  resourceType?: ResourceType;

  isEmbed?: boolean;
  canSubmitContribution: boolean;
};

type PaidResourceType = {
  _id?: string;
  title: string;
  type: 'course' | 'book' | 'other';
  url: string;
  topicIds: string[];
};

const paidResourcesCache: Record<string, PaidResourceType[]> = {};

export const defaultChatHistory: AIChatHistoryType[] = [
  {
    role: 'assistant',
    content: 'Hey, I am your AI instructor. How can I help you today? 🤖',
    isDefault: true,
  },
];

async function fetchRoadmapPaidResources(roadmapId: string) {
  if (paidResourcesCache[roadmapId]) {
    return paidResourcesCache[roadmapId];
  }

  const { response, error } = await httpGet<PaidResourceType[]>(
    `${import.meta.env.PUBLIC_API_URL}/v1-list-roadmap-paid-resources/${roadmapId}`,
  );

  if (!response || error) {
    console.error(error);
    return [];
  }

  paidResourcesCache[roadmapId] = response;

  return response;
}

const PAID_RESOURCE_DISCLAIMER_HIDDEN = 'paid-resource-disclaimer-hidden';

export function TopicDetail(props: TopicDetailProps) {
  const {
    canSubmitContribution,
    resourceId: defaultResourceId,
    isEmbed = false,
    resourceTitle,
  } = props;

  const [hasEnoughLinks, setHasEnoughLinks] = useState(false);
  const [contributionUrl, setContributionUrl] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isContributing, setIsContributing] = useState(false);
  const [error, setError] = useState('');
  const [topicHtml, setTopicHtml] = useState('');
  const [hasContent, setHasContent] = useState(false);
  const [topicTitle, setTopicTitle] = useState('');
  const [topicHtmlTitle, setTopicHtmlTitle] = useState('');
  const [links, setLinks] = useState<RoadmapContentDocument['links']>([]);
  const [activeTab, setActiveTab] =
    useState<AllowedTopicDetailsTabs>('content');
  const [aiChatHistory, setAiChatHistory] =
    useState<AIChatHistoryType[]>(defaultChatHistory);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isCustomResource, setIsCustomResource] = useState(false);

  const toast = useToast();

  const [showPaidResourceDisclaimer, setShowPaidResourceDisclaimer] =
    useState(false);

  const { secret } = getUrlParams() as { secret: string };
  const isGuest = useMemo(() => !isLoggedIn(), []);
  const topicRef = useRef<HTMLDivElement>(null);

  // Details of the currently loaded topic
  const [topicId, setTopicId] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [resourceType, setResourceType] = useState<ResourceType>('roadmap');
  const [paidResources, setPaidResources] = useState<PaidResourceType[]>([]);

  const handleClose = () => {
    setIsActive(false);
    setShowUpgradeModal(false);
    setAiChatHistory(defaultChatHistory);
    setActiveTab('content');
  };

  // Close the topic detail when user clicks outside the topic detail
  useOutsideClick(topicRef, handleClose);
  useKeydown('Escape', handleClose);

  useEffect(() => {
    if (resourceType !== 'roadmap' || !defaultResourceId) {
      return;
    }

    setShowPaidResourceDisclaimer(
      localStorage.getItem(PAID_RESOURCE_DISCLAIMER_HIDDEN) !== 'true',
    );

    fetchRoadmapPaidResources(defaultResourceId).then((resources) => {
      setPaidResources(resources);
    });
  }, [defaultResourceId]);

  // Toggle topic is available even if the component UI is not active
  // This is used on the best practice screen where we have the checkboxes
  // to mark the topic as done/undone.
  useToggleTopic(({ topicId, resourceType, resourceId }) => {
    if (isGuest) {
      showLoginPopup();
      return;
    }

    pageProgressMessage.set('Updating');

    // Toggle the topic status
    isTopicDone({ topicId, resourceId, resourceType })
      .then((oldIsDone) =>
        updateResourceProgressApi(
          {
            topicId,
            resourceId,
            resourceType,
          },
          oldIsDone ? 'pending' : 'done',
        ),
      )
      .then(({ done = [] }) => {
        renderTopicProgress(
          topicId,
          done.includes(topicId) ? 'done' : 'pending',
        );
        refreshProgressCounters();
      })
      .catch((err) => {
        toast.error(err.message);
        console.error(err);
      })
      .finally(() => {
        pageProgressMessage.set('');
      });
  });

  // Load the topic detail when the topic detail is active
  useLoadTopic(({ topicId, resourceType, resourceId, isCustomResource }) => {
    setError('');
    setIsLoading(true);
    setIsActive(true);

    setTopicId(topicId);
    setResourceType(resourceType);
    setResourceId(resourceId);
    setIsCustomResource(isCustomResource);

    const topicPartial = topicId.replaceAll(':', '/');
    let topicUrl =
      resourceType === 'roadmap'
        ? `/${resourceId}/${topicPartial}`
        : `/best-practices/${resourceId}/${topicPartial}`;

    if (isCustomResource) {
      topicUrl = `${
        import.meta.env.PUBLIC_API_URL
      }/v1-get-node-content/${resourceId}/${topicId}${
        secret ? `?secret=${secret}` : ''
      }`;
    }

    httpGet<string | RoadmapContentDocument>(
      topicUrl,
      {},
      {
        ...(!isCustomResource && {
          headers: {
            Accept: 'text/html',
          },
        }),
      },
    )
      .then(({ response }) => {
        if (!response) {
          setError('Topic not found.');
          setIsLoading(false);
          return;
        }
        let topicHtml = '';
        if (!isCustomResource) {
          const topicDom = new DOMParser().parseFromString(
            response as string,
            'text/html',
          );

          const links = topicDom.querySelectorAll('a');
          const urlElem: HTMLElement =
            topicDom.querySelector('[data-github-url]')!;
          const contributionUrl = urlElem?.dataset?.githubUrl || '';

          const titleElem: HTMLElement = topicDom.querySelector('h1')!;
          const otherElems = topicDom.querySelectorAll('body > *:not(h1, div)');

          let ulWithLinks: HTMLUListElement = document.createElement('ul');

          // we need to remove the `ul` with just links (i.e. resource links)
          // and show them separately.
          topicDom.querySelectorAll('ul').forEach((ul) => {
            const lisWithJustLinks = Array.from(
              ul.querySelectorAll('li'),
            ).filter((li) => {
              return (
                li.children.length === 1 &&
                li.children[0].tagName === 'A' &&
                li.children[0].textContent === li.textContent
              );
            });

            if (lisWithJustLinks.length > 0) {
              ulWithLinks = ul;
            }
          });

          const listLinks = Array.from(ulWithLinks.querySelectorAll('li > a'))
            .map((link, counter) => {
              const typePattern = /@([a-z.]+)@/;
              let linkText = link.textContent || '';
              const linkHref = link.getAttribute('href') || '';
              const linkType = linkText.match(typePattern)?.[1] || 'article';

              linkText = linkText.replace(typePattern, '');

              return {
                id: `link-${linkHref}-${counter}`,
                title: linkText,
                url: linkHref,
                type: linkType as AllowedLinkTypes,
              };
            })
            .sort((a, b) => {
              // official at the top
              // opensource at second
              // article at third
              // videos at fourth
              // rest at last
              const order = [
                'official',
                'opensource',
                'article',
                'video',
                'feed',
              ];
              return order.indexOf(a.type) - order.indexOf(b.type);
            });

          if (ulWithLinks) {
            ulWithLinks.remove();
          }

          topicHtml = topicDom.body.innerHTML;

          setLinks(listLinks);
          setHasContent(otherElems.length > 0);
          setContributionUrl(contributionUrl);
          setHasEnoughLinks(links.length >= 3);
          setTopicHtmlTitle(titleElem?.textContent || '');
        } else {
          setLinks((response as RoadmapContentDocument)?.links || []);
          setTopicTitle((response as RoadmapContentDocument)?.title || '');

          const sanitizedMarkdown = sanitizeMarkdown(
            (response as RoadmapContentDocument).description || '',
          );

          setHasContent(sanitizedMarkdown?.length > 0);
          topicHtml = markdownToHtml(sanitizedMarkdown, false);
        }

        setIsLoading(false);
        setTopicHtml(topicHtml);
      })
      .catch((err) => {
        setError('Something went wrong. Please try again later.');
        setIsLoading(false);
      });
  });

  useEffect(() => {
    if (isActive) topicRef?.current?.focus();

    lockBodyScroll(isActive);
  }, [isActive]);

  if (!isActive) {
    return null;
  }

  const resourceTitleForSearch = resourceTitle
    ?.toLowerCase()
    ?.replace(/\s+?roadmap/gi, '');
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(topicHtmlTitle?.toLowerCase())} guide for ${encodeURIComponent(resourceTitleForSearch || '')}`;
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(topicHtmlTitle?.toLowerCase())} for ${encodeURIComponent(resourceTitleForSearch || '')}`;

  const tnsLink =
    'https://thenewstack.io/devops/?utm_source=roadmap.sh&utm_medium=Referral&utm_campaign=Topic';

  const paidResourcesForTopic = paidResources.filter((resource) => {
    const normalizedTopicId =
      topicId.indexOf('@') !== -1 ? topicId.split('@')[1] : topicId;
    return resource.topicIds.includes(normalizedTopicId);
  });

  const hasPaidScrimbaLinks = paidResourcesForTopic.some(
    (resource) => resource?.url?.toLowerCase().indexOf('scrimba') !== -1,
  );

  const shouldShowAiTab = !isCustomResource && resourceType === 'roadmap';

  return (
    <div className={'relative z-92'}>
      <div
        ref={topicRef}
        tabIndex={0}
        className="fixed top-0 right-0 z-40 flex h-screen w-full flex-col overflow-y-auto bg-white p-4 focus:outline-0 sm:max-w-[600px] sm:p-6"
      >
        {showUpgradeModal && (
          <UpgradeAccountModal onClose={() => setShowUpgradeModal(false)} />
        )}

        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner
              outerFill="#d1d5db"
              className="h-6 w-6 sm:h-8 sm:w-8"
              innerFill="#2563eb"
              isDualRing={false}
            />
          </div>
        )}

        {!isContributing && !isLoading && !error && (
          <>
            <div
              className={cn('flex-1', {
                'flex flex-col': activeTab === 'ai',
              })}
            >
              <div
                className={cn(
                  '-mt-4 mb-2 flex items-center justify-between py-1.5',
                )}
              >
                <div>
                  <a
                    href={contributionUrl}
                    target={'_blank'}
                    className="flex w-full items-center justify-center rounded-md px-2 py-1 text-sm text-xs text-black transition-colors hover:bg-black hover:text-white disabled:bg-green-200 disabled:text-black"
                  >
                    <GitHubIcon className="mr-1.5 inline-block size-[12px] text-current" />
                    Edit this content
                  </a>
                </div>
                <button
                  type="button"
                  id="close-topic"
                  className="flex items-center gap-2 rounded-lg bg-transparent px-1.5 py-1 text-xs tracking-wider text-gray-400 uppercase hover:bg-gray-200 hover:text-gray-900"
                  onClick={handleClose}
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  {shouldShowAiTab && (
                    <TopicDetailsTabs
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  )}
                </div>
                {!isEmbed && (
                  <TopicProgressButton
                    topicId={
                      topicId.indexOf('@') !== -1
                        ? topicId.split('@')[1]
                        : topicId
                    }
                    resourceId={resourceId}
                    resourceType={resourceType}
                    onClose={handleClose}
                  />
                )}
              </div>

              {activeTab === 'ai' && shouldShowAiTab && (
                <TopicDetailAI
                  resourceId={resourceId}
                  resourceType={resourceType}
                  topicId={topicId}
                  aiChatHistory={aiChatHistory}
                  setAiChatHistory={setAiChatHistory}
                  onUpgrade={() => setShowUpgradeModal(true)}
                />
              )}

              {activeTab === 'content' && (
                <>
                  {hasContent ? (
                    <>
                      <div className="prose prose-quoteless prose-h1:mb-2.5 prose-h1:mt-7 prose-h1:text-balance prose-h2:mb-3 prose-h2:mt-0 prose-h3:mb-[5px] prose-h3:mt-[10px] prose-p:mb-2 prose-p:mt-0 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-li:m-0 prose-li:mb-0.5">
                        {topicTitle && <h1>{topicTitle}</h1>}
                        <div
                          id="topic-content"
                          dangerouslySetInnerHTML={{ __html: topicHtml }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {!canSubmitContribution && (
                        <div className="flex h-[calc(100%-38px)] flex-col items-center justify-center">
                          <FileText className="h-16 w-16 text-gray-300" />
                          <p className="mt-2 text-lg font-medium text-gray-500">
                            Empty Content
                          </p>
                        </div>
                      )}
                      {canSubmitContribution && (
                        <div className="mx-auto flex h-[calc(100%-38px)] max-w-[400px] flex-col items-center justify-center text-center">
                          <HeartHandshake className="mb-2 h-16 w-16 text-gray-300" />
                          <p className="text-lg font-semibold text-gray-900">
                            Help us write this content
                          </p>
                          <p className="mt-2 mb-3 text-sm text-gray-500">
                            Write a brief introduction to this topic and submit
                            a link to a good article, podcast, video, or any
                            other self-vetted resource that helped you
                            understand this topic better.
                          </p>
                          <a
                            href={contributionUrl}
                            target={'_blank'}
                            className="flex w-full items-center justify-center rounded-md bg-gray-800 p-2 text-sm text-white transition-colors hover:bg-black hover:text-white disabled:bg-green-200 disabled:text-black"
                          >
                            <GitHubIcon className="mr-2 inline-block h-4 w-4 text-white" />
                            Help us Write this Content
                          </a>
                        </div>
                      )}
                    </>
                  )}

                  {links.length > 0 && (
                    <>
                      <ResourceListSeparator
                        text="Free Resources"
                        className="text-green-600"
                        icon={HeartHandshake}
                      />
                      <ul className="mt-4 ml-3 space-y-1">
                        {links.map((link) => {
                          return (
                            <li key={link.id}>
                              <TopicDetailLink
                                url={link.url}
                                type={link.type}
                                title={link.title}
                                onClick={() => {
                                  // if it is one of our roadmaps, we want to track the click
                                  if (canSubmitContribution) {
                                    const parsedUrl = parseUrl(link.url);

                                    window.fireEvent({
                                      category: 'TopicResourceClick',
                                      action: `Click: ${parsedUrl.hostname}`,
                                      label: `${resourceType} / ${resourceId} / ${topicId} / ${link.url}`,
                                    });
                                  }
                                }}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}

                  {paidResourcesForTopic.length > 0 && (
                    <>
                      <ResourceListSeparator
                        text="Premium Resources"
                        icon={Star}
                      />

                      <ul className="mt-3 ml-3 space-y-1">
                        {paidResourcesForTopic.map((resource) => {
                          return (
                            <li key={resource._id}>
                              <TopicDetailLink
                                url={resource.url}
                                type={resource.type as any}
                                title={resource.title}
                                isPaid={true}
                              />
                            </li>
                          );
                        })}
                      </ul>

                      {showPaidResourceDisclaimer && (
                        <PaidResourceDisclaimer
                          onClose={() => {
                            localStorage.setItem(
                              PAID_RESOURCE_DISCLAIMER_HIDDEN,
                              'true',
                            );
                            setShowPaidResourceDisclaimer(false);
                          }}
                        />
                      )}
                    </>
                  )}

                  {canSubmitContribution &&
                    !hasEnoughLinks &&
                    contributionUrl &&
                    hasContent && (
                      <div className="mt-3 mb-12 border-t text-sm text-gray-400 sm:mt-12">
                        <div className="mt-3 mb-4">
                          <p className="">
                            Find more resources using these pre-filled search
                            queries:
                          </p>
                          <div className="mt-3 flex gap-2 text-gray-700">
                            <a
                              href={googleSearchUrl}
                              target="_blank"
                              className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 pl-2 text-xs hover:border-gray-700 hover:bg-gray-100"
                            >
                              <GoogleIcon className={'h-4 w-4'} />
                              Google
                            </a>
                            <a
                              href={youtubeSearchUrl}
                              target="_blank"
                              className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 pl-2 text-xs hover:border-gray-700 hover:bg-gray-100"
                            >
                              <YouTubeIcon className={'h-4 w-4 text-red-500'} />
                              YouTube
                            </a>
                          </div>
                        </div>

                        <p className="mt-2 mb-2 leading-relaxed">
                          This popup should be a brief introductory paragraph
                          for the topic and a few links to good articles,
                          videos, or any other self-vetted resources. Please
                          consider submitting a PR to improve this content.
                        </p>
                        <a
                          href={contributionUrl}
                          target={'_blank'}
                          className="flex w-full items-center justify-center rounded-md bg-gray-800 p-2 text-sm text-white transition-colors hover:bg-black hover:text-white disabled:bg-green-200 disabled:text-black"
                        >
                          <GitHubIcon className="mr-2 inline-block h-4 w-4 text-white" />
                          Help us Improve this Content
                        </a>
                      </div>
                    )}
                </>
              )}
            </div>

            {resourceId === 'devops' && activeTab === 'content' && (
              <div className="mt-4">
                <a
                  href={tnsLink}
                  target="_blank"
                  className="hidden rounded-md border bg-gray-200 px-2 py-2 text-sm hover:bg-gray-300 sm:block"
                >
                  <span className="badge mr-1.5">Partner</span>
                  Get the latest {resourceTitleFromId(resourceId)} news from our
                  sister site{' '}
                  <span className="font-medium underline underline-offset-1">
                    TheNewStack.io
                  </span>
                </a>

                <a
                  href={tnsLink}
                  className="hidden rounded-md border bg-gray-200 px-2 py-1.5 text-sm hover:bg-gray-300 min-[390px]:block sm:hidden"
                  onClick={() => {
                    window.fireEvent({
                      category: 'PartnerClick',
                      action: 'TNS Redirect',
                      label: 'Roadmap Topic / TNS Link',
                    });
                  }}
                >
                  <span className="badge mr-1.5">Partner</span>
                  Visit{' '}
                  <span className="font-medium underline underline-offset-1">
                    TheNewStack.io
                  </span>{' '}
                  for {resourceTitleFromId(resourceId)} news
                </a>
              </div>
            )}
          </>
        )}

        {!isContributing && !isLoading && error && (
          <>
            <button
              type="button"
              id="close-topic"
              className="absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              onClick={() => {
                setIsActive(false);
                setIsContributing(false);
              }}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex h-full flex-col items-center justify-center">
              <Ban className="h-16 w-16 text-red-500" />
              <p className="mt-2 text-lg font-medium text-red-500">{error}</p>
            </div>
          </>
        )}
      </div>
      <div className="fixed inset-0 z-30 bg-gray-900/50"></div>
    </div>
  );
}
