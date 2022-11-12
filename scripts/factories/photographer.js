function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function generateUserCard() {
    const article = document.createElement('article');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const priceText = document.createElement('p');

    a.setAttribute('href', `/photographer.html?id=${id}`);
    img.setAttribute('src', picture);
    img.setAttribute('alt', name);
    h2.textContent = name;
    h3.textContent = `${city}, ${country}`;
    p.textContent = tagline;
    priceText.textContent = `${price}€/jour`;

    priceText.classList.add('price-text');

    a.appendChild(img);
    article.appendChild(a);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(priceText);

    return article;
  }
  return { name, picture, generateUserCard };
}
