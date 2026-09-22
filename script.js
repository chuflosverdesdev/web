const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

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
  '028d3363-6177-4cae-a876-203235a40577.webp',
  '0391361c-c478-4fa4-b82c-6c8234f12138.webp',
  '0538f3fa-5f02-4523-9a32-6f40cd4df6c7.webp',
  '091ac72c-399d-4f4b-9f8e-869a0c4a84cf.webp',
  '0af02ba3-9dbb-44aa-846f-6f320d90e4b5.webp',
  '1aea7c3a-98ff-4b94-ad11-5db156a38954.webp',
  '24a85970-1380-4e8a-bb51-2b1d833c59a9.webp',
  '26974827-425f-4004-9d66-89db5ff5e7e5.webp',
  '439df454-b3bd-4482-a5be-548164a328b3.webp',
  '63922e6f-49c6-4c64-b335-4f40bbb09d4d.webp',
  '684fedb5-2526-4a6b-81cc-dada1acd438f.webp',
  '685b8490-6da6-44c5-aab3-d01e619a4bb2.webp',
  '6ef0aac0-2a48-4e09-8531-fde04ab7a36a.webp',
  '845bd4af-da48-4e9d-904d-0ac38417d6bc.webp',
  '8aff76fb-a6ab-481b-9b26-8184d79070b0.webp',
  '9dd82913-035b-430e-bd51-9cef0121d084.webp',
  '9ef53d04-2c30-440e-ad05-4e38f81bf8a4.webp',
  'PHOTO-2026-09-16-12-20-40 2.webp',
  'PHOTO-2026-09-16-14-17-42.webp',
  'WhatsApp Image 2026-09-11 at 15.40.31.webp',
  'WhatsApp Image 2026-09-11 at 15.58.11 (1).webp',
  'WhatsApp Image 2026-09-11 at 15.58.11.webp',
  'WhatsApp Image 2026-09-11 at 15.58.12 (1).webp',
  'WhatsApp Image 2026-09-11 at 15.58.12 (2).webp',
  'WhatsApp Image 2026-09-11 at 15.58.12.webp',
  'WhatsApp Image 2026-09-11 at 16.25.27.webp',
  'a80e5428-da6a-4b57-9f60-4aea2b912e2e.webp',
  'ac9b33a0-bbe5-44ae-a512-99ef297c3195.webp',
  'c2baf997-6cb9-4650-9728-0b75f106f9ec.webp',
  'c38ade42-2a93-4ba0-b67c-36c38a12a3b8.webp',
  'cf1bd4f3-7196-4cfb-bb77-ea2fe910861b.webp',
  'd0cae189-6f99-409a-81d3-1b628d635e7a.webp',
  'd1cc2e71-a242-487f-b7ab-963be506266f.webp',
  'ddc1bdd8-3f0a-4e51-92e3-cedf1a4dbbc9.webp',
  'df703197-d76d-4a48-89fc-78432bc01ea4.webp',
  'f2e37b50-6ec9-46c1-b363-23ee5efc16d9.webp',
  'fa02dc33-eb9f-4a55-8117-eeb40ef3d581.webp',
  'fc81469d-8b12-4c0d-a09a-d54ca88cce2a.webp'
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
