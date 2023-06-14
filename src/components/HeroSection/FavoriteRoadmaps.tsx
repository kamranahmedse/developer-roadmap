import { useEffect, useState } from 'preact/hooks';

export function FavoriteRoadmaps() {
  const [isPreparing, setIsPreparing] = useState(true);
  useEffect(() => {
    const heroEl = document.getElementById('hero-text')!;
    heroEl.classList.add('opacity-0')
    setIsPreparing(false);
  });

  if (isPreparing) {
    return null;
  }

  return null;

  // return (
  //   <div class="min-h-full border-t border-t-[#1e293c] bg-gray-900"></div>
  // );
}
