export function initPopup(element, { close, onOpen } = {}) {

  const closeElement = element.querySelector('.cancel');

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
    if (onOpen) {
      onOpen();
    }
  }

  /** The function hides the window when the "Close window" button is clicked
  **/
  function closePopup() {
    element.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
    removeCloseHandlers();
    if (close) {
      close();
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
  return { openPopup, closePopup };
}
// export { initPopup };
