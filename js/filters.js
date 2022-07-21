import { shuffle, throttle } from './util.js';
import { DELAY_UPDATING_FILTERS } from './constants.js';

const filtersEl = document.querySelector('.img-filters');
const formEl = filtersEl.querySelector('.img-filters__form');
const formButtons = filtersEl.querySelectorAll('.img-filters__button');

function initFilters(profiles, cb) {
  filtersEl.classList.remove('img-filters--inactive');

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
        cb(shuffledProfiles);
        break;
      }
      case 'filter-discussed': {
        const sortedProfiles = profiles.slice();
        sortedProfiles.sort((a, b) => b.comments.length - a.comments.lenght);
        cb(sortedProfiles);
        break;
      }
    }
  }, DELAY_UPDATING_FILTERS);

  formEl.addEventListener('click', doFiltering);
  cb(profiles);
}
export { initFilters };
