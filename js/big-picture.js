function showBigPicture(item) {
  const bigPictureElement = document.querySelector('.big-picture');
  const miniPictureElement = document.querySelectorAll('.picture');
  console.log(item.url);
  bigPictureElement.querySelector('.big-picture__img img').src = item.url;

    // bigPictureElement.querySelector('.big-picture__social .likes-count').textContent = item.comments.length;
    bigPictureElement.querySelector('.big-picture__social .comments-count').textContent = item.likes;
    // bigPictureElement.querySelector('.big-picture__social .social__comments img').src = item.comments.avatar;
    // bigPictureElement.querySelector('.big-picture__social .social__comment img').alt = item.comments.name;
    // bigPictureElement.querySelector('.big-picture__social .social__comment .social__text').alt = item.comments.message;
    bigPictureElement.querySelector('.big-picture__social .social__caption').textContent = item.description;

    miniPictureElement.forEach(itemPictureElement => {
      itemPictureElement.addEventListener('click', function () {
        if (bigPictureElement.classList.contains('hidden')) {
          bigPictureElement.classList.remove('hidden');
        }
        // console.log(this.querySelector('.picture__img').src);
      });
    });
}
document.addEventListener('load',showBigPicture);
export { showBigPicture };
