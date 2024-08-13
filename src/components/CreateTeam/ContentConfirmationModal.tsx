import { Modal } from '../Modal';

type ContentConfirmationModalProps = {
  onClose: () => void;
  onClick: (shouldCopy: boolean) => void;
};

export function ContentConfirmationModal(props: ContentConfirmationModalProps) {
  const { onClose, onClick } = props;

  return (
    <Modal onClose={onClose}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Roadmap Content</h2>
        <p className="balanc text-gray-600">
          Do you want to copy the content of this roadmap?
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            className="rounded-lg border p-2.5 font-medium"
            onClick={() => {
              onClick(false);
            }}
          >
            No
          </button>
          <button
            className="rounded-lg border bg-black p-2.5 font-medium text-white hover:opacity-80"
            onClick={() => {
              onClick(true);
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
}
