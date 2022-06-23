import { getProfileUrlId } from './data-utils.js';
import { returnRandomNumber } from './util.js';
import { USER_PROFILE_MIN_LIKES_COUNT, USER_PROFILE_MAX_LIKES_COUNT, USER_PROFILE_MIN_COMMENTS_COUNT, USER_PROFILE_MAX_COMMENTS_COUNT } from './constants.js';

/** Function fills template elements with data
 *  *  @return {object}
**/
function setDataTemplate(templateChildImg, templateChildComments, templateChildLikes) {
  templateChildImg.children[0].setAttribute('src', `photos/${getProfileUrlId()}.jpg`);
  templateChildComments.textContent = returnRandomNumber(USER_PROFILE_MIN_LIKES_COUNT, USER_PROFILE_MAX_LIKES_COUNT);
  templateChildLikes.textContent = returnRandomNumber(USER_PROFILE_MIN_COMMENTS_COUNT, USER_PROFILE_MAX_COMMENTS_COUNT);
}
export { setDataTemplate };
