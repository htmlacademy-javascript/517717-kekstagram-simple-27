const getRandomPositiveNumber = function (min, max) {
  if (min < 0 || max < 0) {
    return NaN;
  }

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return NaN;
  }

  if (typeof min !== 'number' || typeof max !== 'number') {
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

checkStringLength('', 50);

const NUMBER_OFFERS = 25;
const LIKES = {
  min: 15,
  max: 200,
};

const COMMENTS = {
  min: 0,
  max: 200,
};

const DESCRIPTIONS = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
  'Описание 4',
  'Описание 5',
  'Описание 6',
  'Описание 7',
  'Описание 8',
  'Описание 9',
  'Описание 10',
  'Описание 11',
  'Описание 12',
  'Описание 13',
  'Описание 14',
  'Описание 15',
  'Описание 16',
  'Описание 17',
  'Описание 18',
  'Описание 19',
  'Описание 20',
  'Описание 21',
  'Описание 22',
  'Описание 23',
  'Описание 24',
  'Описание 25',
];

const createOffersMock = () => {
  const createOffer = function (index) {
    return {
      id: index,
      url: `photos/${index}.jpg`,
      description: DESCRIPTIONS[getRandomPositiveNumber(0, (DESCRIPTIONS.length - 1))],
      likes: getRandomPositiveNumber(LIKES.min, LIKES.max),
      comments: getRandomPositiveNumber(COMMENTS.min, COMMENTS.max),
    };
  };

  const offersMock = [];

  for (let i = 1; i <= NUMBER_OFFERS; i++) {
    offersMock.push(createOffer(i));
  }

  return offersMock;
};

createOffersMock();
