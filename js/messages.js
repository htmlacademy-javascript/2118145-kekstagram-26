function showSuccessMessage(message) {
  return createInfoBlock(message, {
    templateId: '#success',
    containerSelector: '.success',
    titleSelector: '.success__title',
    buttonSelector: '.success__button'
  });
}

function showDataErrorMessage(error) {
  return createInfoBlock(error, {
    templateId: '#error-data',
    containerSelector: '.error',
    titleSelector: '.error__title',
    buttonSelector: '.error__button',
    autoclose: 500
  });
}

function showErrorMessage(message) {
  return createInfoBlock(message, {
    templateId: '#load-error',
    containerSelector: '.error',
    titleSelector: '.error__title',
    buttonSelector: '.error__button'
  });
}

function createInfoBlock(message, { templateId, titleSelector, containerSelector, buttonSelector, autoclose = false }) {
  const messageTemplate = document.querySelector(templateId).content;
  const clonedTemplate = messageTemplate.cloneNode(true);
  const messageContainer = clonedTemplate.querySelector(containerSelector);
  messageContainer.style.zIndex = '1000';
  const titleElement = clonedTemplate.querySelector(titleSelector);
  const close = () => {
    messageContainer.remove();
    document.body.removeEventListener('keydown', escapeCloseHandler, true);
  };
  function escapeCloseHandler(evt) {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
      close();
    }
  }

  if (titleElement) {
    titleElement.textContent = message;
  }

  if (autoclose) {
    setTimeout(close, autoclose);
  }

  if (buttonSelector) {
    const button = messageContainer.querySelector(buttonSelector);
    button && button.addEventListener('click', close);
  }

  messageContainer.addEventListener('click', evt => {
    if (evt.target === messageContainer) {
      close();
    }
  });
  document.body.addEventListener('keydown', escapeCloseHandler, true);
  document.body.appendChild(clonedTemplate);
}
export { showSuccessMessage, showDataErrorMessage, showErrorMessage };
