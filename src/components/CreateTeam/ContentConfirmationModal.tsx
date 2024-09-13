import { Modal } from '../Modal';

type ContentConfirmationModalProps = {
  onClose: () => void;
  onClick: (shouldCopy: boolean) => void;
};

export function ContentConfirmationModal(props: ContentConfirmationModalProps) {
  const { onClose, onClick } = props;

  return (
    <Modal onClose={onClose} wrapperClassName="max-w-lg">
      <div className="p-4">
        <h2 className="text-lg font-semibold">
          Copy Node Details and Resources?
        </h2>
        <p className="balanc text-gray-600">
          This will just copy the roadmap in your team. Would you like to copy
          the resource links and node details as well?
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            className="rounded-lg border p-2.5 font-medium"
            onClick={() => {
              onClick(false);
            }}
          >
            No, copy roadmap only
          </button>
          <button
            className="rounded-lg border bg-black p-2.5 font-medium text-white hover:opacity-80"
            onClick={() => {
              onClick(true);
            }}
          >
            Yes, also copy resources
          </button>
        </div>
      </div>
    </Modal>
  );
}
