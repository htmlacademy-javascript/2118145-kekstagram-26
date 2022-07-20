// const templateSuccess = document.querySelector('#success').content;
// const templateLoadError = document.querySelector('#load-error').content;
// const templateError = document.querySelector('#error-data').content;
// import { initPopup } from './popup.js';


function createTemplateMessage(item, message, title) {
  const templateMessage = document.querySelector(item).content;
  return createInfoBlock(templateMessage, message, title);
}

function createTemplateError(item, error, title) {
  const templateError = document.querySelector(item).content;
  return createInfoBlock(templateError, error, title);
}

function handlerButtonMessage(messageContainer) {
  messageContainer.querySelector('.success__button').addEventListener('click', () => {
    messageContainer.remove();
  });
}

function handlerButtonError(errorContainer) {
  errorContainer.querySelector('.error__button').addEventListener('click', () => {
    errorContainer.remove();
  });
}
// function escapeHandler(block) {
//   block.addEventListener('keydown', (evt) => {
//     console.log(evt.target.key);
//     if (evt.key == 'Escape') {
//       block.classList.add('hidden');
//       document.body.style.overflow = 'auto';
//       document.body.removeEventListener('keydown', escapeCloseHandler);
//     }
//   });
// }
function createInfoBlock(messageTemplate, message, title) {
  const clonedTemplate = messageTemplate.cloneNode(true);
  const messageContainer = clonedTemplate.querySelector('.success');
  const errorContainer = clonedTemplate.querySelector('.error');
  if (messageContainer != null) {
    handlerButtonMessage(messageContainer);
    // escapeHandler(messageContainer);
  }
  if (errorContainer != null) {
    handlerButtonError(errorContainer);
    // escapeHandler(errorContainer);
  }
  clonedTemplate.querySelector(title).textContent = message;
  return document.body.appendChild(clonedTemplate);
}



export { createTemplateMessage, createTemplateError };
