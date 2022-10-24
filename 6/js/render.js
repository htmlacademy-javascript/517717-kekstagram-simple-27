import {createOffersMock} from './data.js';

const renderPicture = () => {
  const picturesBlock = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesData = createOffersMock();
  const picturesListFragment = document.createDocumentFragment();

  picturesData.forEach(({url, likes, comments, description}) => {
    const pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = url;
    pictureItem.querySelector('.picture__img').alt = description;
    pictureItem.querySelector('.picture__comments').textContent = comments;
    pictureItem.querySelector('.picture__likes').textContent = likes;
    picturesListFragment.append(pictureItem);
  });
  picturesBlock.append(picturesListFragment);
};

export {renderPicture};
