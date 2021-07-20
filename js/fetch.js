import {showAlert} from './utils.js';
import {imgUploadForm, onUploadFormEscKeydown} from './form.js';
import {setFormSuccessPopup, setFormErrorPopup} from './form-messages.js';

const SERVER_DATA = 'https://23.javascript.pages.academy/kekstagram/data';
const SERVER_POST_ADRESS = 'https://23.javascript.pages.academy/kekstagram';

const getUserPhotos = () => fetch(SERVER_DATA)
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
      SERVER_POST_ADRESS,
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

setUserFormSubmit(setFormSuccessPopup, setFormErrorPopup);

export {userPhotosPromise};
