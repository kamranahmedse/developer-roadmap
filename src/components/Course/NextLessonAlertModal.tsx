import { Modal } from '../Modal';

type NextLessonAlertModalProps = {
  onClose: () => void;
  onContinue: () => void;
};

export function NextLessonAlertModal(props: NextLessonAlertModalProps) {
  const { onClose, onContinue } = props;

  return (
    <Modal
      onClose={onClose}
      bodyClassName="h-auto p-4 bg-zinc-900 border border-zinc-700 text-white"
    >
      <h2 className="text-lg font-semibold">Warning</h2>
      <p className="mt-2">
        Please submit your answer before moving to the next lesson.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          className="rounded-lg border border-zinc-800 px-4 py-2 text-sm leading-none"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="rounded-lg bg-zinc-800 px-4 py-2 text-sm leading-none text-zinc-50"
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </Modal>
  );
}
