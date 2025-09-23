import { useEffect, useMemo, useRef, useState } from 'react';

import { useChat } from '@ai-sdk/react';
import { useQuery } from '@tanstack/react-query';
import {
  Ban,
  FileText, HeartHandshake,
  Star,
  X,
  Zap
} from 'lucide-react';
import { useKeydown } from '../../hooks/use-keydown';
import { useLoadTopic } from '../../hooks/use-load-topic';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useToast } from '../../hooks/use-toast';
import { useToggleTopic } from '../../hooks/use-toggle-topic';
import { topicDetailAiChatTransport } from '../../lib/ai.ts';
import { getUrlParams, parseUrl } from '../../lib/browser';
import { cn } from '../../lib/classname.ts';
import { lockBodyScroll } from '../../lib/dom.ts';
import { httpGet } from '../../lib/http';
import { isLoggedIn } from '../../lib/jwt';
import { markdownToHtml, sanitizeMarkdown } from '../../lib/markdown';
import { showLoginPopup } from '../../lib/popup';
import type { ResourceType } from '../../lib/resource-progress';
import {
  isTopicDone,
  refreshProgressCounters,
  renderTopicProgress,
  updateResourceProgress as updateResourceProgressApi,
} from '../../lib/resource-progress';
import { type AllowedRoadmapRenderer } from '../../lib/roadmap.ts';
import { aiLimitOptions } from '../../queries/ai-course.ts';
import { billingDetailsOptions } from '../../queries/billing.ts';
import { roadmapTreeMappingOptions } from '../../queries/roadmap-tree.ts';
import { pageProgressMessage } from '../../stores/page';
import { queryClient } from '../../stores/query-client.ts';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal.tsx';
import type {
  AllowedLinkTypes,
  RoadmapContentDocument,
} from '../CustomRoadmap/CustomRoadmap';
import type { AIChatHistoryType } from '../GenerateCourse/AICourseLessonChat.tsx';
import { GitHubIcon } from '../ReactIcons/GitHubIcon.tsx';
import { Spinner } from '../ReactIcons/Spinner';
import { CreateCourseModal } from './CreateCourseModal.tsx';
import { PaidResourceDisclaimer } from './PaidResourceDisclaimer.tsx';
import { ResourceListSeparator } from './ResourceListSeparator.tsx';
import { TopicDetailAI } from './TopicDetailAI.tsx';
import { TopicDetailLink } from './TopicDetailLink.tsx';
import {
  TopicDetailsTabs,
  type AllowedTopicDetailsTabs,
} from './TopicDetailsTabs.tsx';
import { TopicProgressButton } from './TopicProgressButton.tsx';

type PaidResourceType = {
  _id?: string;
  title: string;
  type: 'course' | 'book' | 'other';
  url: string;
  topicIds: string[];
};

const paidResourcesCache: Record<string, PaidResourceType[]> = {};

export const CLOSE_TOPIC_DETAIL_EVENT = 'close-topic-detail';

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

type TopicDetailProps = {
  resourceId?: string;
  resourceType?: ResourceType;
  renderer?: AllowedRoadmapRenderer;
  defaultActiveTab?: AllowedTopicDetailsTabs;

  hasUpgradeButtons?: boolean;

  isEmbed?: boolean;
  canSubmitContribution: boolean;

  wrapperClassName?: string;
  bodyClassName?: string;
  overlayClassName?: string;
  closeButtonClassName?: string;
  onClose?: () => void;
  shouldCloseOnBackdropClick?: boolean;
  shouldCloseOnEscape?: boolean;
};

