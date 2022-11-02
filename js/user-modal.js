import { resetData } from './reset-data.js';
import { isEscapeKey } from './util.js';

const overlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const comment = form.querySelector('.text__description');
const upload = form.querySelector('#upload-file');
const scaleControl = form.querySelector('.scale__control--value');
const close = form.querySelector('#upload-cancel');
const img = form.querySelector('.img-upload__preview img');

const onPopupEscPress = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function closeModal () {
  resetData();
  document.body.classList.remove('modal-open');
  overlay.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
}

function openModal () {
  upload.addEventListener('change', () => {
    document.body.classList.add('modal-open');
    overlay.classList.remove('hidden');
  });
  document.addEventListener('keydown', onPopupEscPress);
}

close.addEventListener('click', closeModal);

const createEffectsArray = () => {
  const effects = [];
  form.querySelectorAll('.effects__radio').forEach((effect) => {
    effects.push(effect.value);
  });
  return effects;
};

const applyEffect = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const effectName = evt.target.value;
    img.className = '';
    createEffectsArray().forEach((effect) => {
      const radioButton = document.querySelector(`#effect-${effect}`);
      radioButton.removeAttribute('checked');
      if (effectName === effect) {
        radioButton.setAttribute('checked', true);
        img.classList.add(`effects__preview--${effect}`);
      }
    });
  }
};

document.querySelector('.effects__list').addEventListener('click', applyEffect);

export { openModal, form, upload, scaleControl, comment, img };
