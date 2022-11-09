import { sliderBlock, img, resetEffect } from './form.js';

const slider = sliderBlock.querySelector('.effect-level__slider');
const sliderValue = sliderBlock.querySelector('.effect-level__value');
const params = {
  //min, max, start, step, filter, unit
  none: [0, 0, 0, 0, 'none', 0],
  chrome: [0, 1, 0, 0.1, 'grayscale', ''],
  sepia: [0, 1, 0, 0.1, 'sepia', ''],
  marvin: [0, 100, 0, 1, 'invert', '%'],
  phobos: [0, 3, 0, 0.1, 'blur', 'px'],
  heat: [1, 3, 0, 0.1, 'brightness', ''],
};
let effect = params.none[4];

noUiSlider.create(slider, {
  connect: 'lower',
  range: {
    min: 0,
    max: 0
  },
  start: 0,
  step: 0,
  filter: effect,
  unit: '',
});

slider.noUiSlider.on('update', () => {
  sliderValue.setAttribute('value', slider.noUiSlider.get());
  img.style.filter = `${params[effect][4]}(${slider.noUiSlider.get()}${params[effect][5]})`;
});

const applyEffect = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    effect = evt.target.value;
    resetEffect();
    const radio = document.querySelector(`#effect-${effect}`);
    radio.checked = true;
    img.classList.add(`effects__preview--${effect}`);
    if (effect === 'none') {
      sliderBlock.classList.add('hidden');
    } else {
      sliderBlock.classList.remove('hidden');
    }

    slider.noUiSlider.updateOptions({
      range: {
        min: params[effect][0],
        max: params[effect][1],
      },
      start: params[effect][2],
      step: params[effect][3],
      filter: params[effect][4],
      unit: params[effect][5],
    });
  }
};
document.querySelector('.effects__list').addEventListener('click', applyEffect);
