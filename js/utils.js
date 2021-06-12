// Функция, возвращающая целое число из диапазона, создана на основе функции getRandomIntInclusive (https://developer.mozilla.org/)

const getRandomNumber = (min, max) => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  if (minValue < 0 || maxValue < 0 || minValue > maxValue) {
    return false;
  }
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

// Функция для проверки максимальной длины строки

const checkStringLenght = (string, maxLenght) => string.length > maxLenght;

checkStringLenght(140, 'Привет!');

export {getRandomNumber};
