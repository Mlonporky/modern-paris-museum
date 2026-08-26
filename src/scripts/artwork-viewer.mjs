const triggers = [...document.querySelectorAll('[data-artwork-open]')];
const viewers = new Map(
  [...document.querySelectorAll('[data-artwork-viewer]')]
    .map((viewer) => [viewer.dataset.artworkViewer, viewer]),
);

const openViewer = (artworkId) => {
  const viewer = viewers.get(artworkId);
  if (!viewer) return false;

  if (typeof viewer.showModal === 'function') {
    viewer.showModal();
    viewer.querySelector('[data-viewer-close]')?.focus();
    return true;
  }

  return false;
};

triggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    if (openViewer(trigger.dataset.artworkOpen)) {
      event.preventDefault();
    }
  });
});

viewers.forEach((viewer) => {
  viewer.querySelector('[data-viewer-close]')?.addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) viewer.close();
  });
});
