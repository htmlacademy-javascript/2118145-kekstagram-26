import {USER_PROFILES_MIN_ID_COUNT,USER_PROFILES_MAX_ID_COUNT,userProfileUrlIdUsed} from './constants.js';
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

/**  Function to generate random index
 * @param {number} index
 * @return {number}
**/
function getProfileUrlId() {
  let index = 1;
  while (userProfileUrlIdUsed.includes(index)) {
    index = returnRandomNumber(USER_PROFILES_MIN_ID_COUNT, USER_PROFILES_MAX_ID_COUNT);
  }
  userProfileUrlIdUsed.push(index);
  return index;
}
export {getProfileUrlId,getRandomArrayElement,returnRandomNumber};
