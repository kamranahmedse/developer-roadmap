import {ChevronDown, ChevronUp, GraduationCap} from 'lucide-react';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../hooks/use-outside-click';
import {markdownToHtml} from "../lib/markdown";

type RoadmapTitleQuestionProps = {
  question: string;
  answer: string;
};

export function RoadmapTitleQuestion(props: RoadmapTitleQuestionProps) {
  const { question, answer } = props;

  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setIsAnswerVisible(false);
  });

  return (
    <div className="relative hidden border-t text-sm font-medium sm:block">
      {isAnswerVisible && (
        <div className="fixed left-0 right-0 top-0 z-50 h-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-black/50"></div>
      )}
      <h2
        className="z-50 flex cursor-pointer items-center px-2 py-2 "
        aria-expanded={isAnswerVisible ? 'true' : 'false'}
        onClick={(e) => {
          e.preventDefault();
          setIsAnswerVisible(!isAnswerVisible);
        }}
      >
        <span className="flex flex-grow">
          <GraduationCap className="mr-2 inline-block h-5 w-5" />
            { question }
        </span>
        <span className="flex-shrink-0 text-gray-400">
          <ChevronDown className={`inline-block h-5 w-5`} />
        </span>
      </h2>

      {isAnswerVisible && (
        <div
          className="absolute left-0 right-0 top-0 z-50 mt-0 rounded-md border bg-white"
          ref={ref}
        >
          <p className="flex items-center px-[7px] pt-[7px] pb-[8px] text-sm font-medium border-b cursor-pointer" onClick={() => setIsAnswerVisible(false)}>
            <span className="flex flex-grow items-center">
              <GraduationCap className="mr-2 inline-block h-5 w-5" />
                { question }
            </span>
            <span className="flex-shrink-0 text-gray-400">
              <ChevronUp className={`inline-block h-5 w-5`} />
            </span>
          </p>
          <div className='p-3 text-base bg-gray-100 [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:mb-1 [&>h2]:mt-5 [&>p>a]:font-semibold [&>p>a]:underline [&>p>a]:underline-offset-2 [&>p:last-child]:mb-0 [&>p]:mb-3 [&>p]:font-normal [&>p]:leading-relaxed' dangerouslySetInnerHTML={{ __html: markdownToHtml(answer, false) }}>
          </div>
        </div>
      )}
    </div>
  );
}
