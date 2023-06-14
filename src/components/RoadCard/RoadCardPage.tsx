import { useState } from 'preact/hooks';

import { useCopyText } from '../../hooks/use-copy-text';
import { useAuth } from '../../hooks/use-auth';
import { TallBadgeTab } from './TallBadgeTab';
import { WideBadgeTab } from './WideBadgeTab';
import CopyIcon from '../../icons/copy.svg';
import { RoadmapSelect } from './RoadmapSelect';

type StepCounterProps = {
  step: number;
};

function StepCounter(props: StepCounterProps) {
  const { step } = props;

  return (
    <span
      className={
        'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-300 text-white'
      }
    >
      {step}
    </span>
  );
}

type EditorProps = {
  title: string;
  text: string;
};

export function Editor(props: EditorProps) {
  const { text, title } = props;

  const { isCopied, copyText } = useCopyText();

  return (
    <div className="flex w-full flex-grow flex-col overflow-hidden rounded border border-gray-300 bg-gray-50">
      <div className="flex items-center justify-between gap-2 border-b border-gray-300 px-3 py-2">
        <span className="text-xs uppercase leading-none text-gray-400">
          {title}
        </span>
        <button className="flex items-center" onClick={() => copyText(text)}>
          {isCopied && (
            <span className="mr-1 text-xs leading-none text-green-500">
              Copied!
            </span>
          )}

          <img src={CopyIcon} alt="Copy" className="inline-block h-4 w-4" />
        </button>
      </div>
      <textarea
        className="no-scrollbar block h-12 w-full overflow-x-auto whitespace-nowrap bg-gray-200/70 p-3 text-sm text-gray-900"
        readOnly
      >
        {text}
      </textarea>
    </div>
  );
}

export type BadgeProps = {
  badgeUrl: string;
};

export function RoadCardPage() {
  const [version, setVersion] = useState<'tall' | 'wide'>('tall');
  const [variant, setVariant] = useState<'dark' | 'light'>('dark');
  const user = useAuth();
  if (!user) {
    return null;
  }

  const badgeUrl = new URL(
    `${import.meta.env.PUBLIC_API_URL}/v1-badge/${version}/${user?.id}`
  );

  badgeUrl.searchParams.set('variant', variant);

  return (
    <>
      <div className="mb-4 flex items-start gap-4">
        <StepCounter step={1} />
        <div>
          <span className="mb-3 flex items-center gap-2 text-sm leading-none text-gray-400">
            Select progress to show (maximum 4 items)
          </span>

          <div className="flex min-h-[30px] flex-wrap">
            <RoadmapSelect />
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-start gap-4">
        <StepCounter step={2} />
        <div>
          <span className="mb-3 flex items-center gap-2 text-sm leading-none text-gray-400">
            Select Mode (Dark vs Light)
          </span>

          <div className="flex gap-2">
            <button className="rounded-md border p-1 px-2 text-sm">Dark</button>
            <button className="rounded-md border p-1 px-2 text-sm">
              Light
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-start gap-4">
        <StepCounter step={3} />
        <div>
          <span className="mb-3 flex items-center gap-2 text-sm leading-none text-gray-400">
            Select Variant
          </span>

          <div className="flex gap-2">
            <button className="rounded-md border p-1 px-2 text-sm">Tall</button>
            <button className="rounded-md border p-1 px-2 text-sm">Wide</button>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-start gap-4">
        <StepCounter step={4} />
        <div>
          <span className="mb-3 flex items-center gap-2 text-sm leading-none text-gray-400">
            Share your #RoadCard with others
          </span>

          <a
            href={badgeUrl.toString()}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-[270px] hover:cursor-pointer"
          >
            <img src={badgeUrl.toString()} alt="RoadCard" />
          </a>
        </div>
      </div>
    </>
  );
}
