import './GenerateRoadmap.css';

import {
  type FormEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useToast } from '../../hooks/use-toast';
import { generateAIRoadmapFromText, renderFlowJSON } from '@roadmapsh/editor';
import { replaceChildren } from '../../lib/dom';
import {
  isLoggedIn,
  removeAuthToken,
  setAIReferralCode,
  visitAIRoadmap,
} from '../../lib/jwt';
import { RoadmapSearch } from './RoadmapSearch.tsx';
import { Spinner } from '../ReactIcons/Spinner.tsx';
import { Ban, Download, PenSquare, Save, Wand } from 'lucide-react';
import { ShareRoadmapButton } from '../ShareRoadmapButton.tsx';
import { httpGet, httpPost } from '../../lib/http.ts';
import { pageProgressMessage } from '../../stores/page.ts';
import { deleteUrlParam, getUrlParams } from '../../lib/browser.ts';
import { downloadGeneratedRoadmapImage } from '../../helper/download-image.ts';
import { showLoginPopup } from '../../lib/popup.ts';
import { cn } from '../../lib/classname.ts';
import { RoadmapTopicDetail } from './RoadmapTopicDetail.tsx';
import { AIRoadmapAlert } from './AIRoadmapAlert.tsx';
import {
  generateAICourseRoadmapStructure,
  IS_KEY_ONLY_ROADMAP_GENERATION,
  readAIRoadmapStream,
} from '../../lib/ai.ts';
import { AITermSuggestionInput } from './AITermSuggestionInput.tsx';
import { AuthenticationForm } from '../AuthenticationFlow/AuthenticationForm.tsx';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal.tsx';
import { useIsPaidUser } from '../../queries/billing.ts';

export type GetAIRoadmapLimitResponse = {
  used: number;
  limit: number;
  topicUsed: number;
  topicLimit: number;
};

const ROADMAP_ID_REGEX = new RegExp('@ROADMAPID:(\\w+)@');
const ROADMAP_SLUG_REGEX = new RegExp(/@ROADMAPSLUG:([\w-]+)@/);

export type RoadmapNodeDetails = {
  nodeId: string;
  nodeType: string;
  targetGroup?: SVGElement;
  nodeTitle?: string;
  parentTitle?: string;
  parentId?: string;
};

export function getNodeDetails(
  svgElement: SVGElement,
): RoadmapNodeDetails | null {
  const targetGroup = (svgElement?.closest('g') as SVGElement) || {};

  const nodeId = targetGroup?.dataset?.nodeId;
  const nodeType = targetGroup?.dataset?.type;
  const nodeTitle = targetGroup?.dataset?.title;
  const parentTitle = targetGroup?.dataset?.parentTitle;
  const parentId = targetGroup?.dataset?.parentId;
  if (!nodeId || !nodeType) return null;

  return { nodeId, nodeType, targetGroup, nodeTitle, parentTitle, parentId };
}

export const allowedClickableNodeTypes = [
  'topic',
  'subtopic',
  'button',
  'link-item',
];

type GetAIRoadmapResponse = {
  id: string;
  term: string;
  title: string;
  data: string;
};

type GenerateRoadmapProps = {
  roadmapId?: string;
  slug?: string;
  isAuthenticatedUser?: boolean;
};

