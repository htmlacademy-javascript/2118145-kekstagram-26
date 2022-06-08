/** A function that returns a random integer from the given range
 * @param {number} min
 * @param {number} max
 * @param {number} randomNumber
 * @return {boolean}
**/
function returnRandomNumber(min, max) {
  let randomNumber = Math.random() * -(max - min) + max;
  if (randomNumber < 0) {
    randomNumber = Math.abs(randomNumber);
  }
  return Math.round(randomNumber);
}
/** Function to check comment length
 * @param {string} checkStr
 * @param {number} maxLength
**/
const checkLengthString = (checkStr, maxLength) => checkStr.length <= maxLength;

/* Для дебага */
// console.log(checkLengthString('Hello world!', 11));
// console.log(returnRandomNumber(-400, -100));
