import {debounce} from './utils.js';
import {renderDefaultPhotos, renderPopularPhotos, renderRandomPhotos} from './thumbnails.js';

const RERENDER_DELAY = 500;

const defaulFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const popularFilterButton = document.querySelector('#filter-discussed');

const clearPictures = () => {
  const pictures = document.querySelectorAll('.picture');
  const container = document.querySelector('.pictures');
  pictures.forEach((picture) => {
    container.removeChild(picture);
  });
};

const renderPhotos = debounce((filterType) => {
  clearPictures();

  switch (filterType) {
    case defaulFilterButton.id:
      renderDefaultPhotos();
      break;
    case popularFilterButton.id:
      renderPopularPhotos();
      break;
    case randomFilterButton.id:
      renderRandomPhotos();
      break;
  }
}, RERENDER_DELAY);

const onDefaultButtonClick = () => {
  renderPhotos(defaulFilterButton.id);
  defaulFilterButton.classList.add('img-filters__button--active');
  popularFilterButton.classList.remove('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
};

const onPopularButtonClick = () => {
  renderPhotos(popularFilterButton.id);
  popularFilterButton.classList.add('img-filters__button--active');
  defaulFilterButton.classList.remove('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
};

const onRandomButtonClick = () => {
  renderPhotos(randomFilterButton.id);
  randomFilterButton.classList.add('img-filters__button--active');
  popularFilterButton.classList.remove('img-filters__button--active');
  defaulFilterButton.classList.remove('img-filters__button--active');
};

defaulFilterButton.addEventListener('click', onDefaultButtonClick);
randomFilterButton.addEventListener('click', onRandomButtonClick);
popularFilterButton.addEventListener('click', onPopularButtonClick);
