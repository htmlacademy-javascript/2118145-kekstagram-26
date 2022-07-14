/** A function that returns a random integer from the given range
 * @param {number} min
 * @param {number} max
 * @return {number}
**/
function returnRandomNumber(min, max) {
  let randomNumber = Math.random() * -(max - min) + max;
  if (randomNumber < 0) {
    randomNumber = Math.abs(randomNumber);
  }
  if (typeof randomNumber !== 'number' || !Number.isFinite(randomNumber) || isNaN(randomNumber)) {
    throw new TypeError('Parameters not valid.');
  }
  return Math.round(randomNumber);
}

/** Function to check comment length
 * @param {string} checkStr
 * @param {number} maxLength
 * @return {boolean}
**/
const checkLengthString = (checkStr, maxLength) => checkStr.length <= maxLength;

/** Function is return random element from array(etc. message,name)
 * @return {string}
**/
function getRandomArrayElement(array) {
  return array[returnRandomNumber(0, array.length - 1)];
}

class RandomGenerator {
  constructor(length) {
    this.array = Array.from({length}, (_, index) => index + 1);
  }

  next() {
    return this.array.splice(returnRandomNumber(1, this.array.length - 1), 1).shift();
  }
}
export { getRandomArrayElement, returnRandomNumber, RandomGenerator };
