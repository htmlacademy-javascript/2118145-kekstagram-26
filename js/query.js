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
    return createTemplateMessage('#load-error',error.message);
  }
}
async function sendData(onSuccess,onError,form) {
  try {
    const response = await fetch(postRequestUrl, {
      method: 'POST',
      body: new FormData(form)
    });
    if (!response.ok) {
      throw new Error(`Не удалось отправить форму. Попробуйте еще раз. Ошибка:${response.status} — ${response.statusText}`);
    }
    onSuccess();
    return await response.json();
  } catch (error) {
    return onError();
  }
}


export { getData,sendData };
