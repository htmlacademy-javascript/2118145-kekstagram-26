<<<<<<< HEAD
export function initPopup(element, { onClose, onOpen } = {}) {

  const closeElement = element.querySelector('.cancel');
=======
import { resetEffect } from './effects.js';
export function initPopup(el, { onClose } = {}) {

  const closeElement = el.querySelector('.cancel');
  const imgUploadPreview = document.querySelector('.img-upload__preview img');
  const uploadInput = document.querySelector('#upload-file');
  const effectsPreviews = document.querySelectorAll('.effects__preview');
>>>>>>> 77812450262519e5e36395b45831b591fb1ab79c

  /** The function adds a click and click event handler for the close button
  **/
  function addCloseHandlers() {
    document.body.addEventListener('keydown', escapeCloseHandler);
    closeElement.addEventListener('click', closeHandler);
  }

  /** The function removes a click and click event handler for the close button
  **/
  function removeCloseHandlers() {
    document.body.removeEventListener('keydown', escapeCloseHandler);
    closeElement.removeEventListener('click', closeHandler);
  }

  /** The function  open a full size window with photo
  **/
  function openPopup() {
    element.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    addCloseHandlers();
<<<<<<< HEAD
    if (onOpen) {
      onOpen()
    }
=======
    showUploadImage();
>>>>>>> 77812450262519e5e36395b45831b591fb1ab79c
  }

  /** The function hides the window when the "Close window" button is clicked
  **/
  function closePopup() {
    element.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
<<<<<<< HEAD
    removeCloseHandlers();
=======
    removeCloseHadlers();
    resetEffect();
>>>>>>> 77812450262519e5e36395b45831b591fb1ab79c
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
<<<<<<< HEAD
=======

  /** The function upload our big image and preview
  **/
  function showUploadImage() {
    imgUploadPreview.src = URL.createObjectURL(uploadInput.files[0]);

    effectsPreviews.forEach((effectsPreview) => {
      effectsPreview.style.backgroundImage = `url(${imgUploadPreview.src})`;
    });

  }
>>>>>>> 77812450262519e5e36395b45831b591fb1ab79c
  return { openPopup, closePopup };
}
// export { initPopup };
