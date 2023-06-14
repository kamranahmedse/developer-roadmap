import { httpGet } from '../../lib/http';
import { useEffect, useState } from 'preact/hooks';
import { pageProgressMessage } from '../../stores/page';
import type { UserProgressResponse } from '../HeroSection/FavoriteRoadmaps';

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
    <div className="flex flex-wrap gap-1">
      {progressList
        ?.filter((progress) => progress.resourceType === 'roadmap')
        .map((progress) => (
          <button className="rounded-md border p-1 px-2 text-sm">
            {progress.resourceTitle}
          </button>
        ))}
    </div>
  );
}
