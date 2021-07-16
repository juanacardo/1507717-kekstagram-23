import {hideImgUploadForm} from './form.js';
import {isEscEvent} from './utils.js';

const successUploadMessage = document.querySelector('#success').content.querySelector('section');
const successFragment = document.createDocumentFragment();
const successUploadMessageTemplate = successUploadMessage.cloneNode(true);
const successCloseButton = successUploadMessageTemplate.querySelector('.success__button');

const errorUploadMessage = document.querySelector('#error').content.querySelector('section');
const errorFragment = document.createDocumentFragment();
const errorUploadMessageTemplate = errorUploadMessage.cloneNode(true);
const errorCloseButton = errorUploadMessageTemplate.querySelector('.error__button');

const onUploadMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    successUploadMessageTemplate.style.display = 'none';//это работает только один раз
  }
};

const onSuccessCloseButtonClick = () => {
  successCloseButton.addEventListener('click', () => {
    successUploadMessageTemplate.style.display = 'none';//это работает только один раз
  });
};

const onErrorCloseButtonClick = () => {
  errorCloseButton.addEventListener('click', () => {
    errorUploadMessageTemplate.style.display = 'none';//это работает только один раз
  });
};

const onFormSuccessSend = () => {
  hideImgUploadForm();
  successFragment.appendChild(successUploadMessageTemplate);
  document.body.appendChild(successFragment);
  onSuccessCloseButtonClick();
  onUploadMessageEscKeydown();
  //здесь должна быть функция по закрытию при клике на произвольную область экрана
};

const onFormErrorSend = () => {
  hideImgUploadForm();
  errorFragment.appendChild(errorUploadMessageTemplate);
  document.body.appendChild(errorFragment);
  onErrorCloseButtonClick();
  onUploadMessageEscKeydown();
  //здесь должна быть функция по закрытию при клике на произвольную область экрана
};

export {onFormSuccessSend, onFormErrorSend};
