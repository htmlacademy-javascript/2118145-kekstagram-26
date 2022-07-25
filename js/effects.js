
const sliderElement = document.querySelector('.effect-level__slider');
const effectsElement = document.querySelector('.effects');
const effectInputElement = document.querySelector('.effect-level__value');
const effectLevelElement = document.querySelector('.effect-level');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsRadioElements = document.querySelectorAll('.effects__radio');
let isLevelInitiated = false;

function resetEffect() {
  imgUploadPreview.style.filter = '';
  effectLevelElement.classList.add('hidden');
  effectsRadioElements.forEach((effectsRadio, index) => {
    effectsRadio.checked = index === 0;
  })
}

function setLevelValue() {
  let currentEffect = 'none';
  const EFFECTS = {
    'effect-chrome':
    {
      filter: 'grayscale',
      unit: '',
      slider: { step: 0.1, min: 0, max: 1 }
    },
    'effect-sepia':
    {
      filter: 'sepia',
      unit: '',
      slider: { step: 0.1, min: 0, max: 1 }
    },
    'effect-marvin':
    {
      filter: 'invert',
      unit: '%',
      slider: { step: 1, min: 0, max: 100 }
    },
    'effect-phobos':
    {
      filter: 'blur',
      unit: 'px',
      slider: { step: 0.1, min: 0, max: 3 }
    },
    'effect-heat':
    {
      filter: 'brightness',
      unit: '',
      slider: { step: 0.1, min: 1, max: 3 }
    },
  };

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
    effectInputElement.value = sliderElement.noUiSlider.get();
    if (currentEffect in EFFECTS) {
      const effect = EFFECTS[currentEffect];
      imgUploadPreview.style.filter = `${effect.filter}(${effectInputElement.value}${effect.unit})`;
    } else {
      resetEffect();
    }
  });

  effectsElement.addEventListener('change', (evt) => {
    currentEffect = evt.target.id;
    if (currentEffect in EFFECTS) {
      effectLevelElement.classList.remove('hidden');
      const effect = EFFECTS[currentEffect];
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: effect.slider.min,
          max: effect.slider.max,
        },
        step: effect.slider.step,
      });
    } else {
      currentEffect = 'none';
      resetEffect();
    }
  });
  isLevelInitiated = true;
}

function initEditorImage() {
  if (!isLevelInitiated) {
    setLevelValue();
  }
}

export { initEditorImage, resetEffect };
