import { sponsorHidden } from '../../stores/page';

function showHideSponsor(shouldHide) {
  const ad = document.querySelector('#sponsor-ad');
  if (!ad) {
    return;
  }

  if (shouldHide) {
    ad.classList.add('hidden');
    ad.classList.remove('flex');
  } else {
    ad.classList.remove('hidden');
    ad.classList.add('flex');
  }
}

sponsorHidden.listen(showHideSponsor);

window.setTimeout(() => {
  showHideSponsor(false);
}, 500);
