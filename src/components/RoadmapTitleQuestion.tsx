import {
  ChevronDown,
  ChevronUp,
  CircleHelp,
  GraduationCap,
  Info,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../hooks/use-outside-click';
import { markdownToHtml } from '../lib/markdown';
import { cn } from '../lib/classname';
import { useScrollPosition } from '../hooks/use-scroll-position';

type RoadmapTitleQuestionProps = {
  question: string;
  answer: string;
  roadmapId?: string;
};

export function RoadmapTitleQuestion(props: RoadmapTitleQuestionProps) {
  const { question, answer, roadmapId } = props;

  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);

  useOutsideClick(ref, () => {
    setIsAnswerVisible(false);
  });

  const { y: scrollY } = useScrollPosition();

  return (
    <div
      className={cn(
        'relative hidden rounded-b-[5px] border-t bg-white text-sm font-medium hover:bg-gray-50 sm:block',
        {
          'rounded-0 -mx-4 sm:mx-0': isAnswerVisible,
          // @FIXME:
          // The line below is to keep the question hidden on mobile devices except for
          // the frontend roadmap. This is because we did not use to have the question 
          // on mobile devices before and we don't want to cause any SEO issues. It will
          // be enabled on other roadmaps in the future.
          block: roadmapId === 'frontend',
        },
      )}
    >
      {isAnswerVisible && (
        <div className="fixed left-0 right-0 top-0 z-[100] h-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-black/50"></div>
      )}
      <h2
        className="z-50 flex cursor-pointer select-none items-center px-2 py-2 text-sm font-medium"
        aria-expanded={isAnswerVisible ? 'true' : 'false'}
        onClick={(e) => {
          e.preventDefault();
          setIsAnswerVisible(!isAnswerVisible);
        }}
      >
        <span className="flex flex-grow select-none items-center">
          <Info className="mr-1.5 inline-block h-4 w-4" strokeWidth={2.5} />
          {question}
        </span>
        <span className="relative -top-px flex-shrink-0 text-gray-400">
          <ChevronDown className={`inline-block h-5 w-5`} />
        </span>
      </h2>

      <div
        className={`absolute left-0 right-0 top-0 z-[100] mt-0 border bg-white ${
          isAnswerVisible ? 'rounded-0 block sm:rounded-md' : 'hidden'
        }`}
        ref={ref}
      >
        {isAnswerVisible && (
          <h2
            className={cn(
              'sticky top-0 flex cursor-pointer select-none items-center rounded-t-md border-b bg-white px-[7px] py-[9px] text-base font-medium',
            )}
            onClick={() => {
              setIsAnswerVisible(false);
              if (
                scrollY > (h2Ref?.current?.getBoundingClientRect().top || 0)
              ) {
                ref.current?.scrollIntoView();
              }
            }}
            ref={h2Ref}
          >
            <span className="flex flex-grow items-center">
              <Info className="mr-2 inline-block h-4 w-4" strokeWidth={2.5} />
              {question}
            </span>
            <span className="relative -top-px flex-shrink-0 text-gray-400">
              <ChevronUp className={`inline-block h-5 w-5`} />
            </span>
          </h2>
        )}
        <div
          className="bg-gray-100 p-3 text-base [&>h2]:mb-2 [&>h2]:mt-5 [&>h2]:text-[17px] [&>h2]:font-medium [&>p:last-child]:mb-0 [&>p>a]:font-semibold [&>p>a]:underline [&>p>a]:underline-offset-2 [&>p]:mb-3 [&>p]:font-normal [&>p]:leading-relaxed [&>p]:text-gray-800 [&>ul>li]:mb-2 [&>ul>li]:font-normal"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(answer, false) }}
        ></div>
      </div>
    </div>
  );
}
