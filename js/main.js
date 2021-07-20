import './thumbnails.js';
import './show-fullphoto.js';
import './form.js';
import './slider.js';
import './fetch.js';
import {renderDefaultPhotos} from './thumbnails.js';

const filter = document.querySelector('.img-filters');

const onDocumentLoad = () => {
  renderDefaultPhotos();
  filter.classList.remove('img-filters--inactive');
};

window.addEventListener('load', onDocumentLoad);
