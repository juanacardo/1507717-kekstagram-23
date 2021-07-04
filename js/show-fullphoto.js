import {userPhotos} from './thumbnails.js';

const thumbnails = document.querySelectorAll('.picture__img');
const fullPhoto = document.querySelector('.big-picture');
const fullPhotoCloseButton = fullPhoto.querySelector('#picture-cancel');
const fullPhotoCommentsList = fullPhoto.querySelector('.social__comments');

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    fullPhoto.classList.remove('hidden');
    fullPhoto.querySelector('img').src = userPhotos[index].url;
    fullPhoto.querySelector('.likes-count').textContent = userPhotos[index].likes;
    fullPhoto.querySelector('.comments-count').textContent = userPhotos[index].comments.length;
    fullPhoto.querySelector('.social__caption').textContent = userPhotos[index].description;
    fullPhoto.querySelector('.social__comment-count').classList.add('hidden');
    fullPhoto.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
    userPhotos[index].comments.forEach((comment) => {
      const fullPhotoComment = fullPhotoCommentsList.querySelector('.social__comment').cloneNode(true);
      fullPhotoComment.querySelector('img').src = comment.avatar;
      fullPhotoComment.querySelector('img').alt = comment.name;
      fullPhotoComment.querySelector('.social__text').textContent = comment.message;
      fullPhotoCommentsList.appendChild(fullPhotoComment);
    });
  });
});

const hideFullPhoto = () => {
  document.querySelector('body').classList.remove('modal-open');
  fullPhoto.classList.add('hidden');
};

fullPhotoCloseButton.addEventListener('click', () => {
  hideFullPhoto();
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    hideFullPhoto();
  }
});
