import {getRandomNumber} from './utils.js';

const DESCRIPTIONS = [
  'Мир должен знать, что я ем',
  'У меня такое же, только Азовское',
  'Я просто прямой потомок грандиозности',
  'У меня есть много скрытых талантов. Проблема в том, что даже я не могу их найти',
  'Еще один прекрасный день, испорченный обязанностями',
  'Говорят, не пробуйте это дома… так что я пошел домой к другу!',
  'Оставайся сильным, скоро выходные!',
  'Кто не работает, тот ест',
  'Просто оставлю это здесь',
  'Я смог, значит, и вы сможете',
  'Хорошо там, где меня нет… Но ничего, я и туда доберусь!',
  'Я личность творческая – хочу творю, хочу вытворяю',
  'Когда красивым налево, а умным направо, мне хоть разорвись',
  'Ушел в себя и заблудился',
  'Не можешь погулять наружу – погуляй вовнутрь',
  'Вам со мной будет стыдно, но не скучно',
  'Остановите лето – я не успеваю отдыхать',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Сильвестр в столовой',
  'Капитан Джек Поскорей',
  'Анна Лохматая',
  'Подружка безопасности',
  'Hолемоций',
  'K@рToШk@_',
  '●_•',
  'ЧеРтЁнОк_Ф_кЕдАх',
  'Бобер Иннокентий',
];

const PHOTO_COUNT = 25;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 200;
const MIN_LIKES_QUANTITY = 15;
const MAX_LIKES_QUANTITY = 200;

// Функция для получения случайного элемента массива

const getRandomArrayElement = (elements, splice) => {
  const result = elements[getRandomNumber(0, elements.length - 1)];

  if (splice) {
    elements.splice(elements.indexOf(result), 1);
  }

  return result;
};

// Функция для получения массива последовательных чисел

const generateSequenceOfNumbers = (min, max) => {
  const numbersArray = [];
  for (let index = 0; index <= max - min; index++) {
    numbersArray[index] = min + index;
  }
  if (min < 0 || max < 0 || min >= max) {
    return false;
  }
  return numbersArray;
};

// Создание комментария

const createComment = () => ({
  id: getRandomArrayElement(generateSequenceOfNumbers(MIN_COMMENT_ID, MAX_COMMENT_ID), true),
  avatar: `img/avatar-${  getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)  }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// Создание описания фотографии

const createPhotoDescription = (id) => ({
  id: id,
  url: `photos/${  id  }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(MIN_LIKES_QUANTITY, MAX_LIKES_QUANTITY),
  comments: new Array(2).fill(null).map(() => createComment()),
});

// Создание массива-счетчика для списка фотографий

const photosIds = generateSequenceOfNumbers(1, PHOTO_COUNT);

// Создания массива, содержащего описания фотографий

const generatePhotos = (count) => new Array(count).fill(null).map(() => createPhotoDescription(getRandomArrayElement(photosIds, true)));

export {generatePhotos, PHOTO_COUNT};
