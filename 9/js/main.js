import './form.js';
import './apply-effect.js';
import {renderPictures} from './render-pictures.js';
import { validate } from './validate.js';
import { getData } from './api.js';


validate();

getData((pictures) => {
  renderPictures(pictures);
});
