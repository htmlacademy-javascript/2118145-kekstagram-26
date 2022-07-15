
import { returnRandomNumber, getRandomArrayElement, RandomGenerator } from './util.js';
import { getProfileUrlId } from './data-utils.js';
import { ARRAY_OF_USER_MESSAGES, ARRAY_OF_USER_NAMES, ARRAY_OF_IMAGES_DESCRIPTION, USER_PROFILE_MIN_LIKES_COUNT, USER_PROFILE_MAX_LIKES_COUNT, USER_PROFILE_MIN_COMMENTS_COUNT, USER_PROFILE_MAX_COMMENTS_COUNT, USER_PROFILES_MAX_ID_COUNT } from './constants.js';
let userProfileId = 1;
const commentIdGenerator = new RandomGenerator(USER_PROFILES_MAX_ID_COUNT * USER_PROFILE_MAX_COMMENTS_COUNT);
const userIdGenerator = new RandomGenerator(USER_PROFILES_MAX_ID_COUNT);
/** Function is generate comment
 * @param {number} commentId
 * @return {object}
**/
function generateComment() {
  return {
    id: commentIdGenerator.next(),
    avatar: `img/avatar-${returnRandomNumber(0, 6)}.svg`,
    message: getRandomArrayElement(ARRAY_OF_USER_MESSAGES),
    name: getRandomArrayElement(ARRAY_OF_USER_NAMES)
  };
}

/**  Function to generate comments
 * @param {number} length
 * @return {array}
**/
function generateComments(length) {
  return Array.from({ length }, generateComment);
}

function getAvatar() {
  let avatarIdGenerator = new RandomGenerator(6);
  const nextValue = avatarIdGenerator.next();
  if (!nextValue) {
    avatarIdGenerator = new RandomGenerator(6);
    return getAvatar();
  }
  return nextValue;
}

/** Function is generate profile
 * @param {number} userProfileId
 * @return {object}
**/
function generateUserProfile() {
  getAvatar();
  return {
    id: userIdGenerator.next(),
    url: `photos/${getProfileUrlId()}.jpg`,
    description: getRandomArrayElement(ARRAY_OF_IMAGES_DESCRIPTION),
    likes: returnRandomNumber(USER_PROFILE_MIN_LIKES_COUNT, USER_PROFILE_MAX_LIKES_COUNT),
    comments: generateComments(returnRandomNumber(USER_PROFILE_MIN_COMMENTS_COUNT, USER_PROFILE_MAX_COMMENTS_COUNT))
  };
}

/**  Function to generate profiles
 * @param {number} length
 * @return {array}
**/
function generateUserProfiles(length) {
  return Array.from({ length }, generateUserProfile);
}
export { generateUserProfiles };
