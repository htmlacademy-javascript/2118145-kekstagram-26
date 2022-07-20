const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const bigImage = document.querySelector('.img-upload__preview');
let scaleValueInput = document.querySelector('.scale__control--value');
let minScaleValue = 25;
let maxScaleValue = 100;
let currentValue = 100;

function addEventScalePlus(step) {
  scaleBigger.addEventListener('click', () => {
    if (currentValue < maxScaleValue) {
      currentValue = Math.max(currentValue + step, minScaleValue);
    }
    scaleValueInput.value = currentValue + '%';
    changeScaleImage(currentValue);
  });
}

function addEventScaleMinus(step) {
  scaleSmaller.addEventListener('click', () => {
    if (currentValue > minScaleValue) {
      currentValue = Math.min(currentValue - step, maxScaleValue);
    }
    scaleValueInput.value = currentValue + '%';
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
export { scaleEvents };
