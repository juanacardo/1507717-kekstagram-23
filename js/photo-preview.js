import {uploadInput} from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const previewContainer = document.querySelector('.img-upload__preview img');

const showPreview = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      previewContainer.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

export {showPreview};
