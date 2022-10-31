import {getRandomPositiveNumber} from './util.js';

const createData = () => {
  const NUMBER_OFFERS = 25;
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
  const LIKES = {
    min: 15,
    max: 200,
  };

  const COMMENTS = {
    min: 0,
    max: 200,
  };

  const createOffer = (index) => ({
    id: index,
    url: `photos/${index}.jpg`,
    description:
      DESCRIPTIONS[getRandomPositiveNumber(0, DESCRIPTIONS.length - 1)],
    likes: getRandomPositiveNumber(LIKES.min, LIKES.max),
    comments: getRandomPositiveNumber(COMMENTS.min, COMMENTS.max),
  });

  const offersMock = [];

  for (let i = 0; i < NUMBER_OFFERS; i++) {
    offersMock.push(createOffer(i + 1));
  }
  return offersMock;
};

export {createData};
