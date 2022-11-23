async function getData() {
  const data = await fetch('../../data/photographers.json');
  return data.json();
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
      return relatedMedias.sort((a, b) => b.likes - a.likes);
  }
}

function removeMedias(container) {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
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

  removeMedias(mediasGrid);

  relatedMedias.forEach((relatedMedia, index) => {
    relatedMedia.index = index;
    const mediaModel = mediaFactory(relatedMedia);
    const media = mediaModel.generateMediaGrid();
    mediasGrid.appendChild(media);
    media.children[0].addEventListener('click', () => {
      showLightbox(mediaModel, relatedMedias, relatedMedia);
    });
  });
}

function calculateLikes(medias) {
  const likes = medias.reduce((accumulator, media) => {
    return accumulator + media.likes;
  }, 0);
  return likes;
}

function generateLikeCounter(likes, price) {
  const heartIcon = '/assets/icons/black-heart-icon.png';
  const likeCounter = document.querySelector('.like-counter');
  const div = document.createElement('div');
  const p = document.createElement('p');
  const icon = document.createElement('img');
  const priceTextContainer = document.createElement('p');

  icon.setAttribute('src', heartIcon);
  p.textContent = likes;
  priceTextContainer.textContent = `${price}€ / jour`;

  icon.classList.add('heart-icon-black');

  div.appendChild(p);
  div.appendChild(icon);
  likeCounter.appendChild(div);
  likeCounter.appendChild(priceTextContainer);
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

  const likes = calculateLikes(relatedMedias);
  generateLikeCounter(likes, photographer[0].price);

  displayHeader(photographer[0]);
  displayMedias(sortMedias(relatedMedias, "trending"));

  filter.addEventListener('change', (e) => {
    const sortedMedias = sortMedias(relatedMedias, e.target.value);
    displayMedias(sortedMedias);
  });

  lightboxCloseIcon.addEventListener('click', () => {
    hideLightbox();
  });
}

init();
