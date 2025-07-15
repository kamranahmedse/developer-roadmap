import { Modal } from './Modal';

type VideoModalProps = {
  videoId: string;
  onClose: () => void;
};

export function VideoModal(props: VideoModalProps) {
  const { videoId, onClose } = props;

  return (
    <Modal
      onClose={onClose}
      wrapperClassName="w-[90vw] max-w-4xl h-auto"
      bodyClassName="p-0 bg-black"
      overlayClassName="items-start md:items-center"
    >
      <div className="relative w-full pt-[56.25%]">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Modal>
  );
} 