import {userPhotosPromise} from './fetch.js';
import {getShuffledArray} from './utils.js';
import {renderFullPhoto} from './show-fullphoto.js';

const RANDOM_PHOTOS_QUANTITY = 10;
const thumbnailsContainer = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content;
const pictureTemplate = templateFragment.querySelector('.picture');

const getPhotoComments = (photo) => {
  const commentsQuantity = photo.comments.length;
  return commentsQuantity;
};

const comparePhotos = (commentsA, commentsB) => {
  const popularityA = getPhotoComments(commentsA);
  const popularityB = getPhotoComments(commentsB);
  return popularityB - popularityA;
};

const thumbnailsContainerFragment = document.createDocumentFragment();

const renderThumbnails = (elements) => {
  elements.forEach(({url, likes, comments}) => {
    const userPhoto = pictureTemplate.cloneNode(true);
    userPhoto.querySelector('.picture__img').src = url;
    userPhoto.querySelector('.picture__likes').textContent = likes;
    userPhoto.querySelector('.picture__comments').textContent = comments.length;
    thumbnailsContainerFragment.appendChild(userPhoto);
  });
};

const renderDefaultPhotos = () => {
  userPhotosPromise.then((photos) => {
    renderThumbnails(photos);
    thumbnailsContainer.appendChild(thumbnailsContainerFragment);
    renderFullPhoto(photos);
  });
};

const renderPopularPhotos = () => {
  userPhotosPromise.then((photos) => {
    const sortedPhotos = photos.slice().sort(comparePhotos);
    renderThumbnails(sortedPhotos);
    thumbnailsContainer.appendChild(thumbnailsContainerFragment);
    renderFullPhoto(sortedPhotos);
  });
};

const renderRandomPhotos = () => {
  userPhotosPromise.then((photos) => {
    const copiedPhotos = photos.slice();
    const shuffledPhotos = getShuffledArray(copiedPhotos, RANDOM_PHOTOS_QUANTITY);
    renderThumbnails(shuffledPhotos);
    thumbnailsContainer.appendChild(thumbnailsContainerFragment);
    renderFullPhoto(shuffledPhotos);
  });
};

export {renderDefaultPhotos, renderPopularPhotos, renderRandomPhotos};
