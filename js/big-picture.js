import { initPopup } from './popup.js';
import './effects.js';
const bigPictureElement = document.querySelector('.big-picture');
const urlPicture = bigPictureElement.querySelector('.big-picture__img img');
const descrPicture = bigPictureElement.querySelector('.big-picture__social .social__caption');
const countLikesPicture = bigPictureElement.querySelector('.big-picture__social .likes-count');
const commentsContainer = bigPictureElement.querySelector('.social__comments');
const commentContainer = bigPictureElement.querySelector('.social__comment').cloneNode(true);
const commentsCount = bigPictureElement.querySelector('.comments-count');

const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

socialCommentCount.classList.remove('hidden');

const { openPopup } = initPopup(bigPictureElement,  removeLoadHadler);

/** Function clears old comments
**/
function clearComments() {
  commentsContainer.innerHTML = '';
}

/** Function fills empty space with comments
 * @param {object} itemComment
 * @return {DocumentFragment}
**/
function createComment(itemComment) {
  const cloneCommentElement = commentContainer.cloneNode(true);
  cloneCommentElement.querySelector('.social__picture').src = itemComment.avatar;
  cloneCommentElement.querySelector('.social__picture').alt = itemComment.name;
  cloneCommentElement.querySelector('.social__text').textContent = itemComment.message;
  return cloneCommentElement;
}

/** The function creates a Document Fragment(virtual buffer) with our data in function CreateComment()
 * @param {array} itemComments
 * @param {object} itemComment
 * @return {DocumentFragment}
**/
function createComments(itemComments) {
  const comments = document.createDocumentFragment();
  itemComments.forEach((itemComment) => {
    comments.appendChild(createComment(itemComment));
  });
  return comments;
}

function showNextCommentsPage(comments, page, onPage, maxCount, totalPages) {
  commentsContainer.appendChild(createComments(comments.slice((page - 1) * onPage, onPage * page)));
  socialCommentCount.textContent = `${Math.min(page * onPage, maxCount)} из ${maxCount} коментариев`;
  page++;
  if (page > totalPages) {
    commentsLoader.classList.add('hidden');
  }
}

function addLoadHandler(maxCount){
  commentsLoader.addEventListener('click', showNextCommentsPage);
  commentsCount.textContent = maxCount;
}
function removeLoadHadler(){
  commentsLoader.removeEventListener('click', showNextCommentsPage);
}
/** The function replaces old comments with new ones replaces old comments with new ones by appending to the HTML parent element
 * @param {object} itemReplaceComment
**/
function replaceComments(itemReplaceComment) {
  clearComments();
  const maxCount = itemReplaceComment.length;
  const  comment = itemReplaceComment;
  const onPage = 5;
  const totalPages = Math.ceil(maxCount / 5);
  const page = 1;
  commentsLoader.classList.remove('hidden');
  showNextCommentsPage(comment, page, onPage, totalPages, maxCount, totalPages);
  addLoadHandler(maxCount);
}

/** The function calls methods to open a full size window, display user data, and load comments, and loads the current photo's user data
 *  @param {object} item
**/
function showBigPicture(item) {
  openPopup();
  replaceComments(item.comments);
  urlPicture.src = item.url;
  descrPicture.textContent = item.description;
  countLikesPicture.textContent = item.likes;
}
export { showBigPicture };
