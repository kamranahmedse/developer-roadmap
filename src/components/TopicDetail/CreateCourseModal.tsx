import { ChevronRightIcon, SearchIcon } from 'lucide-react';
import { Modal } from '../Modal';

type CreateCourseModalProps = {
  onClose: () => void;
};

export function CreateCourseModal(props: CreateCourseModalProps) {
  const { onClose } = props;

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
          Subject
        </label>
        <div className="relative overflow-hidden rounded-lg border">
          <input
            id="subject"
            type="text"
            className="w-full bg-white p-2.5 px-8 text-sm focus:bg-gray-50 focus:outline-hidden"
            placeholder="Enter a Subject for the Course"
            name="subject"
            autoFocus={true}
          />

          <div className="absolute top-0 left-0 flex h-full items-center justify-center px-2 text-gray-500">
            <SearchIcon className="size-4" />
          </div>
          <button className="absolute top-0 right-0 flex h-full items-center justify-center px-2 hover:bg-gray-200">
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </form>
    </Modal>
  );
}
