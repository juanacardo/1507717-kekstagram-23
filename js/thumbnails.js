import {userPhotosPromise} from './fetch.js';

const thumbnailsContainer = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content;
const pictureTemplate = templateFragment.querySelector('.picture');

userPhotosPromise.then((photos) => {
  const thumbnailsContainerFragment = document.createDocumentFragment();
  photos.forEach(({url, likes, comments}) => {
    const userPhoto = pictureTemplate.cloneNode(true);
    userPhoto.querySelector('.picture__img').src = url;
    userPhoto.querySelector('.picture__likes').textContent = likes;
    userPhoto.querySelector('.picture__comments').textContent = comments.length;
    thumbnailsContainerFragment.appendChild(userPhoto);
  });

  thumbnailsContainer.appendChild(thumbnailsContainerFragment);
});
