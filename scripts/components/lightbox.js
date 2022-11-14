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

function removeMedia(container) {
  const lightboxMedia = document.querySelector('.lightbox-media');
  if (lightboxMedia) {
    container.removeChild(lightboxMedia);
  } else {
    return;
  }
}
