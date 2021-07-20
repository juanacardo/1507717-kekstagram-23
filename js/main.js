import './thumbnails.js';
import './show-fullphoto.js';
import './form.js';
import './slider.js';
import './fetch.js';
import {filter} from './filter.js';
import {renderDefaultPhotos} from './thumbnails.js';

const onDocumentLoad = () => {
  renderDefaultPhotos();
  filter.classList.remove('img-filters--inactive');
};

window.addEventListener('load', onDocumentLoad);
