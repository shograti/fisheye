function mediaFactory(data) {
  const { id, video, image, likes, title } = data;

  const heartIcon = "/assets/icons/like.png";
  const imageMedia = `assets/medias/${image}`;
  const videoMedia = `assets/medias/${video}`;

  function generateMediaGrid() {
    const article = document.createElement("article");
    const textContainer = document.createElement("div");
    const h3 = document.createElement("h3");
    const likesContainer = document.createElement("div");
    const likesText = document.createElement("p");
    const icon = document.createElement("img");

    likesText.textContent = likes;
    h3.textContent = title;
    icon.setAttribute("src", heartIcon);
    icon.setAttribute("alt", "Likes");
    likesContainer.setAttribute("aria-label", "likes");

    likesContainer.appendChild(likesText);
    likesContainer.appendChild(icon);
    textContainer.appendChild(h3);
    textContainer.appendChild(likesContainer);
    article.appendChild(textContainer);

    textContainer.classList.add("text-container");
    likesContainer.classList.add("likes-container");
    icon.classList.add("heart-icon");

    likesContainer.addEventListener("click", () => {
      if (parseInt(likesText.textContent) === likes) {
        likesText.textContent = parseInt(likesText.textContent) + 1;
        updateGlobalLikes();
      }
    });

    if (image) {
      const img = document.createElement("img");
      img.setAttribute("src", imageMedia);
      img.setAttribute("alt", title);
      img.classList.add("media");
      img.setAttribute("aria-label", "Lilac breasted roller, closeup view");
      article.prepend(img);
      return article;
    }

    if (video) {
      const videoPlayer = document.createElement("video");
      videoPlayer.setAttribute("src", videoMedia);
      videoPlayer.classList.add("media");
      videoPlayer.setAttribute("title", title);
      videoPlayer.setAttribute(
        "aria-label",
        "Lilac breasted roller, closeup view",
      );
      article.prepend(videoPlayer);
      return article;
    }
  }

  function generateLightboxMedia() {
    if (image) {
      const media = document.createElement("img");
      media.setAttribute("src", imageMedia);
      media.setAttribute("alt", title);
      media.classList.add("lightbox-media");
      media.setAttribute("aria-label", "Lilac breasted roller");
      return media;
    }

    if (video) {
      const media = document.createElement("video");
      media.setAttribute("src", videoMedia);
      media.setAttribute("title", title);
      media.setAttribute("aria-label", "Lilac breasted roller");
      media.classList.add("lightbox-media");
      return media;
    }
  }

  return {
    id,
    imageMedia,
    videoMedia,
    generateMediaGrid,
    generateLightboxMedia,
  };
}
