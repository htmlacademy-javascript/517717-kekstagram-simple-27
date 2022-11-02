import {comment, scaleControl, upload, img} from './user-modal.js';

const clearContent = (list) => {
  const array = new Array(list);
  array.forEach((item) => {
    item.value = '';
  });
};

const resetEffect = () => {
  img.className = '';
  document.querySelectorAll('.effects__radio').forEach((button) => {
    button.removeAttribute('checked');
    if (button.value === 'none') {
      button.setAttribute('checked', true);
    }
  });
};

const resetData = () => {
  clearContent(upload, comment);
  scaleControl.value = '100%';
  resetEffect();
};

export {resetData};
