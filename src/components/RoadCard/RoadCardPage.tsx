import { useState } from 'preact/hooks';

import { useCopyText } from '../../hooks/use-copy-text';
import { useAuth } from '../../hooks/use-auth';
import CopyIcon from '../../icons/copy.svg';
import { RoadmapSelect } from './RoadmapSelect';
import { GitHubReadmeBanner } from './GitHubReadmeBanner';
import { downloadImage } from '../../helper/download-image';
import { SelectionButton } from './SelectionButton';
import { StepCounter } from './StepCounter';
import { Editor } from './Editor';

type StepLabelProps = {
  label: string;
};
function StepLabel(props: StepLabelProps) {
  const { label } = props;

  return (
    <span className="mb-3 flex items-center gap-2 text-sm leading-none text-gray-400">
      {label}
    </span>
  );
}

export function RoadCardPage() {
  const { isCopied, copyText } = useCopyText();
  const [roadmaps, setRoadmaps] = useState<string[]>([]);
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
  if (roadmaps.length > 0) {
    badgeUrl.searchParams.set('roadmaps', roadmaps.join(','));
  }

  return (
    <>
      <div className="flex items-start gap-4 mx-0 sm:-mx-10 px-0 sm:px-10 border-b pt-2 pb-4">
        <StepCounter step={1} />
        <div>
          <StepLabel label="Pick progress to show (Max. 4)" />

          <div className="flex flex-wrap">
            <RoadmapSelect
              selectedRoadmaps={roadmaps}
              setSelectedRoadmaps={setRoadmaps}
            />
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4 mx-0 sm:-mx-10 px-0 sm:px-10 border-b py-4">
        <StepCounter step={2} />
        <div>
          <StepLabel label="Select Mode (Dark vs Light)" />

          <div className="flex gap-2">
            <SelectionButton
              text={'Dark'}
              isDisabled={false}
              isSelected={variant === 'dark'}
              onClick={() => {
                setVariant('dark');
              }}
            />

            <SelectionButton
              text={'Light'}
              isDisabled={false}
              isSelected={variant === 'light'}
              onClick={() => {
                setVariant('light');
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4 mx-0 sm:-mx-10 px-0 sm:px-10 border-b py-4">
        <StepCounter step={3} />
        <div>
          <StepLabel label="Select Version" />

          <div className="flex gap-2">
            <SelectionButton
              text={'Tall'}
              isDisabled={false}
              isSelected={version === 'tall'}
              onClick={() => {
                setVersion('tall');
              }}
            />
            <SelectionButton
              text={'Wide'}
              isDisabled={false}
              isSelected={version === 'wide'}
              onClick={() => {
                setVersion('wide');
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4 mx-0 sm:-mx-10 px-0 sm:px-10 border-b py-4">
        <StepCounter step={4} />
        <div class="flex-grow">
          <StepLabel label="Share your #RoadCard with others" />
          <div className={'rounded-md border bg-gray-50 p-2 text-center'}>
            <a
              href={badgeUrl.toString()}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative block hover:cursor-pointer ${
                version === 'tall' ? ' max-w-[270px] ' : ' w-full '
              }`}
            >
              <img src={badgeUrl.toString()} alt="RoadCard" />
            </a>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              className="flex items-center justify-center rounded border border-gray-300 p-1.5 px-2 text-sm font-medium"
              onClick={() =>
                downloadImage({
                  url: badgeUrl.toString(),
                  name: 'road-card',
                  scale: 4,
                })
              }
            >
              Download
            </button>
            <button
              disabled={isCopied}
              className="flex cursor-pointer items-center justify-center rounded border border-gray-300 p-1.5 px-2 text-sm font-medium disabled:bg-blue-50"
              onClick={() => copyText(badgeUrl.toString())}
            >
              <img alt="Copy" src={CopyIcon} className="mr-1" />

              {isCopied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-3">
            <Editor
              title={'HTML'}
              text={`<a href="https://roadmap.sh"><img src="${badgeUrl}" alt="roadmap.sh"/></a>`.trim()}
            />

            <Editor
              title={'Markdown'}
              text={`[![roadmap.sh](${badgeUrl})](https://roadmap.sh)`.trim()}
            />
          </div>

          <GitHubReadmeBanner />
        </div>
      </div>
    </>
  );
}
