// import {debounce} from '../utils/debounce.js';
import {renderDefaultPhotos, renderPopularPhotos, renderRandomPhotos, filter} from './thumbnails.js';

// const RERENDER_DELAY = 500;
const defaulFilterButtom = filter.querySelector('#filter-default');
const randomFilterButtom = filter.querySelector('#filter-random');
const discussedFilterButtom = filter.querySelector('#filter-discussed');

defaulFilterButtom.addEventListener('click', renderDefaultPhotos);
randomFilterButtom.addEventListener('click', renderRandomPhotos);
discussedFilterButtom.addEventListener('click', renderPopularPhotos);
