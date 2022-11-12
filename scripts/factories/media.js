function mediaFactory(data) {
  const { id, video, image, likes, title } = data;

  const heartIcon = '/assets/icons/like.png';
  const imageMedia = `assets/medias/${image}`;
  const videoMedia = `assets/medias/${video}`;

  function generateMediaGrid() {
    const article = document.createElement('article');
    const textContainer = document.createElement('div');
    const h3 = document.createElement('h3');
    const likesContainer = document.createElement('div');
    const likesText = document.createElement('p');
    const icon = document.createElement('img');

    likesText.textContent = likes;
    h3.textContent = title;
    icon.setAttribute('src', heartIcon);

    likesContainer.appendChild(likesText);
    likesContainer.appendChild(icon);
    textContainer.appendChild(h3);
    textContainer.appendChild(likesContainer);
    article.appendChild(textContainer);

    textContainer.classList.add('text-container');
    likesContainer.classList.add('likes-container');
    icon.classList.add('heart-icon');

    if (image) {
      const img = document.createElement('img');
      img.setAttribute('src', imageMedia);
      article.prepend(img);
      return article;
    }

    if (video) {
      const videoPlayer = document.createElement('video');
      videoPlayer.setAttribute('src', videoMedia);
      article.prepend(videoPlayer);
      return article;
    }
  }

  return { id, generateMediaGrid };
}
