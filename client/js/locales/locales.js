"use strict";

import en from './en';
import te from './te';
import hi from './hi';

export default () => {
  return {...en, ...te, ...hi};
};
