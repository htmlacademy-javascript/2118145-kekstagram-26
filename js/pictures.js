import { showBigPicture } from './big-picture.js';
const templatePicture = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');

/** Function fills template elements with data
 * @param {object} item
 * @return {DocumentFragment}
**/
function createPicture(item) {
  const clonedPictureElement = templatePicture.cloneNode(true);
  clonedPictureElement.querySelector('.picture__img').src = item.url;
  clonedPictureElement.querySelector('.picture__comments').textContent = item.comments.length;
  clonedPictureElement.querySelector('.picture__likes').textContent = item.likes;
  clonedPictureElement.querySelector('.picture').addEventListener('click',() => showBigPicture(item));
  return clonedPictureElement;
}

/** The function creates a Document Fragment(virtual buffer) with our data in function CreatePictrue()
 * @param {array} items
 * @param {object} item
 * @return {DocumentFragment}
**/
function createPictures(items) {
  const pictures = document.createDocumentFragment();
  items.forEach((item) => {
    pictures.appendChild(createPicture(item));
  });
  return pictures;
}

/** The function adds our data from the virtual fragment to the container with the class pictures
 * @param {array} items
 * @return {DocumentFragment}
**/
function drawPictures(items) {
  picturesContainer.appendChild(createPictures(items));
}
export { drawPictures };

