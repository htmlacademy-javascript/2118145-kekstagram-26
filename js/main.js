import { showUploadForm, initValid } from './form.js';
import { editorImage } from './effects.js';
import { getData } from './query.js';
import { drawPictures } from './pictures.js';
import { initFilters } from './filters.js';
import {scaleEvents} from './scale.js';

document.addEventListener('DOMContentLoaded', async () => {
  const profiles = await getData();
  if (profiles) {
    initFilters(profiles, (filteredProfiles) => {
      drawPictures(filteredProfiles);
    });
  }
});

initValid();

document.querySelector('#upload-file').addEventListener('change', () => {
  showUploadForm();
  editorImage();
  scaleEvents();
});
