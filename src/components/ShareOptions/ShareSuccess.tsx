import { CheckCircle, Copy, Facebook, Linkedin, Twitter } from 'lucide-react';
import { useCopyText } from '../../hooks/use-copy-text';
import { cn } from '../../lib/classname';
import type { AllowedRoadmapVisibility } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';

type ShareSuccessProps = {
  roadmapSlug?: string;
  roadmapId: string;
  onClose: () => void;
  visibility: AllowedRoadmapVisibility;
  description?: string;
  isSharingWithOthers?: boolean;
};

export function ShareSuccess(props: ShareSuccessProps) {
  const {
    roadmapSlug,
    roadmapId,
    onClose,
    description,
    visibility,
    isSharingWithOthers = false,
  } = props;

  const baseUrl = import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://roadmap.sh';
  const shareLink = roadmapSlug
    ? `${baseUrl}/r/${roadmapSlug}`
    : `${baseUrl}/r?id=${roadmapId}`;

  const { copyText, isCopied } = useCopyText();

  const socialShareLinks = [
    {
      title: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${description}&url=${shareLink}`,
      icon: Twitter,
    },
    {
      title: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?quote=${description}&u=${shareLink}`,
      icon: Facebook,
    },
    {
      title: 'Linkedin',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`,
      icon: Linkedin,
    },
  ];

  const embedHtml = `<iframe src="${baseUrl}/r/embed?id=${roadmapId}" width="100%" height="500px" frameBorder="0"\n></iframe>`;

  return (
    <div className="flex grow flex-col justify-center">
      <div className="mt-5 flex grow flex-col items-center justify-center gap-1.5">
        <CheckCircle className="h-14 w-14 text-green-500" />
        {isSharingWithOthers ? (
          <h3 className="text-xl font-medium">Sharing with Others</h3>
        ) : (
          <h3 className="text-xl font-medium">Sharing Settings Updated</h3>
        )}
      </div>

      <input
        type="text"
        className="mt-6 w-full rounded-md border bg-gray-50 p-2 px-2.5 text-gray-700 focus:outline-hidden"
        value={shareLink}
        readOnly
        onClick={(e) => {
          e.currentTarget.select();
          copyText(shareLink);
        }}
      />
      {isSharingWithOthers ? (
        <p className="mt-1 text-sm text-gray-400">
          You can share the above link with anyone
        </p>
      ) : (
        <p className="mt-1 text-sm text-gray-400">
          You can share the above link with anyone who has access
        </p>
      )}

      {visibility === 'public' && (
        <>
          <div className="mt-2 border-t pt-2">
            <p className="text-sm text-gray-400">
              You can also embed this roadmap on your website.
            </p>
            <div className="mt-2">
              <input
                onClick={(e) => {
                  e.currentTarget.select();
                  copyText(embedHtml);
                }}
                readOnly={true}
                className="w-full resize-none rounded-md border bg-gray-50 p-2 text-sm"
                value={embedHtml}
              />
            </div>
          </div>
          <div className="-mx-4 mt-4 flex items-center gap-1.5">
            <span className="h-px grow bg-gray-300" />
            <span className="px-2 text-xs uppercase text-gray-400">Or</span>
            <span className="h-px grow bg-gray-300" />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-600">Share with others on</span>
            <ul className="flex items-center gap-1.5">
              {socialShareLinks.map((socialShareLink) => (
                <li key={socialShareLink.title}>
                  <a
                    href={socialShareLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center gap-1.5 rounded-md border bg-gray-50 text-sm text-gray-700 hover:bg-gray-100 focus:outline-hidden"
                  >
                    <socialShareLink.icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="mt-4 flex flex-col items-center justify-end gap-2">
        <button
          className={cn(
            'flex w-full items-center justify-center gap-1.5 rounded-sm bg-black px-4 py-2.5 text-sm font-medium text-white hover:opacity-80',
            isCopied && 'bg-green-300 text-green-800',
          )}
          disabled={isCopied}
          onClick={() => {
            copyText(shareLink);
          }}
        >
          <Copy className="h-3.5 w-3.5 stroke-[2.5]" />
          {isCopied ? 'Copied' : 'Copy URL'}
        </button>
        <button
          className={cn(
            'flex w-full items-center justify-center gap-1.5 rounded-sm border border-black px-4 py-2 text-sm font-medium hover:bg-gray-100',
          )}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
