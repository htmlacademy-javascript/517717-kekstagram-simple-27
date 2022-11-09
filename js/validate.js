import { form, resetData } from './form.js';
import { isEscapeKey } from './util.js';

const validate = () => {
  const error = document.querySelector('#error').content.querySelector('.error');
  const success = document.querySelector('#success').content.querySelector('.success');

  const hideError = () => {
    error.remove();

    error.querySelector('.error__button').removeEventListener('click', hideError);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  const showError = () => {
    document.body.append(error);

    error.querySelector('.error__button').addEventListener('click', hideError);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', onPopupOutClick);
  };

  const hideSuccess = () => {
    success.remove();
    resetData();

    success.querySelector('.success__button').removeEventListener('click', hideSuccess);
    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('click', onPopupOutClick);
  };

  const showSuccess = () => {
    document.body.append(success);

    success.querySelector('.success__button').addEventListener('click', hideSuccess);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', onPopupOutClick);
  };

  function onPopupEscPress(evt) {
    if (isEscapeKey(evt.key)) {
      evt.preventDefault();
      hideError();
      hideSuccess();
    }
  }

  function onPopupOutClick(evt) {
    if (evt.target === error) {
      hideError();
    }
    if (evt.target === success) {
      hideSuccess();
    }
  }

  const pristine = new Pristine(form, {
    classTo: 'img-upload__text',
    errorTextParent: 'img-upload__text',
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      showSuccess();
      form.submit();
    } else {
      showError();
    }
  });
};

export { validate };
