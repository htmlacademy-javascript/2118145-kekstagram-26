import { MIN_SCALE_VALUE, MAX_SCALE_VALUE } from './constants.js';
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const bigImage = document.querySelector('.img-upload__preview');
const scaleValueInput = document.querySelector('.scale__control--value');
let currentValue = 100;

function resetScale() {
  scaleValueInput.value = `${100}%`;
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

function changeScaleImage() {
  bigImage.style.transform = `scale(${currentValue}%)`;
}

function scaleEvents() {
  addEventScalePlus(25);
  addEventScaleMinus(25);
}
export { scaleEvents, resetScale };
