import {userPhotosPromise} from './fetch.js';
import {getShuffledArray} from './utils.js';

const RANDOM_PHOTOS_QUANTITY = 10;
const filter = document.querySelector('.img-filters');
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

const renderDefaultPhotos = () => {
  userPhotosPromise.then((photos) => {
    const thumbnailsContainerFragment = document.createDocumentFragment();
    photos
      .forEach(({url, likes, comments}) => {
        const userPhoto = pictureTemplate.cloneNode(true);
        userPhoto.querySelector('.picture__img').src = url;
        userPhoto.querySelector('.picture__likes').textContent = likes;
        userPhoto.querySelector('.picture__comments').textContent = comments.length;
        thumbnailsContainerFragment.appendChild(userPhoto);
      });

    thumbnailsContainer.appendChild(thumbnailsContainerFragment);
    filter.classList.remove('img-filters--inactive');
  });
};

const renderPopularPhotos = () => {
  userPhotosPromise.then((photos) => {
    const thumbnailsContainerFragment = document.createDocumentFragment();
    photos
      .slice()
      .sort(comparePhotos)
      .forEach(({url, likes, comments}) => {
        const userPhoto = pictureTemplate.cloneNode(true);
        userPhoto.querySelector('.picture__img').src = url;
        userPhoto.querySelector('.picture__likes').textContent = likes;
        userPhoto.querySelector('.picture__comments').textContent = comments.length;
        thumbnailsContainerFragment.appendChild(userPhoto);
      });

    thumbnailsContainer.appendChild(thumbnailsContainerFragment);
    filter.classList.remove('img-filters--inactive');
  });
};

const renderRandomPhotos = () => {
  userPhotosPromise.then((photos) => {
    const thumbnailsContainerFragment = document.createDocumentFragment();
    photos
      .slice();
    photos = getShuffledArray(photos, RANDOM_PHOTOS_QUANTITY);
    photos.forEach((photo) => {
      const userPhoto = pictureTemplate.cloneNode(true);
      userPhoto.querySelector('.picture__img').src = photo.url;
      userPhoto.querySelector('.picture__likes').textContent = photo.likes;
      userPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
      thumbnailsContainerFragment.appendChild(userPhoto);
    });

    thumbnailsContainer.appendChild(thumbnailsContainerFragment);
    filter.classList.remove('img-filters--inactive');
  });
};

renderDefaultPhotos();
// renderPopularPhotos();
// renderRandomPhotos();

export {renderDefaultPhotos, renderPopularPhotos, renderRandomPhotos, filter};
