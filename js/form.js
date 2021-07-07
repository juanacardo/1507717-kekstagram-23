import {isEscEvent, checkArrayhasDuplicates} from './utils.js';

const MAX_COMMENT_LENGTH = 140;
const MIN_HASHTAG_LENGHT = 2;
const MAX_HASHTAG_LENGHT = 20;
const MAX_HASHTAG_QUANTITY = 5;

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadInput = imgUploadForm.querySelector('#upload-file');
const formOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const formCloseButton = imgUploadForm.querySelector('#upload-cancel');

const commentInput = imgUploadForm.querySelector('.text__description');
const hashtagInput = imgUploadForm.querySelector('.text__hashtags');

// Функция скрытия формы
const hideImgUploadForm = () => {
  document.querySelector('body').classList.remove('modal-open');
  formOverlay.classList.add('hidden');
};

// Функция визульного отображения ошибки валидации
const setError = (input) => {
  input.style.borderColor = 'red';
  input.style.borderWidth = '5px';
};

const removeError = (input) => {
  input.style.borderColor = '';
  input.style.borderWidth = '';
};

// Обработчик события для проверки валидации комментария
const onCommentInput = () => {
  const valueLength = commentInput.value.length;
  if (valueLength > MAX_COMMENT_LENGTH) {
    commentInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_COMMENT_LENGTH } симв.`);
    setError(commentInput);
  } else {
    commentInput.setCustomValidity('');
    removeError(commentInput);
  }
  commentInput.reportValidity();
};

// Обработчик события для проверки валидации хэштегов
const onHashtagInput = () => {
  const arrayOfHashtags = hashtagInput.value.split(' ');
  const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
  arrayOfHashtags.forEach((hashtag) => {
    if (hashtag.length < MIN_HASHTAG_LENGHT) {
      hashtagInput.setCustomValidity(`Хэштег должен быть длиннее ${  MIN_HASHTAG_LENGHT } символов`);
      setError(hashtagInput);
    } else if (hashtag.length > MAX_HASHTAG_LENGHT) {
      hashtagInput.setCustomValidity(`Хэштег не должен быть длиннее ${  MAX_HASHTAG_LENGHT } символов`);
      setError(hashtagInput);
    } else if (arrayOfHashtags.length > MAX_HASHTAG_QUANTITY) {
      hashtagInput.setCustomValidity(`Хэштегов не может быть больше ${  MAX_HASHTAG_QUANTITY } `);
      setError(hashtagInput);
    } else if (re.test(hashtag) === false) {
      hashtagInput.setCustomValidity('Хэштег должен начинаться с решетки и может состоять из букв и чисел');
      setError(hashtagInput);
    } else if (checkArrayhasDuplicates(arrayOfHashtags)) {
      hashtagInput.setCustomValidity('Хэштеги должны быть разными');
    } else {
      hashtagInput.setCustomValidity('');
      removeError(hashtagInput);
    }
  });
  hashtagInput.reportValidity();
};

const onInputEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
};

// Функция скрытия формы по клавише Esc
const onUploadFormEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideImgUploadForm();
    imgUploadForm.reset();
    commentInput.removeEventListener('input', onCommentInput);
    hashtagInput.removeEventListener('input', onHashtagInput);
    commentInput.removeEventListener('keydown', onInputEscKeydown);
    hashtagInput.removeEventListener('keydown', onInputEscKeydown);
  }
};

// Функция показа формы
const showUploadForm = () => {
  formOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onUploadFormEscKeydown);
};

// Обработчик события на загрузку изображения
uploadInput.addEventListener('change', () => {
  showUploadForm();
  commentInput.addEventListener('input', onCommentInput);
  hashtagInput.addEventListener('input', onHashtagInput);
});

// Обработчик события на закрытие формы
formCloseButton.addEventListener('click', () => {
  hideImgUploadForm();
  document.removeEventListener('keydown', onUploadFormEscKeydown);
  commentInput.removeEventListener('input', onCommentInput);
  hashtagInput.removeEventListener('input', onHashtagInput);
  commentInput.removeEventListener('keydown', onInputEscKeydown);
  hashtagInput.removeEventListener('keydown', onInputEscKeydown);
});

commentInput.addEventListener('keydown', onInputEscKeydown);
hashtagInput.addEventListener('keydown', onInputEscKeydown);
