import { useEffect, useRef, useState } from 'react';
import { httpPost } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';

type ContributionInputProps = {
  id: number;
  title: string;
  link: string;
  isLast: boolean;
  totalCount: number;
  onAdd: () => void;
  onRemove: () => void;
  onChange: (link: { id: number; title: string; link: string }) => void;
};

function ContributionInput(props: ContributionInputProps) {
  const {
    isLast,
    totalCount,
    onAdd,
    onRemove,
    onChange,
    id,
    title: defaultTitle,
    link: defaultLink,
  } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState('');
  const [title, setTitle] = useState(defaultTitle);
  const [link, setLink] = useState(defaultLink);

  useEffect(() => {
    if (!titleRef?.current) {
      return;
    }

    titleRef.current.focus();
  }, []);

  useEffect(() => {
    onChange({ id, title, link });
  }, [title, link]);

  const canAddMore = isLast && totalCount < 5;

  return (
    <div className="relative mb-3 rounded-md border p-3">
      <p
        className={`mb-1 text-xs uppercase ${
          focused === 'title' ? 'text-black' : 'text-gray-400'
        }`}
      >
        Resource Title
      </p>
      <input
        ref={titleRef}
        type="text"
        required
        className="block w-full rounded-md border p-2 text-sm focus:border-gray-400 focus:outline-hidden"
        placeholder="e.g. Introduction to RESTful APIs"
        onFocus={() => setFocused('title')}
        onBlur={() => setFocused('')}
        onChange={(e) => setTitle((e.target as any).value)}
      />
      <p
        className={`mb-1 mt-3 text-xs uppercase ${
          focused === 'link' ? 'text-black' : 'text-gray-400'
        }`}
      >
        Resource Link
      </p>
      <input
        type="url"
        required
        className="block w-full rounded-md border p-2 text-sm focus:border-gray-400 focus:outline-hidden"
        placeholder="e.g. https://roadmap.sh/guides/some-url"
        onFocus={() => setFocused('link')}
        onBlur={() => setFocused('')}
        onChange={(e) => setLink((e.target as any).value)}
      />

      <div className="mb-0 mt-3 flex gap-3">
        {totalCount !== 1 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onRemove();
            }}
            className="rounded-md text-sm font-semibold text-red-500 underline underline-offset-2 hover:text-red-800"
          >
            - Remove Link
          </button>
        )}

        {canAddMore && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onAdd();
            }}
            className="rounded-md text-sm font-semibold text-gray-600 underline underline-offset-2 hover:text-black"
          >
            + Add another Link
          </button>
        )}
      </div>
    </div>
  );
}

type ContributionFormProps = {
  resourceType: string;
  resourceId: string;
  topicId: string;
  onClose: (message?: string) => void;
};

export function ContributionForm(props: ContributionFormProps) {
  const { onClose, resourceType, resourceId, topicId } = props;
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [links, setLinks] = useState<
    { id: number; title: string; link: string }[]
  >([
    {
      id: new Date().getTime(),
      title: '',
      link: '',
    },
  ]);

  async function onSubmit(e: any) {
    e.preventDefault();
    setIsSubmitting(true);

    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-contribute-link`,
      {
        resourceType,
        resourceId,
        topicId,
        links,
      }
    );

    setIsSubmitting(false);

    if (!response || error) {
      toast.error(error?.message || 'Something went wrong. Please try again.');
      return;
    }

    onClose('Thanks for your contribution! We will review it shortly.');
  }

  return (
    <div>
      <div className="mb-2 mt-2 rounded-md border bg-gray-100 p-3">
        <h1 className="mb-2 text-2xl font-bold">Guidelines</h1>
        <ul className="flex flex-col gap-1 text-sm text-gray-700">
          <li>Content should only be in English.</li>
          <li>Do not add things you have not evaluated personally.</li>
          <li>It should strictly be relevant to the topic.</li>
          <li>It should not be paid or behind a signup.</li>
          <li>
            Quality over quantity. Smaller set of quality links is preferred.
          </li>
        </ul>
      </div>

      <form onSubmit={onSubmit}>
        {links.map((link, counter) => (
          <ContributionInput
            key={link.id}
            id={link.id}
            title={link.title}
            link={link.link}
            isLast={counter === links.length - 1}
            totalCount={links.length}
            onChange={(newLink) => {
              setLinks(
                links.map((l) => {
                  if (l.id === link.id) {
                    return newLink;
                  }

                  return l;
                })
              );
            }}
            onRemove={() => {
              setLinks(links.filter((l) => l.id !== link.id));
            }}
            onAdd={() => {
              setLinks([
                ...links,
                {
                  id: new Date().getTime(),
                  title: '',
                  link: '',
                },
              ]);
            }}
          />
        ))}

        <div className="flex gap-2">
          <button
            disabled={isSubmitting}
            type="submit"
            className="block w-full rounded-md bg-gray-800 p-2 text-sm text-white hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isSubmitting ? 'Please wait ...' : 'Submit'}
          </button>
          <button
            className="block w-full rounded-md border border-red-500 p-2 text-sm text-red-600 hover:bg-red-600 hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
