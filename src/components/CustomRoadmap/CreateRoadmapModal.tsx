import { Modal } from '../Modal';
import { CreateRoadmapForm } from './CreateRoadmapForm';

interface CreateRoadmapModalProps {
  onClose: () => void;
  teamId?: string;
}

export function CreateRoadmapModal(props: CreateRoadmapModalProps) {
  const { onClose, teamId } = props;
  return (
    <Modal onClose={onClose} bodyClassName="p-4">
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-900">Create Roadmap</h2>
        <p className="mt-1 text-sm text-gray-500">
          Add a title and description to your roadmap.
        </p>
      </div>
      <CreateRoadmapForm
        selectedTeamId={teamId}
        canCancel={true}
        onClose={onClose}
      />
    </Modal>
  );
}
