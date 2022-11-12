async function getData() {
  const data = await fetch('../../data/photographers.json');
  return data.json();
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCard = photographerModel.generateUserCard();
    photographersSection.appendChild(userCard);
  });
}

async function init() {
  const { photographers } = await getData();
  displayData(photographers);
}

init();
