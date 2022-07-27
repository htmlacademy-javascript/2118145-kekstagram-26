import {START_SLIDER,STEP_SLIDER,MIN_RANGE,MAX_RANGE,STEP_EFFECT_CHROME,STEP_EFFECT_SEPIA,STEP_EFFECT_MARVIN,STEP_EFFECT_PHOBOS,STEP_EFFECT_HEAT,MIN_RANGE_CHROME,MIN_RANGE_SEPIA,MIN_RANGE_MARVIN,MIN_RANGE_PHOBOS,MIN_RANGE_HEAT,MAX_RANGE_CHROME,MAX_RANGE_SEPIA,MAX_RANGE_MARVIN,MAX_RANGE_PHOBOS,MAX_RANGE_HEAT} from './constants.js';

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
  });
}

function setLevelValue() {
  let currentEffect = 'none';
  const EFFECTS = {
    'effect-chrome':
    {
      filter: 'grayscale',
      unit: '',
      slider: { step: STEP_EFFECT_CHROME, min: MIN_RANGE_CHROME, max: MAX_RANGE_CHROME }
    },
    'effect-sepia':
    {
      filter: 'sepia',
      unit: '',
      slider: { step: STEP_EFFECT_SEPIA, min: MIN_RANGE_SEPIA, max: MAX_RANGE_SEPIA }
    },
    'effect-marvin':
    {
      filter: 'invert',
      unit: '%',
      slider: { step: STEP_EFFECT_MARVIN, min: MIN_RANGE_MARVIN, max: MAX_RANGE_MARVIN }
    },
    'effect-phobos':
    {
      filter: 'blur',
      unit: 'px',
      slider: { step: STEP_EFFECT_PHOBOS, min: MIN_RANGE_PHOBOS, max: MAX_RANGE_PHOBOS }
    },
    'effect-heat':
    {
      filter: 'brightness',
      unit: '',
      slider: { step: STEP_EFFECT_HEAT, min: MIN_RANGE_HEAT, max: MAX_RANGE_HEAT }
    },
  };

  noUiSlider.create(sliderElement, {
    range: {
      min: MIN_RANGE,
      max: MAX_RANGE,
    },

    start: START_SLIDER,
    step: STEP_SLIDER,
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
        start:START_SLIDER, 
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
