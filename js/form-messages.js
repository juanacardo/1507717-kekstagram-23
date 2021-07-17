import {hideImgUploadForm} from './form.js';
import {isEscEvent} from './utils.js';

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
    if (successUploadMessageElement) {
      document.body.removeChild(successUploadMessageElement);
    } else if (errorUploadMessageElement) {
      document.body.removeChild(errorUploadMessageElement);
    }
  }
};

const onCloseButtonClick = (evt) => {
  if (successUploadMessageElement) {
    document.body.removeChild(successUploadMessageElement);
    evt.stopPropagation();
  } else if (errorUploadMessageElement) {
    document.body.removeChild(errorUploadMessageElement);
    evt.stopPropagation();
  }
};

const onFormSuccessSend = () => {
  hideImgUploadForm();
  successFragment.appendChild(successUploadMessageElement);
  document.body.appendChild(successFragment);
  successCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onUploadMessageEscKeydown);
  successUploadMessageElement.addEventListener('click', onCloseButtonClick);
};

const onFormErrorSend = () => {
  hideImgUploadForm();
  errorFragment.appendChild(errorUploadMessageElement);
  document.body.appendChild(errorFragment);
  errorCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onUploadMessageEscKeydown);
  errorUploadMessageElement.addEventListener('click', onCloseButtonClick);
};

export {onFormSuccessSend, onFormErrorSend, onUploadMessageEscKeydown};
