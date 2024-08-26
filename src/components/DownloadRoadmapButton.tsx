import { Download } from 'lucide-react';
import { isLoggedIn } from '../lib/jwt.ts';
import { useEffect, useState } from 'react';
import { showLoginPopup } from '../lib/popup.ts';

type DownloadRoadmapButtonProps = {
  roadmapId: string;
};

export function DownloadRoadmapButton(props: DownloadRoadmapButtonProps) {
  const { roadmapId } = props;

  const [url, setUrl] = useState<string>('#');

  useEffect(() => {
    if (isLoggedIn()) {
      setUrl(`/pdfs/roadmaps/${roadmapId}.pdf`);
    }
  }, []);

  return (
    <a
      className="inline-flex items-center justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-medium hover:bg-yellow-500 sm:text-sm"
      aria-label="Download Roadmap"
      target="_blank"
      href={url}
      onClick={(e) => {
        if (isLoggedIn()) {
          return;
        }

        e.preventDefault();
        showLoginPopup();
      }}
    >
      <Download className="h-4 w-4" />
      <span className="ml-2 hidden sm:inline">Download</span>
    </a>
  );
}
