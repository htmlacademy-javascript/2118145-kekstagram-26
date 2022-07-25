import { shuffle, throttle } from './util.js';
import { DELAY_UPDATING_FILTERS } from './constants.js';

const filtersElement = document.querySelector('.img-filters');
const formElement = filtersElement.querySelector('.img-filters__form');
const formButtons = filtersElement.querySelectorAll('.img-filters__button');

function initFilters(profiles, cb) {
  filtersElement.classList.remove('img-filters--inactive');

  const doFiltering = throttle((evt) => {
    if (evt.target) {
      formButtons.forEach((formButton) => {
        if (formButton !== evt.target) {
          formButton.classList.remove('img-filters__button--active');
        } else {
          formButton.classList.add('img-filters__button--active');
        }
      });
    }
    switch (evt.target.id) {
      case 'filter-default': {
        cb(profiles);
        break;
      }
      case 'filter-random': {
        const shuffledProfiles = profiles.slice();
        shuffle(shuffledProfiles);
        cb(shuffledProfiles.splice(0, 10));
        break;
      }
      case 'filter-discussed': {
        const sortedProfiles = profiles.slice();
        sortedProfiles.sort((a, b) => b.comments.length - a.comments.length);
        cb(sortedProfiles);
        break;
      }
    }
  }, DELAY_UPDATING_FILTERS);
  
  formElement.addEventListener('click', doFiltering);

  cb(profiles);
}
export { initFilters };
