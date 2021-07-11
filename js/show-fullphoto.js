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

// Функция скрытия окна большого изображения
const hideFullPhoto = () => {
  document.querySelector('body').classList.remove('modal-open');
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

const updateCounter = (count) => commentsCount.firstChild.textContent = `${count} из `;

const renderPartOfComments = (counter, comments) => {
  for (let i = 0; i < counter + MAX_VISIBLE_COMMENTS; i++) {
    fullPhotoCommentsList.appendChild(comments[i]);
    updateCounter(i + 1);
    if (i === comments.length - 1) {
      commentsLoader.classList.add('hidden');
      break;
    }
  }
};

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
    const fragment = document.createDocumentFragment();
    userPhotos[index].comments.forEach((comment) => {
      const fullPhotoComment = fullPhotoCommentElement.cloneNode(true);
      fullPhotoComment.querySelector('img').src = comment.avatar;
      fullPhotoComment.querySelector('img').alt = comment.name;
      fullPhotoComment.querySelector('.social__text').textContent = comment.message;
      fragment.appendChild(fullPhotoComment);
    });
    const currentComments = Array.from(fragment.children);
    let commentCounter = 0;
    renderPartOfComments(commentCounter, currentComments);
    commentsLoader.addEventListener('click', () => {
      commentCounter+=MAX_VISIBLE_COMMENTS;
      renderPartOfComments(commentCounter, currentComments);
    });
  });
});

