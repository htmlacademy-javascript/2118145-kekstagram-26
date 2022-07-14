const effectButton = document.querySelectorAll('.effects__radio');
const bigImage = document.querySelector('.img-upload__preview');
const scaleSmaller = document.querySelectorAll('.scale__control--smaller');
const scaleBigger = document.querySelectorAll('.scale__control--bigger');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
let scaleValue = document.querySelector('.scale__control--value');
let minScaleValue = 25;
let maxScaleValue = 100;
const arrayScale = [];

function removeEventEffect() {
  bigImage.forEach((image) => {
    image.className = 'img-upload__preview';
  });
}

function addEventEffect(classEffect) {
  bigImage.forEach((image) => {
    image.classList.add(classEffect);
  });
}

function createEffect() {
  const arrayEffects = ['chrome', 'sepia', 'marvin', 'phobos', 'heat', 'none'];
  effectButton.forEach((effect) => {
    arrayEffects.forEach((item) => {
      effect.addEventListener('click', (evt) => {
        switch (evt.currentTarget.id) {
          case 'effect-' + item:
            removeEventEffect();
            return addEventEffect('effects__preview--' + item);
          default:
            break;
        }
      });
    });
  });
}

function addEventScalePlus(scale) {

  scaleBigger.forEach((item) => {
    item.addEventListener('click', () => {
      console.log(arrayScale);
      if (arrayScale.includes(minScaleValue)) {
        minScaleValue += scale;
        scaleValue.value = minScaleValue + '%';
        arrayScale.push(minScaleValue);
      } else {
        arrayScale = [];
        return false;
      }
      changeScaleImage();
    });
  });
}
function addEventScaleMinus(scale) {
  scaleSmaller.forEach((item) => {
    item.addEventListener('click', () => {
      if (!arrayScale.includes(minScaleValue)) {
        maxScaleValue -= scale;
        scaleValue.value = maxScaleValue + '%';
        arrayScale.push(maxScaleValue);
      } else {
        arrayScale = [];
        return false;
      }
      changeScaleImage();
    });
  });
}

function changeScaleImage() {
  arrayScale.forEach((scale) => {
    switch (scale) {
      case 100:
        bigImage.style.transform = 'scale(1.00)';
        break;
      case 75:
        bigImage.style.transform = 'scale(0.75)';
        console.log(bigImage);
        break;
      case 50:
        bigImage.style.transform = 'scale(0.50)';
        break;
      case 25:
        bigImage.style.transform = 'scale(0.25)';
        break;
      default:
        //
        break;
    }
  });
}

function levelValue() {
  effectLevelValue.value = 0;

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },

    start: 0,
    step: 0.1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    effectLevelValue.value = sliderElement.noUiSlider.get();
  });

  effectLevelValue.addEventListener('change', (evt) => {
    if (evt.target) {
      previewEffectsChrome.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 10,
        },
        step: 0.1,
      });
    } else {
      previewEffectsChrome.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 0.1,
      });
    }
  });

}

function addEventScale() {
  addEventScalePlus(25);
  addEventScaleMinus(25);
}
function editorImage() {
  createEffect();
  addEventScale();
  levelValue();
}
export { editorImage };
