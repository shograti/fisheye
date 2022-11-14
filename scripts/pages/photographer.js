async function getData() {
  const data = await fetch('../../data/photographers.json');
  return data.json();
}

async function displayHeader(photographer) {
  const photographHeader = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographer);
  const { article, img } = photographerModel.generateUserHeader();
  photographHeader.prepend(article);
  photographHeader.appendChild(img);
}

function sortMedias(relatedMedias, option) {
  switch (option) {
    case 'trending':
      return relatedMedias.sort((a, b) => b.likes - a.likes);
    case 'date':
      return relatedMedias.sort((a, b) =>
        new Date(a.date) > new Date(b.date)
          ? 1
          : new Date(b.title) > new Date(a.title)
          ? -1
          : 0
      );
    case 'title':
      return relatedMedias.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
    default:
      break;
  }
}

function removeMedias(container) {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
}

function removeMedia(container) {
  const lightboxMedia = document.querySelector('.lightbox-media');
  if (lightboxMedia) {
    container.removeChild(lightboxMedia);
  } else {
    return;
  }
}

function displayMedia(media) {
  const lightbox = document.getElementById('lightbox');
  lightbox.appendChild;
}

async function displayMedias(relatedMedias) {
  const mediasGrid = document.querySelector('.medias-grid');

  removeMedias(mediasGrid);

  relatedMedias.forEach((relatedMedia, index) => {
    relatedMedia.index = index;
    const mediaModel = mediaFactory(relatedMedia);
    const media = mediaModel.generateMediaGrid();
    mediasGrid.appendChild(media);
    media.addEventListener('click', () => {
      showLightbox(mediaModel, relatedMedias, relatedMedia);
    });
  });
}

function showLightbox(mediaModel, relatedMedias, relatedMedia) {
  let currentMedia = relatedMedia;
  const main = document.getElementById('main');
  const lightbox = document.getElementById('lightbox');
  const header = document.getElementById('header');

  header.style.display = 'none';
  main.style.display = 'none';
  lightbox.style.display = 'flex';

  removeMedia(lightbox);

  const media = mediaModel.generateLightboxMedia();
  lightbox.appendChild(media);

  const previousImageButton = document.getElementById('previous-image-button');
  const nextImageButton = document.getElementById('next-image-button');

  checkPreviousButtonDisplay();
  checkNextButtonDisplay();

  function checkPreviousButtonDisplay() {
    if (currentMedia.index === 0) {
      previousImageButton.style.display = 'none';
    } else {
      previousImageButton.style.display = 'block';
    }
  }

  function checkNextButtonDisplay() {
    if (!findNextMedia(relatedMedias, currentMedia)) {
      nextImageButton.style.display = 'none';
    } else {
      nextImageButton.style.display = 'block';
    }
  }

  function findPreviousMedia(relatedMedias, relatedMedia) {
    const mediaToDisplay = relatedMedias.filter(
      (media) => media.index === relatedMedia.index - 1
    );
    return mediaToDisplay[0];
  }

  function findNextMedia(relatedMedias, relatedMedia) {
    const mediaToDisplay = relatedMedias.filter(
      (media) => media.index === relatedMedia.index + 1
    );
    return mediaToDisplay[0];
  }

  function displayPreviousMedia() {
    removeMedia(lightbox);
    const previousMedia = findPreviousMedia(relatedMedias, currentMedia);
    const mediaModel = mediaFactory(previousMedia);
    const mediaToDisplay = mediaModel.generateLightboxMedia();
    lightbox.appendChild(mediaToDisplay);
    currentMedia = previousMedia;
    checkPreviousButtonDisplay();
    nextImageButton.style.display = 'block';
  }

  function displayNextMedia() {
    removeMedia(lightbox);
    const nextMedia = findNextMedia(relatedMedias, currentMedia);
    const mediaModel = mediaFactory(nextMedia);
    const mediaToDisplay = mediaModel.generateLightboxMedia();
    lightbox.appendChild(mediaToDisplay);
    currentMedia = nextMedia;
    checkNextButtonDisplay();
    checkPreviousButtonDisplay();
  }

  previousImageButton.addEventListener('click', () => {
    displayPreviousMedia();
  });

  nextImageButton.addEventListener('click', () => {
    displayNextMedia();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentMedia.index !== 0) {
      displayPreviousMedia();
    }
    if (e.key === 'ArrowRight' && findNextMedia(relatedMedias, currentMedia)) {
      displayNextMedia();
    }
    if (e.key === 'Escape') {
      hideLightbox();
    }
  });
}

function hideLightbox() {
  const main = document.getElementById('main');
  const lightbox = document.getElementById('lightbox');
  main.style.display = 'block';
  header.style.display = 'block';
  lightbox.style.display = 'none';
}

async function init() {
  const filter = document.getElementById('filter');
  const lightboxCloseIcon = document.querySelector('.close-icon');
  const { photographers, medias } = await getData();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  const photographer = photographers.filter(
    (photographer) => photographer.id === parseInt(id)
  );

  const relatedMedias = medias.filter(
    (media) => media.photographerId === parseInt(id)
  );

  displayHeader(photographer[0]);
  displayMedias(relatedMedias);

  filter.addEventListener('change', (e) => {
    const sortedMedias = sortMedias(relatedMedias, e.target.value);
    displayMedias(sortedMedias);
  });

  lightboxCloseIcon.addEventListener('click', () => {
    hideLightbox();
  });
}

init();
