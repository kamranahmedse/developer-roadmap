import { WandSparkles } from 'lucide-react';
import { Modal } from '../Modal';
import { useState } from 'react';

type CreateCourseModalProps = {
  onClose: () => void;
};

export function CreateCourseModal(props: CreateCourseModalProps) {
  const { onClose } = props;

  const [subject, setSubject] = useState('');

  return (
    <Modal
      onClose={onClose}
      wrapperClassName="h-auto mt-20"
      overlayClassName="items-start"
      bodyClassName="p-1.5"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const subject = formData.get('subject');

          window.location.href = `/ai/search?term=${subject}&difficulty=beginner&src=topic`;
          onClose();
        }}
      >
        <label
          className="mb-2.5 ml-1 inline-block text-sm leading-none"
          htmlFor="subject"
        >
          Ask AI to Teach You
        </label>
        <div className="relative flex items-center gap-2 overflow-hidden">
          <input
            id="subject"
            type="text"
            className="w-full bg-white p-2.5 pr-8 text-sm focus:outline-hidden"
            placeholder="Enter a topic to learn"
            name="subject"
            autoFocus={true}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <button
            disabled={!subject.trim()}
            className="flex h-full disabled:opacity-40 items-center justify-center gap-2 rounded-md bg-black px-3 py-1 text-sm text-white hover:opacity-80"
          >
            Generate
            <WandSparkles className="size-4" />
          </button>
        </div>
      </form>
    </Modal>
  );
}