export function TopicDetail(props: TopicDetailProps) {
  const {
    hasUpgradeButtons = true,
    canSubmitContribution,
    resourceId: defaultResourceId,
    isEmbed = false,
    renderer = 'balsamiq',
    wrapperClassName,
    bodyClassName,
    overlayClassName,
    closeButtonClassName,
    onClose,
    shouldCloseOnBackdropClick = true,
    shouldCloseOnEscape = true,
    defaultActiveTab = 'content',
  } = props;

  const [contributionUrl, setContributionUrl] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isTopicLoading, setIsTopicLoading] = useState(false);
  const [isContributing, setIsContributing] = useState(false);
  const [error, setError] = useState('');
  const [topicHtml, setTopicHtml] = useState('');
  const [hasContent, setHasContent] = useState(false);
  const [topicTitle, setTopicTitle] = useState('');
  const [links, setLinks] = useState<RoadmapContentDocument['links']>([]);
  const [activeTab, setActiveTab] =
    useState<AllowedTopicDetailsTabs>(defaultActiveTab);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isCustomResource, setIsCustomResource] = useState(false);

  const [showSubjectSearchModal, setShowSubjectSearchModal] = useState(false);

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

  const chatId = `${resourceType}-${resourceId}-${topicId}`;
  const { messages, sendMessage, setMessages, status } = useChat({
    id: chatId,
    transport: topicDetailAiChatTransport,
  });

  const sanitizedTopicId = topicId?.includes('@')
    ? topicId?.split('@')?.[1]
    : topicId;
  const { data: roadmapTreeMapping, isLoading: isRoadmapTreeMappingLoading } =
    useQuery(
      {
        ...roadmapTreeMappingOptions(resourceId),
        select: (data) => {
          const node = data.find(
            (mapping) => mapping.nodeId === sanitizedTopicId,
          );
          return node;
        },
        enabled: !!sanitizedTopicId && !isCustomResource,
      },
      queryClient,
    );
  const { data: tokenUsage, isLoading: isTokenUsageLoading } = useQuery(
    aiLimitOptions(),
    queryClient,
  );

  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } =
    useQuery(billingDetailsOptions(), queryClient);

  const isLimitExceeded = (tokenUsage?.used || 0) >= (tokenUsage?.limit || 0);
  const isPaidUser = userBillingDetails?.status === 'active';

  const isLoading =
    isTopicLoading ||
    isRoadmapTreeMappingLoading ||
    isTokenUsageLoading ||
    isBillingDetailsLoading;

  const handleClose = () => {
    onClose?.();
    setIsActive(false);
    setIsContributing(false);
    setShowUpgradeModal(false);
    setActiveTab('content');
    setShowSubjectSearchModal(false);
    setMessages([]);

    lockBodyScroll(false);

    window.dispatchEvent(new Event(CLOSE_TOPIC_DETAIL_EVENT));
  };

  // Close the topic detail when user clicks outside the topic detail
  useOutsideClick(
    topicRef,
    shouldCloseOnBackdropClick ? handleClose : undefined,
  );
  useKeydown('Escape', shouldCloseOnEscape ? handleClose : undefined);

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
    setIsTopicLoading(true);
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
          setIsTopicLoading(false);
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
          const topicHasContent = otherElems.length > 0;

          setLinks(listLinks);
          setHasContent(topicHasContent);
          setContributionUrl(contributionUrl);

          if (!topicHasContent && renderer === 'editor') {
            setActiveTab('ai');
          }
        } else {
          setLinks((response as RoadmapContentDocument)?.links || []);
          setTopicTitle((response as RoadmapContentDocument)?.title || '');

          const sanitizedMarkdown = sanitizeMarkdown(
            (response as RoadmapContentDocument).description || '',
          );

          setHasContent(sanitizedMarkdown?.length > 0);
          topicHtml = markdownToHtml(sanitizedMarkdown, false);
        }

        setIsTopicLoading(false);
        setTopicHtml(topicHtml);
      })
      .catch((err) => {
        setError('Something went wrong. Please try again later.');
        setIsTopicLoading(false);
      });
  });

  useEffect(() => {
    if (isActive) {
      lockBodyScroll(true);
      topicRef?.current?.focus();
    }
  }, [isActive]);

  if (!isActive) {
    return null;
  }

  const paidResourcesForTopic = paidResources.filter((resource) => {
    const normalizedTopicId =
      topicId.indexOf('@') !== -1 ? topicId.split('@')[1] : topicId;
    return resource.topicIds.includes(normalizedTopicId);
  });

  const shouldShowAiTab = !isCustomResource && resourceType === 'roadmap';
  const subjects = roadmapTreeMapping?.subjects || [];
  const guides = roadmapTreeMapping?.guides || [];
  const hasSubjects = subjects.length > 0;
  const hasGuides = guides.length > 0;

  const hasDataCampResources = paidResources.some((resource) =>
    resource.title.toLowerCase().includes('datacamp'),
  );

  return (
    <div className={cn('relative z-92', wrapperClassName)}>
      <div
        ref={topicRef}
        tabIndex={0}
        className={cn(
          'fixed top-0 right-0 z-40 flex h-screen w-full flex-col overflow-y-auto bg-white p-4 focus:outline-0 sm:max-w-[600px] sm:p-6',
          bodyClassName,
        )}
      >
        {showUpgradeModal && (
          <UpgradeAccountModal onClose={() => setShowUpgradeModal(false)} />
        )}

        {showSubjectSearchModal && (
          <CreateCourseModal onClose={() => setShowSubjectSearchModal(false)} />
        )}

        {isLoading && (
          <div className="flex h-full w-full justify-center">
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
              <div className="flex justify-between">
                {shouldShowAiTab && (
                  <TopicDetailsTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    hasAITutor={renderer === 'editor'}
                  />
                )}
                <div
                  className={cn('flex flex-grow justify-end gap-1', {
                    'justify-between': !shouldShowAiTab,
                  })}
                >
                  {!isEmbed && (
                    <TopicProgressButton
                      topicId={
                        topicId.indexOf('@') !== -1
                          ? topicId.split('@')[1]
                          : topicId
                      }
                      dropdownClassName={
                        !shouldShowAiTab ? 'left-0' : 'right-0'
                      }
                      resourceId={resourceId}
                      resourceType={resourceType}
                      onClose={() => null}
                    />
                  )}
                  <button
                    type="button"
                    id="close-topic"
                    className={cn(
                      'flex items-center gap-1.5 rounded-lg bg-gray-200 px-1.5 py-1 text-xs text-black hover:bg-gray-300 hover:text-gray-900',
                      closeButtonClassName,
                    )}
                    onClick={handleClose}
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              {activeTab === 'ai' && shouldShowAiTab && (
                <TopicDetailAI
                  resourceId={resourceId}
                  resourceType={resourceType}
                  topicId={topicId}
                  messages={messages}
                  setMessages={setMessages}
                  status={status}
                  sendMessage={sendMessage}
                  hasUpgradeButtons={hasUpgradeButtons}
                  onUpgrade={() => setShowUpgradeModal(true)}
                  onLogin={() => {
                    handleClose();
                    showLoginPopup();
                  }}
                  onShowSubjectSearchModal={() => {
                    if (!isLoggedIn()) {
                      showLoginPopup();
                      return;
                    }

                    setShowSubjectSearchModal(true);
                  }}
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

                  {resourceId === 'ai-data-scientist' &&
                    hasDataCampResources && (
                      <div className="mt-5 rounded-md bg-yellow-100 px-4 py-3 text-sm text-gray-600">
                        <p className="text-balance">
                          Follow the resources listed on the roadmap or check
                          out the premium courses by DataCamp listed below.
                        </p>

                        <p className="mt-3 text-balance">
                          They also have an{' '}
                          <a
                            href="https://datacamp.pxf.io/POk5PY"
                            className="font-medium text-blue-600 underline hover:text-blue-800"
                            target="_blank"
                          >
                            Associate Data Scientist in Python
                          </a>{' '}
                          track that covers all the key data scientist skills in
                          one place.
                        </p>
                      </div>
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

                  {(hasSubjects || hasGuides) && (
                    <>
                      <ResourceListSeparator
                        text="Your personalized AI tutor"
                        className="text-blue-600"
                        icon={Zap}
                      />
                      <ul className="mt-4 ml-3 flex flex-col flex-wrap gap-1 text-sm">
                        {subjects.map((subject) => {
                          return (
                            <li key={subject}>
                              <TopicDetailLink
                                url={`/ai/course/search?term=${subject}&src=topic`}
                                type="course"
                                title={subject}
                                onClick={(e) => {
                                  if (!isLoggedIn()) {
                                    e.preventDefault();
                                    showLoginPopup();
                                    return;
                                  }

                                  if (isLimitExceeded && !isPaidUser) {
                                    e.preventDefault();
                                    setShowUpgradeModal(true);
                                    return;
                                  }
                                }}
                              />
                            </li>
                          );
                        })}
                        {guides.map((guide) => {
                          return (
                            <li key={guide}>
                              <TopicDetailLink
                                url={`/ai/guide/search?term=${guide}&src=topic`}
                                type="article"
                                title={guide}
                                onClick={(e) => {
                                  if (!isLoggedIn()) {
                                    e.preventDefault();
                                    showLoginPopup();
                                    return;
                                  }

                                  if (isLimitExceeded && !isPaidUser) {
                                    e.preventDefault();
                                    setShowUpgradeModal(true);
                                    return;
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
                </>
              )}
            </div>

            {canSubmitContribution &&
              contributionUrl &&
              activeTab === 'content' &&
              hasContent && (
                <div className="mt-4">
                  <a
                    href={contributionUrl}
                    target="_blank"
                    className="hidden items-center justify-center rounded-md px-2 py-2 text-sm transition-all hover:bg-gray-200 sm:flex"
                  >
                    <GitHubIcon className="mr-2 inline-block h-4 w-4 text-current" />
                    Help us add resources to this topic
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
                handleClose();
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
      <div
        className={cn('fixed inset-0 z-30 bg-gray-900/50', overlayClassName)}
      ></div>
    </div>
  );
}
