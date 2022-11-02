import { resetData } from './reset-data.js';
import { form, comment } from './user-modal.js';

const validation = () => {
  const error = document.querySelector('#error').content.querySelector('.error');
  const success = document.querySelector('#success').content.querySelector('.success');

  const showError = () => {
    document.body.append(error);
  };

  const removeError = () => {
    document.querySelector('.error').remove();
  };

  const showSuccess = () => {
    document.body.append(success);
  };

  const removeSuccess = () => {
    document.querySelector('.success').remove();
    resetData();
  };

  error.querySelector('.error__button').addEventListener('click', removeError);
  success.querySelector('.success__button').addEventListener('click', removeSuccess);

  let flag = false;
  comment.addEventListener('blur', () => {
    const limit = {
      min: 20,
      max: 140
    };
    const valueLength = comment.value.length;
    if (valueLength < limit.min || valueLength > limit.max) {
      flag = false;
    } else {
      flag = true;
    }
  });

  form.querySelector('.img-upload__submit').addEventListener('click', () => {
    if (flag === false) {
      showError();
    } else {
      showSuccess();
      form.submit();
    }
  });
};
export { validation };
