const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;

const buttonMinus = document.querySelector('.scale__control--smaller');
const buttonPlus = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');
const scaleValueInput = document.querySelector('.scale__control--value');

let currentScale = MAX_SCALE_VALUE;
scaleValueInput.value = `${currentScale}%`;

const setScale = (newScale) => {
  scaleValueInput.value = `${newScale}%`;
  imagePreview.style = `transform: scale(${newScale / 100})`;
  currentScale = newScale;
};

const onButtonMinusClick = () => {
  if (currentScale > MIN_SCALE_VALUE) {
    currentScale-=SCALE_STEP;
    setScale(currentScale);
  }
};

const onButtonPlusClick = () => {
  if (currentScale < MAX_SCALE_VALUE) {
    currentScale+=SCALE_STEP;
    setScale(currentScale);
  }
};

buttonMinus.addEventListener('click', onButtonMinusClick);
buttonPlus.addEventListener('click', onButtonPlusClick);

export {buttonMinus, buttonPlus, onButtonMinusClick, onButtonPlusClick, setScale, MAX_SCALE_VALUE};
