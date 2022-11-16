import { isEscapeKey } from './util.js';

const overlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const sliderBlock = form.querySelector('.effect-level');
const loading = form.querySelector('#upload-file');
const close = form.querySelector('#upload-cancel');
const img = form.querySelector('.img-upload__preview img');
const decreaseButton = form.querySelector('.scale__control--smaller');
const increaseButton = form.querySelector('.scale__control--bigger');
const scaleControl = form.querySelector('.scale__control--value');
let currentValue = Number.parseInt(scaleControl.value, 10);

const ScaleParams = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const resetEffect = () => {
  img.className = '';
  img.style.transform = '';
  img.style.filter = '';
  scaleControl.value = `${ScaleParams.MAX}%`;
  currentValue = ScaleParams.MAX;
};

const resetData = () => {
  form.reset();
  resetEffect();
  sliderBlock.classList.add('hidden');
};

const uploadImage = () => {
  img.src = URL.createObjectURL(loading.files[0]);
};

const closeModal = () => {
  resetData();
  document.body.classList.remove('modal-open');
  overlay.classList.add('hidden');

  document.removeEventListener('keydown', onModalEscPress);
  close.removeEventListener('click', closeModal);
};

const openModal = () => {
  document.body.classList.add('modal-open');
  overlay.classList.remove('hidden');

  uploadImage();
  document.addEventListener('keydown', onModalEscPress);
  close.addEventListener('click', closeModal);
};

loading.addEventListener('change', openModal);

function onModalEscPress(evt) {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closeModal();
  }
}

const decreaseScale = () => {
  if (!isNaN(currentValue)) {
    currentValue = Math.max(
      currentValue - ScaleParams.STEP,
      ScaleParams.MIN
    );
    scaleControl.value = `${currentValue}%`;
    img.style.transform = `scale(${currentValue / 100})`;
  } else {
    throw new Error('Значение не является числом');
  }
};

const increaseScale = () => {
  if (!isNaN(currentValue)) {
    currentValue = Math.min(
      currentValue + ScaleParams.STEP,
      ScaleParams.MAX
    );
    scaleControl.value = `${currentValue}%`;
    img.style.transform = `scale(${currentValue / 100})`;
  } else {
    throw new Error('Значение не является числом');
  }
};

decreaseButton.addEventListener('click', decreaseScale);
increaseButton.addEventListener('click', increaseScale);

export { resetData, closeModal, resetEffect, onModalEscPress, form, img, sliderBlock };
