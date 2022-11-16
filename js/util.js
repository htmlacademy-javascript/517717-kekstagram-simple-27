const getRandomPositiveNumber = function (min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    return NaN;
  }

  if (min < 0 || max < 0) {
    return NaN;
  }

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return NaN;
  }

  if (Math.abs(max - min) < 1) {
    return NaN;
  }

  const tempMin = Math.min(min, max);
  const tempMax = Math.max(min, max);

  const realMin = Math.ceil(tempMin);
  const realMax = Math.floor(tempMax);

  const randomNumber = Math.random() * (realMax - realMin + 1) + realMin;

  return Math.floor(randomNumber);
};

const checkStringLength = (string, length) => string.length <= length;

const isEscapeKey = (key) => key === 'Escape';

const showGetDataError = () => {
  const message = document.createElement('p');
  message.textContent = 'Ошибка загрузки данных. Перезагрузите страницу.';
  message.style.cssText = ['position: fixed',
    'bottom: 100px',
    'left: 0',
    'right: 0',
    'margin: 0',
    'padding: 15px 30px',
    'text-align: center',
    'font-size: 18px',
    'background-color: #3c3614',
    'color: #ffe753',
    'border-bottom: 1px solid #ffffff',
    'border-top: 1px solid #ffffff'].join(';');

  document.body.append(message);
};

export {getRandomPositiveNumber, checkStringLength, isEscapeKey, showGetDataError};


