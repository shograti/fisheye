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

async function init() {
  const { photographers, medias } = await getData();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  const photographer = photographers.filter(
    (photographer) => photographer.id === parseInt(id)
  );
  displayHeader(photographer[0]);
}

init();
