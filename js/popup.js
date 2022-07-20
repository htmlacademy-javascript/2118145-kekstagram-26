import { resetEffect } from "./effects.js";
export function initPopup(el,{onClose}={}) {

  const closeElement = el.querySelector('.cancel');

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
  }

  /** The function hides the window when the "Close window" button is clicked
  **/
  function closePopup() {
    el.classList.add('hidden');
    document.body.style.overflow = 'auto';
    removeCloseHadlers();
    resetEffect();
    if(onclose) {
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
  return { openPopup,closePopup };
}
// export { initPopup };
