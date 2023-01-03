window.setTimeout(() => {
  const ad = document.querySelector('.sponsor-ad');
  if (!ad) {
    return;
  }

  ad.classList.remove('hidden');
}, 500);