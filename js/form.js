import {isEscEvent} from './utils.js';

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

const hideImgUploadForm = () => {
  document.querySelector('body').classList.remove('modal-open');
  formOverlay.classList.add('hidden');
};

const onUploadFormEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideImgUploadForm();
  }
};

const showUploadForm = () => {
  formOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onUploadFormEscKeydown);
};

formCloseButton.addEventListener('click', () => {
  hideImgUploadForm();
  document.removeEventListener('keydown', onUploadFormEscKeydown);
  uploadInput.value = '';
  commentInput.value = '';
  hashtagInput.value = '';
});

uploadInput.addEventListener('change', () => {
  showUploadForm();
});

const setError = (input) => {
  input.style.borderColor = 'red';
  input.style.borderWidth = '3px';
};

commentInput.addEventListener('input', () => {
  const valueLength = commentInput.value.length;
  if (valueLength > MAX_COMMENT_LENGTH) {
    commentInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_COMMENT_LENGTH } симв.`);
    setError(commentInput);
  } else {
    commentInput.setCustomValidity('');
  }
  commentInput.reportValidity();
});

hashtagInput.addEventListener('input', () => {
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
    } else {
      hashtagInput.setCustomValidity('');
    }
  });
  hashtagInput.reportValidity();
});


