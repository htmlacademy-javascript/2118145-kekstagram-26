import { resetEffect } from './effects.js';
export function initPopup(el, { onClose } = {}) {

  const closeElement = el.querySelector('.cancel');
  const imgUploadPreview = document.querySelector('.img-upload__preview img');
  const uploadInput = document.querySelector('#upload-file');
  const effectsPreviews = document.querySelectorAll('.effects__preview');

  /** The function adds a click and click event handler for the close button
  **/
  function addCloseHandlers() {
    document.body.addEventListener('keydown', escapeCloseHandler);
    closeElement.addEventListener('click', closeHandler);
  }

  /** The function removes a click and click event handler for the close button
  **/
  function removeCloseHadlers() {
    document.body.removeEventListener('keydown', escapeCloseHandler);
    closeElement.removeEventListener('click', closeHandler);
  }

  /** The function  open a full size window with photo
  **/
  function openPopup() {
    el.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    addCloseHandlers();
    showUploadImage();
  }

  /** The function hides the window when the "Close window" button is clicked
  **/
  function closePopup() {
    el.classList.add('hidden');
    document.body.style.overflow = 'auto';
    removeCloseHadlers();
    resetEffect();
    if (onClose) {
      onClose();
    }
  }

  /** The function call function closeBigPicture
  **/
  function closeHandler() {
    closePopup();
  }

  /** The function hides the window when the "Esc" key is pressed
  **/
  function escapeCloseHandler(evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  }

  /** The function upload our big image and preview
  **/
  function showUploadImage() {
    imgUploadPreview.src = URL.createObjectURL(uploadInput.files[0]);

    effectsPreviews.forEach((effectsPreview) => {
      effectsPreview.style.backgroundImage = `url(${imgUploadPreview.src})`;
    });

  }
  return { openPopup, closePopup };
}
// export { initPopup };
