import {userPhotos} from './thumbnails.js';
import {isEscEvent} from './utils.js';

const thumbnails = document.querySelectorAll('.picture__img');
const fullPhoto = document.querySelector('.big-picture');
const fullPhotoCloseButton = fullPhoto.querySelector('#picture-cancel');
const fullPhotoCommentsList = fullPhoto.querySelector('.social__comments');
const fullPhotoCommentElement = fullPhotoCommentsList.querySelector('.social__comment').cloneNode(true);

const hideFullPhoto = () => {
  document.querySelector('body').classList.remove('modal-open');
  fullPhoto.classList.add('hidden');
};

const onFullPhotoEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideFullPhoto();
  }
};

const showFullPhoto = () => {
  fullPhoto.classList.remove('hidden');
  document.addEventListener('keydown', onFullPhotoEscKeydown);
};

fullPhotoCloseButton.addEventListener('click', () => {
  hideFullPhoto();
  document.removeEventListener('keydown', onFullPhotoEscKeydown);
});

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    showFullPhoto();
    fullPhoto.querySelector('img').src = userPhotos[index].url;
    fullPhoto.querySelector('.likes-count').textContent = userPhotos[index].likes;
    fullPhoto.querySelector('.comments-count').textContent = userPhotos[index].comments.length;
    fullPhoto.querySelector('.social__caption').textContent = userPhotos[index].description;
    fullPhoto.querySelector('.social__comment-count').classList.add('hidden');
    fullPhoto.querySelector('.comments-loader').classList.add('hidden');
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
    fullPhotoCommentsList.appendChild(fragment);
  });
});
