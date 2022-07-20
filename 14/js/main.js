import { showUploadForm,initValid} from './form.js';
import { editorImage } from './effects.js';
import {getData} from './query.js';
import { drawPictures } from './pictures.js';
const profiles = await getData();
drawPictures(profiles);
initValid();
document.querySelector('#upload-file').addEventListener('change', () => {
  showUploadForm();
  editorImage();
});