export function GenerateRoadmap(props: GenerateRoadmapProps) {
  const {
    roadmapId: defaultRoadmapId,
    slug: defaultRoadmapSlug,
    isAuthenticatedUser = isLoggedIn(),
  } = props;

  const roadmapContainerRef = useRef<HTMLDivElement>(null);

  const { isPaidUser, isLoading: isLoadingPaidUser } = useIsPaidUser();
  const { rc: referralCode } = getUrlParams() as {
    rc?: string;
  };
  const toast = useToast();

  const [roadmapId, setRoadmapId] = useState<string | undefined>(
    defaultRoadmapId,
  );
  const [roadmapSlug, setRoadmapSlug] = useState<string | undefined>(
    defaultRoadmapSlug,
  );
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(Boolean(roadmapId));
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [roadmapTerm, setRoadmapTerm] = useState('');
  const [currentRoadmap, setCurrentRoadmap] =
    useState<GetAIRoadmapResponse | null>(null);
  const [generatedRoadmapContent, setGeneratedRoadmapContent] = useState('');
  const [selectedNode, setSelectedNode] = useState<RoadmapNodeDetails | null>(
    null,
  );

  const [roadmapLimit, setRoadmapLimit] = useState(0);
  const [roadmapLimitUsed, setRoadmapLimitUsed] = useState(0);
  const [roadmapTopicLimit, setRoadmapTopicLimit] = useState(0);
  const [roadmapTopicLimitUsed, setRoadmapTopicLimitUsed] = useState(0);
  const [isConfiguring, setIsConfiguring] = useState(false);

  const isKeyOnly = IS_KEY_ONLY_ROADMAP_GENERATION;

  const renderRoadmap = async (roadmap: string) => {
    const result = generateAICourseRoadmapStructure(roadmap);
    const { nodes, edges } = generateAIRoadmapFromText(result);
    const svg = await renderFlowJSON({ nodes, edges });
    if (roadmapContainerRef?.current) {
      replaceChildren(roadmapContainerRef?.current, svg);
    }
  };

  const loadTermRoadmap = async (term: string) => {
    setIsLoading(true);
    setHasSubmitted(true);

    deleteUrlParam('id');
    setCurrentRoadmap(null);

    const origin = window.location.origin;
    const response = await fetch(
      `${import.meta.env.PUBLIC_API_URL}/v1-generate-ai-roadmap`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ term }),
      },
    );

    if (!response.ok) {
      const data = await response.json();

      toast.error(data?.message || 'Something went wrong');
      setIsLoading(false);

      // Logout user if token is invalid
      if (data.status === 401) {
        removeAuthToken();
        window.location.reload();
      }
    }

    const reader = response.body?.getReader();

    if (!reader) {
      setIsLoading(false);
      toast.error('Something went wrong');
      return;
    }

    await readAIRoadmapStream(reader, {
      onStream: async (result) => {
        if (result.includes('@ROADMAPID') || result.includes('@ROADMAPSLUG')) {
          // @ROADMAPID: is a special token that we use to identify the roadmap
          // @ROADMAPID:1234@ is the format, we will remove the token and the id
          // and replace it with a empty string
          const roadmapId = result.match(ROADMAP_ID_REGEX)?.[1] || '';
          const roadmapSlug = result.match(ROADMAP_SLUG_REGEX)?.[1] || '';

          if (roadmapSlug) {
            window.history.pushState(
              {
                roadmapId,
                roadmapSlug,
              },
              '',
              `${origin}/ai-roadmaps/${roadmapSlug}`,
            );
          }

          result = result
            .replace(ROADMAP_ID_REGEX, '')
            .replace(ROADMAP_SLUG_REGEX, '');

          setRoadmapId(roadmapId);
          setRoadmapSlug(roadmapSlug);

          const roadmapTitle =
            result.trim().split('\n')[0]?.replace('#', '')?.trim() || term;
          setRoadmapTerm(roadmapTitle);
          setCurrentRoadmap({
            id: roadmapId,
            term: roadmapTerm,
            title: roadmapTitle,
            data: result,
          });
        }

        await renderRoadmap(result);
      },
      onStreamEnd: async (result) => {
        result = result
          .replace(ROADMAP_ID_REGEX, '')
          .replace(ROADMAP_SLUG_REGEX, '');

        setGeneratedRoadmapContent(result);
        loadAIRoadmapLimit().finally(() => {});
      },
    });

    setIsLoading(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!roadmapTerm || isLoadingResults) {
      return;
    }

    if (roadmapTerm === currentRoadmap?.term) {
      return;
    }

    loadTermRoadmap(roadmapTerm).finally(() => null);
  };

  const saveAIRoadmap = async () => {
    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }

    pageProgressMessage.set('Redirecting to Editor');

    const { nodes, edges } = generateAIRoadmapFromText(generatedRoadmapContent);

    const { response, error } = await httpPost<{
      roadmapId: string;
      roadmapSlug: string;
    }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-save-ai-roadmap/${currentRoadmap?.id}`,
      {
        title: roadmapTerm,
        nodes: nodes.map((node) => ({
          ...node,

          // To reset the width and height of the node
          // so that it can be calculated based on the content in the editor
          width: undefined,
          height: undefined,
          style: {
            ...node.style,
            width: undefined,
            height: undefined,
          },
          measured: {
            width: undefined,
            height: undefined,
          },
        })),
        edges,
      },
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      pageProgressMessage.set('');
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    pageProgressMessage.set('');
    return {
      roadmapId: response.roadmapId,
      roadmapSlug: response.roadmapSlug,
    };
  };

  const downloadGeneratedRoadmapContent = async () => {
    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }

    pageProgressMessage.set('Downloading Roadmap');

    const node = document.getElementById('roadmap-container');
    if (!node) {
      toast.error('Something went wrong');
      return;
    }

    try {
      await downloadGeneratedRoadmapImage(roadmapTerm, node);
      pageProgressMessage.set('');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  const loadAIRoadmapLimit = async () => {
    const { response, error } = await httpGet<GetAIRoadmapLimitResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-ai-roadmap-limit`,
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    const { limit, used, topicLimit, topicUsed } = response;
    setRoadmapLimit(limit);
    setRoadmapLimitUsed(used);
    setRoadmapTopicLimit(topicLimit);
    setRoadmapTopicLimitUsed(topicUsed);
  };

  const loadAIRoadmap = async (roadmapId: string) => {
    pageProgressMessage.set('Loading Roadmap');

    const { response, error } = await httpGet<{
      term: string;
      title: string;
      data: string;
    }>(`${import.meta.env.PUBLIC_API_URL}/v1-get-ai-roadmap/${roadmapId}`);

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      setIsLoading(false);
      return;
    }

    const { term, title, data } = response;
    await renderRoadmap(data);

    setCurrentRoadmap({
      id: roadmapId,
      title: title,
      term: term,
      data,
    });

    setRoadmapTerm(title || term);
    setGeneratedRoadmapContent(data);
    visitAIRoadmap(roadmapId);
  };

  const handleNodeClick = useCallback(
    (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      if (isLoading) {
        return;
      }

      const target = e.target as SVGElement;
      const { nodeId, nodeType, targetGroup, nodeTitle, parentTitle } =
        getNodeDetails(target) || {};
      if (
        !nodeId ||
        !nodeType ||
        !allowedClickableNodeTypes.includes(nodeType) ||
        !nodeTitle
      )
        return;

      if (nodeType === 'button' || nodeType === 'link-item') {
        const link = targetGroup?.dataset?.link || '';
        const isExternalLink = link.startsWith('http');
        if (isExternalLink) {
          window.open(link, '_blank');
        } else {
          window.location.href = link;
        }
        return;
      }

      setSelectedNode({
        nodeId,
        nodeType,
        nodeTitle,
        ...(nodeType === 'subtopic' && { parentTitle }),
      });
    },
    [isLoading],
  );

  useEffect(() => {
    loadAIRoadmapLimit().finally(() => {});
  }, []);

  useEffect(() => {
    if (!referralCode || isLoggedIn()) {
      deleteUrlParam('rc');
      return;
    }

    setAIReferralCode(referralCode);
    deleteUrlParam('rc');
    showLoginPopup();
  }, []);

  useEffect(() => {
    if (!roadmapId || roadmapId === currentRoadmap?.id) {
      return;
    }

    loadAIRoadmap(roadmapId).finally(() => {
      pageProgressMessage.set('');
    });
  }, [roadmapId, currentRoadmap]);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const { roadmapId, roadmapSlug } = e.state || {};
      if (!roadmapId || !roadmapSlug) {
        window.location.reload();
        return;
      }

      setIsLoading(true);
      setHasSubmitted(true);
      setRoadmapId(roadmapId);
      setRoadmapSlug(roadmapSlug);
      loadAIRoadmap(roadmapId).finally(() => {
        setIsLoading(false);
        pageProgressMessage.set('');
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  if (!hasSubmitted) {
    return (
      <RoadmapSearch
        roadmapTerm={roadmapTerm}
        setRoadmapTerm={setRoadmapTerm}
        handleSubmit={handleSubmit}
        limit={roadmapLimit}
        limitUsed={roadmapLimitUsed}
        loadAIRoadmapLimit={loadAIRoadmapLimit}
        isKeyOnly={isKeyOnly}
        onLoadTerm={(term) => {
          setRoadmapTerm(term);
          loadTermRoadmap(term).finally(() => {});
        }}
      />
    );
  }

  const pageUrl = `https://roadmap.sh/ai-roadmaps/${roadmapSlug}`;
  const canGenerateMore = roadmapLimitUsed < roadmapLimit || isPaidUser;
  const isGenerateButtonDisabled =
    isLoadingResults ||
    (isAuthenticatedUser &&
      // if no limit,
      (!roadmapLimit ||
        // no roadmap term,
        !roadmapTerm ||
        // if limit is reached and user is not paid user,
        (roadmapLimitUsed >= roadmapLimit && !isPaidUser) ||
        // if roadmap term is the same as the current roadmap term,
        roadmapTerm === currentRoadmap?.term ||
        // if key only,
        isKeyOnly));

  return (
    <>
      {isConfiguring && (
        <UpgradeAccountModal
          onClose={() => {
            setIsConfiguring(false);
            loadAIRoadmapLimit().finally(() => null);
          }}
        />
      )}

      {selectedNode && currentRoadmap && !isLoading && (
        <RoadmapTopicDetail
          nodeId={selectedNode.nodeId}
          nodeType={selectedNode.nodeType}
          nodeTitle={selectedNode.nodeTitle}
          parentTitle={selectedNode.parentTitle}
          onConfigureOpenAI={() => {
            setSelectedNode(null);
            setIsConfiguring(true);
          }}
          onClose={() => {
            setSelectedNode(null);
            loadAIRoadmapLimit().finally(() => {});
          }}
          roadmapId={currentRoadmap?.id || ''}
          topicLimit={roadmapTopicLimit}
          topicLimitUsed={roadmapTopicLimitUsed}
          onTopicContentGenerateComplete={async () => {
            await loadAIRoadmapLimit();
          }}
        />
      )}

      <section className="flex grow flex-col bg-gray-100">
        <div className="flex items-center justify-center border-b bg-white py-3 sm:py-6">
          {isLoading && (
            <span className="flex items-center gap-2 rounded-full bg-black px-3 py-1 text-white">
              <Spinner isDualRing={false} innerFill={'white'} />
              Generating roadmap ..
            </span>
          )}
          {!isLoading && (
            <div className="container flex grow flex-col items-start">
              <AIRoadmapAlert />
              {isKeyOnly && isAuthenticatedUser && !isPaidUser && (
                <div className="flex flex-row gap-4">
                  <p className={'text-left text-red-500'}>
                    We have hit the limit for AI roadmap generation. Please try
                    again tomorrow or{' '}
                    <button
                      onClick={() => setIsConfiguring(true)}
                      className="font-semibold text-purple-600 underline underline-offset-2"
                    >
                      add more credits.
                    </button>
                  </p>
                </div>
              )}
              {!isKeyOnly && isAuthenticatedUser && !isPaidUser && (
                <div className="mt-2 flex w-full flex-col items-start justify-between gap-2 text-sm sm:flex-row sm:items-center sm:gap-0">
                  <span>
                    <span
                      className={cn(
                        'mr-0.5 inline-block rounded-xl border px-1.5 text-center text-sm tabular-nums text-gray-800',
                        {
                          'animate-pulse border-zinc-300 bg-zinc-300 text-zinc-300':
                            !roadmapLimit,
                        },
                      )}
                    >
                      {roadmapLimitUsed} of {roadmapLimit}
                    </span>{' '}
                    roadmaps generated today.
                  </span>
                  <button
                    onClick={() => setIsConfiguring(true)}
                    className="rounded-xl border border-current px-2 py-0.5 text-left text-sm text-blue-500 transition-colors hover:bg-blue-400 hover:text-white"
                  >
                    Need to generate more?{' '}
                    <span className="font-semibold">Click here.</span>
                  </button>
                </div>
              )}
              {!isAuthenticatedUser && (
                <button
                  className="mt-2 rounded-xl border border-current px-2.5 py-0.5 text-left text-sm font-medium text-blue-500 transition-colors hover:bg-blue-500 hover:text-white sm:text-center"
                  onClick={showLoginPopup}
                >
                  Login to generate your own roadmaps
                </button>
              )}
              <form
                onSubmit={handleSubmit}
                className="my-3 flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-center"
              >
                <AITermSuggestionInput
                  value={roadmapTerm}
                  onValueChange={(value) => setRoadmapTerm(value)}
                  placeholder="e.g. Try searching for Ansible or DevOps"
                  wrapperClassName="grow"
                  onSelect={(id, title) => {
                    loadTermRoadmap(title).finally(() => null);
                  }}
                />
                <button
                  type={'submit'}
                  className={cn(
                    'flex min-w-[127px] shrink-0 items-center justify-center gap-2 rounded-md bg-black px-4 py-2.5 text-white',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                  )}
                  onClick={(e) => {
                    if (!isAuthenticatedUser) {
                      e.preventDefault();
                      showLoginPopup();
                    }
                  }}
                  disabled={isGenerateButtonDisabled}
                >
                  {isLoadingResults && (
                    <>
                      <span>Please wait..</span>
                    </>
                  )}
                  {!isLoadingResults && (
                    <>
                      {!isAuthenticatedUser && (
                        <>
                          <Wand size={20} />
                          Generate
                        </>
                      )}

                      {isAuthenticatedUser && (
                        <>
                          {roadmapLimit > 0 && canGenerateMore && (
                            <>
                              <Wand size={20} />
                              Generate
                            </>
                          )}

                          {roadmapLimit === 0 && <span>Please wait..</span>}

                          {roadmapLimit > 0 && !canGenerateMore && (
                            <span className="flex items-center">
                              <Ban size={15} className="mr-2" />
                              Limit reached
                            </span>
                          )}
                        </>
                      )}
                    </>
                  )}
                </button>
              </form>
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex items-center justify-between gap-2">
                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-yellow-400 py-1.5 pl-2.5 pr-3 text-xs font-medium transition-opacity duration-300 hover:bg-yellow-500 sm:text-sm"
                    onClick={downloadGeneratedRoadmapContent}
                  >
                    <Download size={15} />
                    Download
                  </button>
                  {roadmapId && (
                    <ShareRoadmapButton
                      description={`Check out ${roadmapTerm} roadmap I generated on roadmap.sh`}
                      pageUrl={pageUrl}
                    />
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-200 py-1.5 pl-2.5 pr-3 text-xs font-medium text-black transition-colors duration-300 hover:bg-gray-300 sm:text-sm"
                    onClick={async () => {
                      const response = await saveAIRoadmap();
                      if (response?.roadmapSlug) {
                        window.location.href = `/r/${response.roadmapSlug}`;
                      }
                    }}
                    disabled={isLoading}
                  >
                    <Save size={15} />
                    <span className="hidden sm:inline">
                      Save and Start Learning
                    </span>
                    <span className="inline sm:hidden">Start Learning</span>
                  </button>

                  <button
                    className="hidden items-center justify-center gap-2 rounded-md bg-gray-200 py-1.5 pl-2.5 pr-3 text-xs font-medium text-black transition-colors duration-300 hover:bg-gray-300 sm:inline-flex sm:text-sm"
                    onClick={async () => {
                      const response = await saveAIRoadmap();
                      if (response?.roadmapId) {
                        window.open(
                          `${import.meta.env.PUBLIC_EDITOR_APP_URL}/${response?.roadmapId}`,
                          '_blank',
                        );
                      }
                    }}
                    disabled={isLoading}
                  >
                    <PenSquare size={15} />
                    Edit in Editor
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className={cn({
            'relative mb-20 max-h-[800px] min-h-[800px] overflow-hidden sm:max-h-[1000px] md:min-h-[1000px] lg:max-h-[1200px] lg:min-h-[1200px]':
              !isAuthenticatedUser,
          })}
        >
          <div
            ref={roadmapContainerRef}
            id="roadmap-container"
            onClick={handleNodeClick}
            className="relative min-h-[400px] px-4 py-5 [&>svg]:mx-auto [&>svg]:max-w-[1300px]"
          />
          {!isAuthenticatedUser && (
            <div className="absolute bottom-0 left-0 right-0">
              <div className="h-80 w-full bg-linear-to-t from-gray-100 to-transparent" />
              <div className="bg-gray-100">
                <div className="mx-auto max-w-[600px] flex-col items-center justify-center bg-gray-100 px-5 pt-px">
                  <div className="mt-8 text-center">
                    <h2 className="mb-0.5 text-xl font-medium sm:mb-3 sm:text-2xl">
                      Sign up to View the full roadmap
                    </h2>
                    <p className="mb-6 text-balance text-sm text-gray-600 sm:text-base">
                      You must be logged in to view the complete roadmap
                    </p>
                  </div>
                  <div className="mx-auto max-w-[350px]">
                    <AuthenticationForm type="signup" />

                    <div className="mt-6 text-center text-sm text-slate-600">
                      Already have an account?{' '}
                      <a
                        href="/login"
                        className="font-medium text-blue-700 hover:text-blue-600"
                      >
                        Login
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
