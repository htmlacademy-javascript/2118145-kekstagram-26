import {USER_PROFILES_MIN_ID_COUNT,USER_PROFILES_MAX_ID_COUNT} from './constants.js';
import {returnRandomNumber} from './util.js';

const userProfileUrlIdUsed = [];

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
export {getProfileUrlId};
