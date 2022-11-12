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

export {getRandomPositiveNumber, checkStringLength, isEscapeKey};
