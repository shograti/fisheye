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

async function displayMedias(relatedMedias) {
  const mediasGrid = document.querySelector('.medias-grid');
  relatedMedias.forEach((relatedMedia) => {
    const mediaModel = mediaFactory(relatedMedia);
    const media = mediaModel.generateMediaGrid();
    media.setAttribute('id', mediaModel.id);
    mediasGrid.appendChild(media);
  });
}

async function init() {
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
}

init();
