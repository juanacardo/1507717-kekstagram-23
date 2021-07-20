import {debounce} from './utils.js';
import {renderDefaultPhotos, renderPopularPhotos, renderRandomPhotos} from './thumbnails.js';

const RERENDER_DELAY = 500;

const filter = document.querySelector('.img-filters');
const defaulFilterButton = filter.querySelector('#filter-default');
const randomFilterButton = filter.querySelector('#filter-random');
const popularFilterButton = filter.querySelector('#filter-discussed');

const clearPictures = () => {
  const pictures = document.querySelectorAll('.picture');
  const container = document.querySelector('.pictures');
  pictures.forEach((picture) => {
    container.removeChild(picture);
  });
};

const onDefaultButtonClick = () => {
  clearPictures();
  debounce(renderDefaultPhotos(), RERENDER_DELAY);
  defaulFilterButton.classList.add('img-filters__button--active');
  popularFilterButton.classList.remove('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
};

const onPopularButtonClick = () => {
  clearPictures();
  debounce(renderPopularPhotos(), RERENDER_DELAY);
  popularFilterButton.classList.add('img-filters__button--active');
  defaulFilterButton.classList.remove('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
};

const onRandomButtonClick = () => {
  clearPictures();
  debounce(renderRandomPhotos(), RERENDER_DELAY);
  randomFilterButton.classList.add('img-filters__button--active');
  popularFilterButton.classList.remove('img-filters__button--active');
  defaulFilterButton.classList.remove('img-filters__button--active');
};

defaulFilterButton.addEventListener('click', onDefaultButtonClick);
randomFilterButton.addEventListener('click', onRandomButtonClick);
popularFilterButton.addEventListener('click', onPopularButtonClick);

export {filter};
