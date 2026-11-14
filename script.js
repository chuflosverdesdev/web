const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

const concertModal = document.querySelector('.concert-modal');
if (concertModal instanceof HTMLDialogElement) {
  const concertDate = new Date('2026-11-07T22:30:00+01:00').getTime();
  const closeConcertModal = () => concertModal.close();

  concertModal.querySelector('.concert-modal-close')?.addEventListener('click', closeConcertModal);
  concertModal.querySelector('.concert-modal-dismiss')?.addEventListener('click', closeConcertModal);
  concertModal.querySelector('.concert-modal-tour-link')?.addEventListener('click', closeConcertModal);
  concertModal.addEventListener('click', (event) => {
    if (event.target === concertModal) closeConcertModal();
  });

  if (Date.now() < concertDate) {
    window.setTimeout(() => concertModal.showModal(), 350);
  }
}

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const photoModal = document.querySelector('.photo-modal');
const photoModalImage = photoModal?.querySelector('img');
const photoModalClose = photoModal?.querySelector('.photo-modal-close');

const closePhotoModal = () => {
  if (!photoModal) return;
  photoModal.hidden = true;
  document.body.style.overflow = '';
};

document.querySelectorAll('.member-photo').forEach((photo) => {
  photo.tabIndex = 0;
  const image = photo.querySelector('img');
  const openPhotoModal = () => {
    if (!photoModal || !photoModalImage || !image) return;
    photoModalImage.src = image.src;
    photoModalImage.alt = image.alt;
    photoModal.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  photo.addEventListener('click', openPhotoModal);
  photo.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPhotoModal();
    }
  });
});

photoModalClose?.addEventListener('click', closePhotoModal);
photoModal?.addEventListener('click', (event) => {
  if (event.target === photoModal) closePhotoModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePhotoModal();
});

const footerMark = document.querySelector('.footer-mark');

footerMark?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

footerMark?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

const galleryFiles = [
  'chinatos-bar-1.jpg',
  'chinatos-bar-2.jpg',
  'chinatos-bar-3.jpg',
  'chinatos-bar-4.jpg',
  'chinatos-bar-5.jpg'
];

const galleryFilesUnified = [...new Set(galleryFiles)];

const shuffleFiles = (files) => {
  const items = [...files];
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
};

const galleryImages = shuffleFiles(galleryFilesUnified);
let currentGalleryIndex = -1;

const openGalleryImage = (index) => {
  if (!photoModal || !photoModalImage) return;
  const safeIndex = (index + galleryImages.length) % galleryImages.length;
  currentGalleryIndex = safeIndex;
  const file = galleryImages[safeIndex];
  photoModalImage.src = `assets/imagenes/${file}`;
  photoModalImage.alt = `Chuflos Verdes — archivo ${String(safeIndex + 1).padStart(2, '0')}`;
  photoModal.hidden = false;
  document.body.style.overflow = 'hidden';
};

const galleryGrid = document.querySelector('#gallery-grid');
galleryImages.forEach((file, index) => {
  const card = document.createElement('figure');
  card.className = 'gallery-card';
  card.dataset.index = String(index);
  card.style.setProperty('--tilt', `${(index % 5 - 2) * 0.7}deg`);
  const image = document.createElement('img');
  image.src = `assets/imagenes/${file}`;
  image.alt = `Foto de Chuflos Verdes en concierto o ensayo, archivo ${String(index + 1).padStart(2, '0')}`;
  image.loading = 'lazy';
  image.decoding = 'async';
  card.appendChild(image);
  galleryGrid?.appendChild(card);
  card.addEventListener('click', () => {
    openGalleryImage(Number(card.dataset.index));
  });
});

const navigateGalleryByKeyboard = (event) => {
  if (photoModal?.hidden) return;

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    openGalleryImage(currentGalleryIndex + 1);
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    openGalleryImage(currentGalleryIndex - 1);
  }

  if (event.key === 'Escape') {
    closePhotoModal();
  }
};

document.addEventListener('keydown', navigateGalleryByKeyboard);

const floatingBrand = document.querySelector('.floating-brand');
const bandSection = document.querySelector('#banda');
const siteHeader = document.querySelector('.site-header');

if (floatingBrand && bandSection) {
  const updateFloatingBrand = () => {
    const headerBottom = siteHeader ? siteHeader.getBoundingClientRect().bottom : 0;
    const reachedBand = bandSection.getBoundingClientRect().top <= headerBottom + 1;
    floatingBrand.classList.toggle('is-hidden', !reachedBand);
  };
  updateFloatingBrand();
  window.addEventListener('scroll', updateFloatingBrand, { passive: true });
  window.addEventListener('resize', updateFloatingBrand);
}
