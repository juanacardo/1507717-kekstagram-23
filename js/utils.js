// Функция, возвращающая целое число из диапазона, создана на основе функции getRandomIntInclusive (https://developer.mozilla.org/)
const ESC_KEY = 'Esc';
const ESCAPE_KEY = 'Escape';
const ALERT_SHOW_TIME = 5000;

const getRandomNumber = (min, max) => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  if (minValue < 0 || maxValue < 0 || minValue > maxValue) {
    return false;
  }
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

// Функция для получения случайного элемента массива

const getRandomArrayElement = (elements, splice) => {
  const result = elements[getRandomNumber(0, elements.length - 1)];

  if (splice) {
    elements.splice(elements.indexOf(result), 1);
  }

  return result;
};

const getShuffledArray = (array, arrayLenght) => {
  const newArray = [];
  while (newArray.length < arrayLenght) {
    newArray.push(getRandomArrayElement(array, true));
  }
  return newArray;
};

// Функция для проверки нажатия клавиши Esc

const isEscEvent = (evt) => evt.key === ESCAPE_KEY || evt.key === ESC_KEY;

// Функция для проверки повторяющихся элементов в массиве
const checkElementsHasDuplicates = (array) => (new Set(array)).size !== array.length;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomNumber, isEscEvent, checkElementsHasDuplicates, showAlert, getShuffledArray};
