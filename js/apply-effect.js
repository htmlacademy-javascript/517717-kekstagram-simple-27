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
let [min, max, start, step, filter, unit] = params[effect];

noUiSlider.create(slider, {
  connect: 'lower',
  range: {
    min: min,
    max: max,
  },
  start: start,
  step: step,
});

slider.noUiSlider.on('update', () => {
  sliderValue.value = slider.noUiSlider.get();
  img.style.filter = `${filter}(${slider.noUiSlider.get()}${unit})`;
});

const applyEffect = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    effect = evt.target.value;
    [min, max, start, step, filter, unit] = params[effect];

    resetEffect();
    img.classList.add(`effects__preview--${effect}`);
    if (effect === 'none') {
      sliderBlock.classList.add('hidden');
    } else {
      sliderBlock.classList.remove('hidden');
    }

    slider.noUiSlider.updateOptions({
      range: {
        min: min,
        max: max,
      },
      start: start,
      step: step,
    });
  }
};
document.querySelector('.effects__list').addEventListener('click', applyEffect);
