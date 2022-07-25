import { MIN_SCALE_VALUE, MAX_SCALE_VALUE,DEFAULT_VALUE } from './constants.js';
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const bigImage = document.querySelector('.img-upload__preview');
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

function changeScaleImage(currentValue) {
  console.log(currentValue)
  bigImage.style.transform = `scale(${currentValue}%)`;
}

let scaleEventsInitiated = false
function initScale() {
  if (!scaleEventsInitiated) {
    addEventScalePlus(25);
    addEventScaleMinus(25);
    scaleEventsInitiated = true
  }
}
export { initScale, resetScale };
