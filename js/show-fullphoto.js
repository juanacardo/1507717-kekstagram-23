import {userPhotos} from './thumbnails.js';

const thumbnails = document.querySelectorAll('.picture__img');
const fullPhoto = document.querySelector('.big-picture');
const fullPhotoCloseButton = fullPhoto.querySelector('#picture-cancel');

for (let i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener('click', () => {
    fullPhoto.classList.remove('hidden');
    fullPhoto.querySelector('img').src = userPhotos[i].url;
    fullPhoto.querySelector('.likes-count').textContent = userPhotos[i].likes;
    fullPhoto.querySelector('.comments-count').textContent = userPhotos[i].comments.length;
    fullPhoto.querySelector('.social__caption').textContent = userPhotos[i].description;
    fullPhoto.querySelector('.social__comment-count').classList.add('hidden');
    fullPhoto.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
  });
}

fullPhotoCloseButton.addEventListener('click', () => {
  document.querySelector('body').classList.remove('modal-open');
  fullPhoto.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    document.querySelector('body').classList.remove('modal-open');
    fullPhoto.classList.add('hidden');
  }
});
