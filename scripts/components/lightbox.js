function showLightbox(mediaModel, relatedMedias, relatedMedia) {
  let currentMedia = relatedMedia;
  const main = document.getElementById('main');
  const lightboxContainer = document.getElementById('lightbox');
  const header = document.getElementById('header');
  const lightbox = document.getElementById('lightbox-image-container');

  header.style.display = 'none';
  main.style.display = 'none';
  lightboxContainer.style.display = 'flex';

  removeMedia(lightbox);

  const media = mediaModel.generateLightboxMedia();
  lightbox.appendChild(media);

  const previousImageButton = document.getElementById('previous-image-button');
  const nextImageButton = document.getElementById('next-image-button');

  function findPreviousMedia(relatedMedias, relatedMedia) {
    const mediaToDisplay = relatedMedias.filter(
      (media) => media.index === relatedMedia.index - 1
    );
    if (!mediaToDisplay[0]) {
      return relatedMedias[relatedMedias.length - 1];
    }
    return mediaToDisplay[0];
  }

  function findNextMedia(relatedMedias, relatedMedia) {
    const mediaToDisplay = relatedMedias.filter(
      (media) => media.index === relatedMedia.index + 1
    );
    if (!mediaToDisplay[0]) {
      return relatedMedias[0];
    }
    return mediaToDisplay[0];
  }

  function displayPreviousMedia() {
    removeMedia(lightbox);
    const previousMedia = findPreviousMedia(relatedMedias, currentMedia);
    const mediaModel = mediaFactory(previousMedia);
    const mediaToDisplay = mediaModel.generateLightboxMedia();
    lightbox.appendChild(mediaToDisplay);
    currentMedia = previousMedia;
    nextImageButton.style.display = 'block';
  }

  function displayNextMedia() {
    removeMedia(lightbox);
    const nextMedia = findNextMedia(relatedMedias, currentMedia);
    const mediaModel = mediaFactory(nextMedia);
    const mediaToDisplay = mediaModel.generateLightboxMedia();
    lightbox.appendChild(mediaToDisplay);
    currentMedia = nextMedia;
  }

  previousImageButton.addEventListener('click', () => {
    displayPreviousMedia();
  });

  nextImageButton.addEventListener('click', () => {
    displayNextMedia();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      displayPreviousMedia();
    }
    if (e.key === 'ArrowRight') {
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
