/* Функция, возвращающая случайное целое число из переданного диапазона  */
function returnRandomNumber(min, max) {
  let randomNumber;
  randomNumber = Math.random() * -(max - min) + max;
  /* Если число отрицательное, то заносим результат в модуль Math.abs и возвращаем положительным */
  if (randomNumber < 0) {
    randomNumber = Math.abs(randomNumber);
  }
  return Math.round(randomNumber);
}
/* Функция для проверки максимальной длины строки.  */
function checkLengthString(checkStr, maxLength) {
  let resultMessage;
  /* Пока что через параметр, но в будущем можно подключить querySelector к textarea и оттуда уже вытаскивать содержимое */
  if (checkStr.length <= maxLength) {
    resultMessage= 'true';
  }
  else {
    resultMessage= 'false';
  }
  return resultMessage;
}
/* Для дебага */
// console.log(checkLengthString('Hello world!', 12));
// console.log(returnRandomNumber(-400, -100));
