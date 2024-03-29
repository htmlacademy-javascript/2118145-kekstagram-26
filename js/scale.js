import { MIN_SCALE_VALUE, MAX_SCALE_VALUE,DEFAULT_VALUE,VALUE_SCALE_PLUS, VALUE_SCALE_MINUS } from './constants.js';
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const bigImage = document.querySelector('.img-upload__preview img');
const scaleValueInput = document.querySelector('.scale__control--value');
let currentValue = 100;

function resetScale() {
  currentValue = DEFAULT_VALUE;
  scaleValueInput.value = `${DEFAULT_VALUE}%`;
  changeScaleImage(DEFAULT_VALUE);
  return scaleValueInput;
}

function addEventScalePlus(step) {
  scaleBigger.addEventListener('click', () => {
    if (currentValue < MAX_SCALE_VALUE) {
      currentValue = Math.max(currentValue + step, MIN_SCALE_VALUE);
    }
    scaleValueInput.value = `${currentValue}%`;
    changeScaleImage(currentValue);
  });
}

function addEventScaleMinus(step) {
  scaleSmaller.addEventListener('click', () => {
    if (currentValue > MIN_SCALE_VALUE) {
      currentValue = Math.min(currentValue - step, MAX_SCALE_VALUE);
    }
    scaleValueInput.value = `${currentValue}%`;
    changeScaleImage(currentValue);
  });
}

function changeScaleImage(defaultValue) {
  bigImage.style.transform = `scale(${defaultValue}%)`;
}

let scaleEventsInitiated = false;
function initScale() {
  if (!scaleEventsInitiated) {
    addEventScalePlus(VALUE_SCALE_PLUS);
    addEventScaleMinus(VALUE_SCALE_MINUS);
    scaleEventsInitiated = true;
  }
}
export { initScale, resetScale };
