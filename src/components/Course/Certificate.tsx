import { useRef, useState } from 'react';
import { Modal } from '../Modal';
import { DateTime } from 'luxon';
import { Loader2 } from 'lucide-react';

type CertificateModalProps = {
  onClose: () => void;
  userName: string;
  courseName: string;
  lessonsCount: number;
  quizzesCount: number;
  challengesCount: number;
  issuedDate: string;
};

export function CertificateModal(props: CertificateModalProps) {
  const {
    userName,
    courseName,
    lessonsCount,
    quizzesCount,
    challengesCount,
    onClose,
    issuedDate,
  } = props;

  const certificateRef = useRef<HTMLDivElement>(null);
  const issuedAt = DateTime.fromISO(issuedDate).toFormat('MMMM dd, yyyy');
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadCertificate = async () => {
    if (!certificateRef.current) {
      return;
    }

    setIsLoading(true);
    const certificate = certificateRef.current;
    const domtoimage = (await import('dom-to-image')).default;
    if (!domtoimage) {
      throw new Error('Unable to download image');
    }

    const scale = 4;
    const dataUrl = await domtoimage.toJpeg(certificate, {
      height: certificate.offsetHeight * scale,
      width: certificate.offsetWidth * scale,
      bgcolor: 'white',
      style: {
        transform: 'scale(' + scale + ')',
        transformOrigin: 'top left',
      },
    });

    const link = document.createElement('a');
    link.download = 'certificate.jpg';
    link.href = dataUrl;
    link.click();
    setIsLoading(false);
  };

  return (
    <Modal
      onClose={onClose}
      wrapperClassName="max-w-3xl"
      bodyClassName="overflow-hidden bg-transparent shadow-none"
    >
      <div className="rounded-xl bg-white text-black" ref={certificateRef}>
        <div className="flex w-full items-center justify-between gap-2 bg-black p-2 text-white">
          <div className="flex items-center gap-1 font-medium">
            <img src="/images/brand.svg" alt="roadmap.sh" className="size-7" />
            roadmap.sh
          </div>

          <span className="text-xs">
            Issued on <span className="font-medium">{issuedAt}</span>
          </span>
        </div>

        <div className="certificate-bg flex flex-col items-center py-14 font-mono text-gray-600">
          <span>Certificate of Completion</span>
          <h3 className="my-2 font-[balsamiq] text-4xl font-medium text-black">
            {userName}
          </h3>
          <span>Complete a course on roadmap.sh</span>

          <h3 className="mt-10 font-[balsamiq] text-5xl font-bold text-black">
            {courseName}
          </h3>

          <div className="mt-4 flex items-center gap-2">
            <span>{lessonsCount} lessons</span>
            <span>-</span>
            <span>{quizzesCount} quizzes</span>
            <span>-</span>
            <span>{challengesCount} challenge</span>
          </div>

          <div className="mt-20 flex w-full flex-col items-center justify-center">
            <span className="font-[balsamiq] text-2xl text-black underline underline-offset-[6px]">
              Kamran Ahmed
            </span>
            <h4 className="text-base font-medium text-black">Kamran Ahmed</h4>
            <span className="text-xs">Founder, roadmap.sh</span>
          </div>
        </div>
      </div>

      <button
        className="absolute bottom-4 right-4 flex items-center gap-1 rounded-lg bg-black px-2 py-1 text-white disabled:cursor-progress"
        onClick={handleDownloadCertificate}
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="size-4 animate-spin stroke-[2.5]" />}
        Download Certificate
      </button>
    </Modal>
  );
}
