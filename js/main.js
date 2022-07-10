import { generateUserProfiles } from './data.js';
import { USER_PROFILES_MAX_ID_COUNT } from './constants.js';
import { drawPictures } from './pictures.js';
import { showUploadForm,initValid} from './form.js';
const profiles = generateUserProfiles(USER_PROFILES_MAX_ID_COUNT);
drawPictures(profiles);
initValid();
document.querySelector('#upload-file').addEventListener('change', () => {
  showUploadForm();
});
