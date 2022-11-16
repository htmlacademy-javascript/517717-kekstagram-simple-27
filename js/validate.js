import { isEscapeKey } from './util.js';
import { form, closeModal, onModalEscPress } from './form.js';
import { sendData } from './api.js';

const validate = () => {
  const error = document.querySelector('#error').content.querySelector('.error');
  const success = document.querySelector('#success').content.querySelector('.success');
  const submitButton = form.querySelector('#upload-submit');
  const successButton = success.querySelector('.success__button');
  const errorButton = error.querySelector('.error__button');

  const onErrorHide = () => {
    error.remove();

    errorButton.removeEventListener('click', onErrorHide);
    document.addEventListener('keydown', onModalEscPress);
    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('click', onPopupOutClick);
  };

  const showError = () => {
    document.body.append(error);
    error.classList.add('active');

    errorButton.addEventListener('click', onErrorHide);
    document.removeEventListener('keydown', onModalEscPress);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', onPopupOutClick);
  };

  const onSuccessHide = () => {
    success.remove();
    closeModal();

    successButton.removeEventListener('click', onSuccessHide);
    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('click', onPopupOutClick);
  };

  const showSuccess = () => {
    document.body.append(success);
    success.classList.add('active');

    successButton.addEventListener('click', onSuccessHide);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', onPopupOutClick);
  };

  function onPopupEscPress(evt) {
    if (isEscapeKey(evt.key)) {
      evt.preventDefault();
      if (error.classList.contains('active')) {
        onErrorHide();
      }

      if (success.classList.contains('active')) {
        onSuccessHide();
      }
    }
  }

  function onPopupOutClick(evt) {
    if (evt.target === error) {
      onErrorHide();
    }
    if (evt.target === success) {
      onSuccessHide();
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
