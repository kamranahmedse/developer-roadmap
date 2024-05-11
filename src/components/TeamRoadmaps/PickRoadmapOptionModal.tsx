import { Modal } from '../Modal';
import { Map, Shapes } from 'lucide-react';

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
      <h2 className="mb-0.5 text-left text-2xl font-semibold">Pick an Option</h2>
      <p className="text-left text-sm text-gray-500 mb-4">
        Choose from default roadmaps or create from scratch.
      </p>

      <div className="flex flex-col gap-2">
        <button
          className="text-base flex items-center rounded-md border border-gray-300 p-2 px-4 text-left font-medium hover:bg-gray-100"
          onClick={showDefaultRoadmapsModal}
        >
          <Map className="mr-2 inline-block" size={20} />
          Use a Default Roadmap
        </button>
        <button
          className="text-base flex items-center rounded-md border border-gray-300 p-2 px-4 text-left font-medium hover:bg-gray-100"
          onClick={showCreateCustomRoadmapModal}
        >
          <Shapes className="mr-2 inline-block" size={20} />
          Create from Scratch
        </button>
      </div>
    </Modal>
  );
}
