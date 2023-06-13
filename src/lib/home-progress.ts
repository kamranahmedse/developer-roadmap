import { httpGet } from './http';
import { isLoggedIn } from './jwt';

type UserProgressResponse = {
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice';
  done: number;
  learning: number;
  skipped: number;
  total: number;
  updatedAt: Date;
}[];

async function renderProgress() {
  if (!isLoggedIn()) {
    return;
  }

  const { response: progressList, error } = await httpGet<UserProgressResponse>(
    `${import.meta.env.PUBLIC_API_URL}/v1-get-user-all-progress`
  );

  if (error || !progressList) {
    return;
  }

  progressList.forEach((progress) => {
    const href =
      progress.resourceType === 'best-practice'
        ? `/best-practices/${progress.resourceId}`
        : `/${progress.resourceId}`;
    const element = document.querySelector(`a[href="${href}"]`);
    if (!element) {
      return;
    }

    const totalDone = progress.done + progress.skipped;
    const percentageDone = (totalDone / progress.total) * 100;

    const progressBar = document.createElement('div');
    progressBar.style.backgroundColor = 'rgb(23 42 58)';
    progressBar.style.position = 'absolute';
    progressBar.style.width = `${percentageDone}%`;
    progressBar.style.height = '100%';
    progressBar.style.bottom = '0';
    progressBar.style.left = '0';
    progressBar.style.top = '0';
    progressBar.style.zIndex = '1';

    element.appendChild(progressBar);
  });
}

// on DOM load
window.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(renderProgress, 0);
});
