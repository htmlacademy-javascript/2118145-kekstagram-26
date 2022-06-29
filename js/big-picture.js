const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancel = bigPictureElement.querySelector('.big-picture__cancel');
const urlPicture = bigPictureElement.querySelector('.big-picture__img img');
const descrPicture = bigPictureElement.querySelector('.big-picture__social .social__caption');
const countLikesPicture = bigPictureElement.querySelector('.big-picture__social .likes-count');
const commentsContainer = bigPictureElement.querySelector('.social__comments');
const сommentContainer = bigPictureElement.querySelector('.social__comment').cloneNode(true);
const commentsCount = bigPictureElement.querySelector('.comments-count');

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
  const cloneCommentElement = сommentContainer.cloneNode(true);
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

/** The function replaces old comments with new ones replaces old comments with new ones by appending to the HTML parent element
 * @param {object} itemReplaceComment
**/
function replaceComments(itemReplaceComment) {
  clearComments();
  commentsContainer.appendChild(createComments(itemReplaceComment));
  commentsCount.textContent = itemReplaceComment.length;
}
/** The function hides the window when the "Close window" button is clicked
**/
function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.style.overflow = 'auto';
  document.body.removeEventListener('keydown', closeEscapeBigPicture);
}

/** The function hides the window when the "Esc" key is pressed
**/
function closeEscapeBigPicture() {
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBigPicture();
    }
  });
}
bigPictureCancel.addEventListener('click', closeBigPicture);

/** The function calls methods to open a full size window, display user data, and load comments, and loads the current photo's user data
 *  @param {object} item
**/
function showBigPicture(item) {
  openBigPicture();
  replaceComments(item.comments);
  closeEscapeBigPicture();
  urlPicture.src = item.url;
  descrPicture.textContent = item.description;
  countLikesPicture.textContent = item.likes;
}
/** The function  open a full size window with photo
**/
function openBigPicture() {
  if (bigPictureElement.classList.contains('hidden')) {
    bigPictureElement.classList.remove('hidden');
  }
}
export { showBigPicture };
