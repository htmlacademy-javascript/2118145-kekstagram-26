
import { returnRandomNumber, getRandomArrayElement } from './util.js';
import { getProfileUrlId } from './data-utils.js';
import {cloneTemplateElement} from './template.js';
import { USER_PROFILES_MAX_ID_COUNT, ARRAY_OF_USER_MESSAGES, ARRAY_OF_USER_NAMES, ARRAY_OF_IMAGES_DESCRIPTION, USER_PROFILE_MIN_LIKES_COUNT, USER_PROFILE_MAX_LIKES_COUNT, USER_PROFILE_MIN_COMMENTS_COUNT, USER_PROFILE_MAX_COMMENTS_COUNT } from './constants.js';
let commentId = 1;
let userProfileId = 1;
const templateParent = document.querySelector('#picture').content;
const templateChildImg = templateParent.querySelector('.picture');
const templateChildComments = templateParent.querySelector('.picture__comments');
const templateChildLikes = templateParent.querySelector('.picture__likes');
const userProfileUrlIdUsed = [];

/** Function is generate comment
 * @param {number} commentId
 * @return {object}
**/
function generateComment() {
  return {
    id: commentId++,
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

/** Function is generate profile
 * @param {number} userProfileId
 * @return {object}
**/
function generateUserProfile() {
  return {
    id: userProfileId++,
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
/**  Function to generate template elements
 * @param {number} length
 * @return {array}
**/
function generateTemplateElements() {
  return Array.from({ length: USER_PROFILES_MAX_ID_COUNT}, cloneTemplateElement);
}

export {generateUserProfiles, generateTemplateElements, userProfileUrlIdUsed, templateParent, templateChildImg, templateChildComments, templateChildLikes};
