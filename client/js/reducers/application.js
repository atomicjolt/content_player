"use strict";

import {Constants as ApplicationConstants} from '../actions/application';

const initialState =  {
  sidebarOpen: true
};

export default (state = initialState, action) => {

  switch(action.type){
    case ApplicationConstants.TOGGLE_SIDEBAR:
      var toggled = Object.assign({}, state);
      toggled.sidebarOpen = !toggled.sidebarOpen;
      return toggled;
      break;
    default:
      return state;
  }
};
