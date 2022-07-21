import { showDataErrorMessage } from './messages.js';
const getRequestUrl = 'https://26.javascript.pages.academy/kekstagram/data';
const postRequestUrl = 'https://26.javascript.pages.academy/kekstagram';
async function getData() {
  try {
    const response = await fetch(getRequestUrl);
    if (!response.ok) {
      throw new Error(`Не удалось загрузить изображения. Ошибка:${response.status} — ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    showDataErrorMessage(error.message);
  }
}
async function sendData(form) {
  const response = await fetch(postRequestUrl, {
    method: 'POST',
    body: new FormData(form)
  });
  return await response.json();
}
export { getData, sendData };
