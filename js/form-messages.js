import {hideImgUploadForm} from './form.js';
import {isEscEvent} from './utils.js';
import {removeEventListenersScale} from './scale.js';
import {removeEventListenersEffects} from './slider.js';

const successUploadMessage = document.querySelector('#success').content.querySelector('section');
const successFragment = document.createDocumentFragment();
const successUploadMessageElement = successUploadMessage.cloneNode(true);
const successCloseButton = successUploadMessageElement.querySelector('.success__button');

const errorUploadMessage = document.querySelector('#error').content.querySelector('section');
const errorFragment = document.createDocumentFragment();
const errorUploadMessageElement = errorUploadMessage.cloneNode(true);
const errorCloseButton = errorUploadMessageElement.querySelector('.error__button');

const onUploadMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    if (document.body.contains(successUploadMessageElement)) {
      document.body.removeChild(successUploadMessageElement);
    } else if (document.body.contains(errorUploadMessageElement)) {
      document.body.removeChild(errorUploadMessageElement);
    }
    document.removeEventListener('keydown', onUploadMessageEscKeydown);
  }
};

const onCloseButtonClick = (evt) => {
  if (document.body.contains(successUploadMessageElement)) {
    document.body.removeChild(successUploadMessageElement);
    evt.stopPropagation();
  } else if (document.body.contains(errorUploadMessageElement)) {
    document.body.removeChild(errorUploadMessageElement);
    evt.stopPropagation();
  }
  document.removeEventListener('keydown', onUploadMessageEscKeydown);
};

const removeFormWindow = () => {
  hideImgUploadForm();
  removeEventListenersScale();
  removeEventListenersEffects();
};

const setFormSuccessPopup = () => {
  removeFormWindow();
  successFragment.appendChild(successUploadMessageElement);
  document.body.appendChild(successFragment);
  successCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onUploadMessageEscKeydown);
  successUploadMessageElement.addEventListener('click', onCloseButtonClick);
};

const setFormErrorPopup = () => {
  removeFormWindow();
  errorFragment.appendChild(errorUploadMessageElement);
  document.body.appendChild(errorFragment);
  errorCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onUploadMessageEscKeydown);
  errorUploadMessageElement.addEventListener('click', onCloseButtonClick);
};

export {setFormSuccessPopup, setFormErrorPopup, onUploadMessageEscKeydown};
