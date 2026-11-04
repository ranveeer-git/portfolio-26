const portrait = document.querySelector('.hero-portrait img');

// Start the entrance when the photo is ready, including on cached visits.
function revealPortrait() {
  portrait.classList.remove('portrait-loading');
  if (portrait.naturalWidth > 0) portrait.classList.add('portrait-ready');
}

if (portrait.complete) {
  revealPortrait();
} else {
  portrait.classList.add('portrait-loading');
  portrait.addEventListener('load', revealPortrait, { once: true });
  portrait.addEventListener('error', revealPortrait, { once: true });
}
