import { isEscapeKey } from './util.js';
import { form, closeModal, onModalEscPress } from './form.js';
import { sendData } from './api.js';

const validate = () => {
  const error = document
    .querySelector('#error')
    .content.querySelector('.error');
  const success = document.querySelector('#success').content.querySelector('.success');
  const submitButton = form.querySelector('#upload-submit');
  const successButton = success.querySelector('.success__button');
  const errorButton = error.querySelector('.error__button');

  const hideError = () => {
    error.remove();

    errorButton.removeEventListener('click', hideError);
    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('click', onPopupOutClick);
    document.addEventListener('keydown', onModalEscPress);
  };

  const showError = () => {
    document.body.append(error);
    error.classList.add('active');

    errorButton.addEventListener('click', hideError);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', onPopupOutClick);
    document.removeEventListener('keydown', onModalEscPress);
  };

  const hideSuccess = () => {
    success.remove();
    closeModal();

    successButton.removeEventListener('click', hideSuccess);
    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('click', onPopupOutClick);
  };

  const showSuccess = () => {
    document.body.append(success);
    success.classList.add('active');

    successButton.addEventListener('click', hideSuccess);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', onPopupOutClick);
  };

  function onPopupEscPress(evt) {
    if (isEscapeKey(evt.key)) {
      evt.preventDefault();
      if (error.classList.contains('active')) {
        hideError();
      }

      if (success.classList.contains('active')) {
        hideSuccess();
      }
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

  const blockSubmitButton = () => {
    submitButton.disabled = true;
    submitButton.textContent = 'Публикую...';
  };

  const unblockSubmitButton = () => {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  };

  const pristine = new Pristine(form, {
    classTo: 'img-upload__text',
    errorTextParent: 'img-upload__text',
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          showSuccess();
          unblockSubmitButton();
        },
        () => {
          showError();
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
};

export { validate };
