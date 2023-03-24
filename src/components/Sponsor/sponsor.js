window.setTimeout(() => {
  const ad = document.querySelector('#sponsor-ad');
  if (!ad) {
    return;
  }

  ad.classList.remove('hidden');
  ad.classList.add('flex');
}, 500);
