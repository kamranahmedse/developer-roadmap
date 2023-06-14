import { httpGet } from '../../lib/http';
import { useEffect, useState } from 'preact/hooks';
import { pageProgressMessage } from '../../stores/page';
import type { UserProgressResponse } from '../HeroSection/FavoriteRoadmaps';

export type RoadmapOptionProps = {
  value: string;
  label: string;
};

export function RoadmapSelect() {
  const [progressList, setProgressList] = useState<UserProgressResponse>();

  const fetchProgress = async () => {
    const { response, error } = await httpGet<UserProgressResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-user-all-progress`
    );

    if (error || !response) {
      return;
    }

    setProgressList(response);
  };

  useEffect(() => {
    fetchProgress().finally(() => {
      pageProgressMessage.set('');
    });
  }, []);

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          className="mb-0.5 w-full rounded-md border p-2 text-sm focus:outline-0 focus:ring-0"
          placeholder="Pick roadmaps"
        />
        <div className="top-full absolute rounded-md"></div>
      </div>

      <div className="mt-1 text-xs text-gray-500">Select up to 4 roadmaps</div>
    </div>
  );
}
