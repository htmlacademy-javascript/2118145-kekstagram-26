import {generateUserProfiles} from './data.js';
import {USER_PROFILES_MAX_ID_COUNT} from './constants.js';
import {drawPictures} from './pictures.js';

const profiles = generateUserProfiles(USER_PROFILES_MAX_ID_COUNT);
drawPictures(profiles);
