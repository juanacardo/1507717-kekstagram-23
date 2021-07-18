import {showAlert} from './utils.js';
import {imgUploadForm, onUploadFormEscKeydown} from './form.js';
import {onFormSuccessSend, onFormErrorSend} from './form-messages.js';

const getUserPhotos = () => fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      showAlert('Ошибка при загрузке фото. Попробуйте ещё раз');
    }
  })
  .catch(() => {
    showAlert('Ошибка при загрузке фото. Попробуйте ещё раз');
  });

const userPhotosPromise = getUserPhotos();

const setUserFormSubmit = (onSuccess, onError) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    document.removeEventListener('keydown', onUploadFormEscKeydown);
    const formData = new FormData(evt.target);

    fetch(
      'https://23.javascript.pages.academy/kekstagra',
      {
        method: 'POST',
        body: formData,
      })
      .then((response) => {
        if (response.ok) {
          onSuccess();
        } else {
          onError();
        }
      })
      .catch(() => onError());
  });
};

setUserFormSubmit(onFormSuccessSend, onFormErrorSend);

export {userPhotosPromise};
