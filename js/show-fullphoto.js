import {userPhotos} from './thumbnails.js';
import {isEscEvent} from './utils.js';

const MAX_VISIBLE_COMMENTS = 5;

const thumbnails = document.querySelectorAll('.picture__img');
const fullPhoto = document.querySelector('.big-picture');
const fullPhotoCloseButton = fullPhoto.querySelector('#picture-cancel');
const fullPhotoCommentsList = fullPhoto.querySelector('.social__comments');
const fullPhotoCommentElement = fullPhotoCommentsList.querySelector('.social__comment').cloneNode(true);

const commentsCount = fullPhoto.querySelector('.social__comment-count');
const commentsLoader = fullPhoto.querySelector('.comments-loader');
const updateCounter = (count) => commentsCount.firstChild.textContent = `${count} из `;

let commentCounter = 0;
let currentComments = [];

const renderPartOfComments = (counter, comments) => {
  const fragment = document.createDocumentFragment();
  for (let i = counter; i < counter + MAX_VISIBLE_COMMENTS; i++) {
    const comment = comments[i];
    const fullPhotoComment = fullPhotoCommentElement.cloneNode(true);
    fullPhotoComment.querySelector('img').src = comment.avatar;
    fullPhotoComment.querySelector('img').alt = comment.name;
    fullPhotoComment.querySelector('.social__text').textContent = comment.message;
    fragment.appendChild(fullPhotoComment);
    updateCounter(i + 1);
    if (i === comments.length - 1) {
      commentsLoader.classList.add('hidden');
      break;
    }
  }
  fullPhotoCommentsList.appendChild(fragment);
};

const onLoadMoreClick = () => {
  commentCounter+=MAX_VISIBLE_COMMENTS;
  renderPartOfComments(commentCounter, currentComments);
};

// Функция скрытия окна большого изображения
const hideFullPhoto = () => {
  document.querySelector('body').classList.remove('modal-open');
  commentsLoader.removeEventListener('click', onLoadMoreClick);
  fullPhoto.classList.add('hidden');
};

// Функция скрытия окна большого изображения по клавише Esc
const onFullPhotoEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideFullPhoto();
  }
};

// Функция показа окна большого изображения
const showFullPhoto = () => {
  fullPhoto.classList.remove('hidden');
  document.addEventListener('keydown', onFullPhotoEscKeydown);
};

// Обработчик события на кнопку закрытия окна
fullPhotoCloseButton.addEventListener('click', () => {
  hideFullPhoto();
  document.removeEventListener('keydown', onFullPhotoEscKeydown);
  commentsLoader.classList.remove('hidden');
});

// Загрузка данных для большого изображения на основе данных маленьких фотографий
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    showFullPhoto();
    fullPhoto.querySelector('img').src = userPhotos[index].url;
    fullPhoto.querySelector('.likes-count').textContent = userPhotos[index].likes;
    fullPhoto.querySelector('.comments-count').textContent = userPhotos[index].comments.length;
    fullPhoto.querySelector('.social__caption').textContent = userPhotos[index].description;
    document.querySelector('body').classList.add('modal-open');
    fullPhotoCommentsList.innerHTML = '';
    commentCounter = 0;
    currentComments = userPhotos[index].comments;
    renderPartOfComments(commentCounter, currentComments);
    commentsLoader.addEventListener('click', onLoadMoreClick);
  });
});
