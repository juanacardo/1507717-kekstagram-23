import '../nouislider/nouislider.js';

const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectValueInput = document.querySelector('.effect-level__value');
const sliderWrapper = document.querySelector('.img-upload__effect-level');

const effectsList = document.querySelector('.img-upload__effects');
const originalRadio = document.querySelector('#effect-none');
const chromeEffectRadio = document.querySelector('#effect-chrome');
const sepiaEffectRadio = document.querySelector('#effect-sepia');
const marvinEffectRadio = document.querySelector('#effect-marvin');
const phobosEffectRadio = document.querySelector('#effect-phobos');
const heatEffectRadio = document.querySelector('#effect-heat');

const SETTINGS = {
  chrome: {
    filter: 'grayscale',
    className: 'effects__preview--chrome',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  sepia: {
    filter: 'sepia',
    className: 'effects__preview--sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  marvin: {
    filter: 'invert',
    className: 'effects__preview--marvin',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
  },
  phobos: {
    filter: 'blur',
    className: 'effects__preview--phobos',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
  },
  heat: {
    filter: 'brightness',
    className: 'effects__preview--heat',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
  },
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

sliderWrapper.classList.add('hidden');

const addEffect = (className, filter, unit) => {
  sliderWrapper.classList.remove('hidden');
  imagePreview.classList.add(`${className}`);
  effectLevelSlider.noUiSlider.on('update', (values, handle) => {
    effectValueInput.value = values[handle];
    imagePreview.style.filter = `${filter}(${effectValueInput.value}${unit})`;
  });
};

const sliderOptionsHandler = (min, max, start, step) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
  });
};

const resetEffect = () => {
  for (const effect in SETTINGS) {
    const currentClassName = SETTINGS[effect].className;
    if (imagePreview.classList.contains(currentClassName)) {
      imagePreview.classList.remove(currentClassName);
    }
  }
  sliderWrapper.classList.add('hidden');
  imagePreview.style.filter = 'none';
};

const onSwitchEffects = () => {
  if (originalRadio.checked) {
    resetEffect();
  } else if (chromeEffectRadio.checked) {
    resetEffect();
    addEffect(SETTINGS.chrome.className, SETTINGS.chrome.filter, SETTINGS.chrome.unit);
    sliderOptionsHandler(SETTINGS.chrome.min, SETTINGS.chrome.max, SETTINGS.chrome.start, SETTINGS.chrome.step);
  } else if (sepiaEffectRadio.checked) {
    resetEffect();
    addEffect(SETTINGS.sepia.className, SETTINGS.sepia.filter, SETTINGS.sepia.unit);
    sliderOptionsHandler(SETTINGS.sepia.min, SETTINGS.sepia.max, SETTINGS.sepia.start, SETTINGS.sepia.step);
  } else if (marvinEffectRadio.checked) {
    resetEffect();
    addEffect(SETTINGS.marvin.className, SETTINGS.marvin.filter, SETTINGS.marvin.unit);
    sliderOptionsHandler(SETTINGS.marvin.min, SETTINGS.marvin.max, SETTINGS.marvin.start, SETTINGS.marvin.step);
  } else if (phobosEffectRadio.checked) {
    resetEffect();
    addEffect(SETTINGS.phobos.className, SETTINGS.phobos.filter, SETTINGS.phobos.unit);
    sliderOptionsHandler(SETTINGS.phobos.min, SETTINGS.phobos.max, SETTINGS.phobos.start, SETTINGS.phobos.step);
  } else if (heatEffectRadio.checked) {
    resetEffect();
    addEffect(SETTINGS.heat.className, SETTINGS.heat.filter, SETTINGS.heat.unit);
    sliderOptionsHandler(SETTINGS.heat.min, SETTINGS.heat.max, SETTINGS.heat.start, SETTINGS.heat.step);
  }
};

const addEventListenersEffects = () => {
  effectsList.addEventListener('change', onSwitchEffects);
};

const removeEventListenersEffects = () => {
  effectsList.removeEventListener('change', onSwitchEffects);
};

export {addEventListenersEffects, removeEventListenersEffects};
