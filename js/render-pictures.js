//import {createData} from './create-data.js';
//const picturesData = createData();

const renderPictures = (picturesData) => {
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  picturesData.forEach(({url, likes, comments, description}) => {
    const item = template.cloneNode(true);
    item.querySelector('.picture__img').src = url;
    item.querySelector('.picture__img').alt = description;
    item.querySelector('.picture__comments').textContent = comments;
    item.querySelector('.picture__likes').textContent = likes;
    fragment.append(item);
  });

  document.querySelector('.pictures').append(fragment);
};

export {renderPictures};
