import { cn } from '../../lib/classname';
import { ChevronDownIcon } from '../ReactIcons/ChevronDownIcon';

type QuestionProps = {
  question: string;
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export function Question(props: QuestionProps) {
  const { question, isActive = false, children, onClick } = props;

  return (
    <div className="faq-item rounded-md border border-gray-300 bg-white hover:bg-gray-50">
      <button
        className="flex w-full flex-row items-center justify-between p-2 sm:p-3"
        onClick={onClick}
      >
        <span className="text-left text-sm font-medium sm:text-base">
          {question}
        </span>
        <ChevronDownIcon className="hidden h-3.5 stroke-[3] text-gray-400 sm:block" />
      </button>

      {isActive && <div className={cn('answer')}>{children}</div>}
    </div>
  );
}
