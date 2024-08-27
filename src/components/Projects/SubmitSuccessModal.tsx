import {
  CheckCircle2,
  Clipboard,
  Facebook,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { getUser } from '../../lib/jwt.ts';
import { Modal } from '../Modal';
import { CheckIcon as ReactCheckIcon } from '../ReactIcons/CheckIcon.tsx';
import { useCopyText } from '../../hooks/use-copy-text.ts';
import { cn } from '../../lib/classname.ts';

type SubmitSuccessModalProps = {
  projectId: string;
  onClose: () => void;
  successMessage: string;
};

export function SubmitSuccessModal(props: SubmitSuccessModalProps) {
  const { onClose, successMessage, projectId } = props;

  const user = getUser();

  const description = 'Check out my solution to this project on Roadmap.sh';
  const projectSolutionUrl = `${import.meta.env.DEV ? 'http://localhost:3000' : 'https://roadmap.sh'}/projects/${projectId}/solutions?u=${user?.id}`;

  const { isCopied, copyText } = useCopyText();

  const socialShareLinks = [
    {
      title: 'Twitter',
      href: `https://x.com/intent/tweet?text=${description}&url=${projectSolutionUrl}`,
      icon: <Twitter className="size-4 text-gray-700" />,
    },
    {
      title: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?quote=${description}&u=${projectSolutionUrl}`,
      icon: <Facebook className="size-4 text-gray-700" />,
    },
    {
      title: 'Linkedin',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${projectSolutionUrl}`,
      icon: <Linkedin className="size-4 text-gray-700" />,
    },
  ];

  return (
    <Modal onClose={onClose} bodyClassName="h-auto p-4">
      <div className="flex flex-col items-center justify-center pb-5 pt-12">
        <ReactCheckIcon additionalClasses="h-12 text-green-500 w-12" />
        <p className="mt-4 text-lg font-medium">{successMessage}</p>
        <p className="mt-0.5 text-center text-sm text-gray-500">
          You can use the link to share your solution with others.
        </p>

        <div className="mt-4 flex w-full items-stretch rounded-md border bg-gray-50">
          <input
            type="text"
            readOnly={true}
            value={projectSolutionUrl}
            className="w-full bg-transparent px-2.5 py-2 text-sm text-gray-700 focus:outline-none"
            onClick={(e) => {
              e.currentTarget.select();
              copyText(projectSolutionUrl);
            }}
          />

          <button
            className={cn(
              'm-1 ml-0 flex items-center gap-1 rounded-md bg-gray-200 px-2 py-1.5 text-xs font-medium text-black',
              isCopied ? 'bg-green-200 text-green-900' : '',
            )}
            onClick={() => {
              copyText(projectSolutionUrl);
            }}
          >
            {isCopied ? (
              <>
                <CheckCircle2 className="size-3 stroke-[2.5px]" />
                Copied
              </>
            ) : (
              <>
                <Clipboard className="size-3 stroke-[2.5px]" />
                Copy
              </>
            )}
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {socialShareLinks.map((socialLink) => (
            <a
              key={socialLink.title}
              href={socialLink.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border bg-gray-50 hover:bg-gray-100"
            >
              {socialLink.icon}
            </a>
          ))}
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Share your solution with the others!
        </p>
      </div>
    </Modal>
  );
}
