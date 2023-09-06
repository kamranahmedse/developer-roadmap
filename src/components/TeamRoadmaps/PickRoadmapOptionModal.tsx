import { Modal } from '../Modal';

type PickRoadmapOptionModalProps = {
  onClose: () => void;
  showDefaultRoadmapsModal: () => void;
  showCreateCustomRoadmapModal: () => void;
};

export function PickRoadmapOptionModal(props: PickRoadmapOptionModalProps) {
  const { onClose, showDefaultRoadmapsModal, showCreateCustomRoadmapModal } =
    props;

  return (
    <Modal onClose={onClose} bodyClassName="p-4">
      <h2 className="text-center text-2xl font-medium">Pick an Option</h2>

      <div className="mt-6 flex flex-col gap-2">
        <button
          className="rounded-md border border-gray-300 p-2 font-medium hover:bg-gray-100"
          onClick={showDefaultRoadmapsModal}
        >
          Default Roadmaps
        </button>
        <button
          className="rounded-md border border-gray-300 p-2 font-medium hover:bg-gray-100"
          onClick={showCreateCustomRoadmapModal}
        >
          Create Custom Roadmap
        </button>
      </div>
    </Modal>
  );
}
