
import { returnRandomNumber, getRandomArrayElement, RandomGenerator } from './util.js';
import { getProfileUrlId } from './data-utils.js';
import { MESSAGES, MESSAGES, DESCRIPTIONS, USER_PROFILE_MIN_LIKES_COUNT, USER_PROFILE_MAX_LIKES_COUNT, USER_PROFILE_MIN_COMMENTS_COUNT, USER_PROFILE_MAX_COMMENTS_COUNT, USER_PROFILES_MAX_ID_COUNT,COUNT_ID_PROFILES,MIN_ID_PROFILES,MAX_ID_PROFILES } from './constants.js';
const commentIdGenerator = new RandomGenerator(USER_PROFILES_MAX_ID_COUNT * USER_PROFILE_MAX_COMMENTS_COUNT);
const userIdGenerator = new RandomGenerator(USER_PROFILES_MAX_ID_COUNT);

/** Function is generate comment
 * @param {number} commentId
 * @return {object}
**/
function generateComment() {
  return {
    id: commentIdGenerator.next(),
    avatar: `img/avatar-${returnRandomNumber(MIN_ID_PROFILES, MAX_ID_PROFILES)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(MESSAGES)
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
  let avatarIdGenerator = new RandomGenerator(COUNT_ID_PROFILES);
  const nextValue = avatarIdGenerator.next();
  if (!nextValue) {
    avatarIdGenerator = new RandomGenerator(COUNT_ID_PROFILES);
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
    description: getRandomArrayElement(DESCRIPTIONS),
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
export { generateUserProfiles,generateUserProfile };
