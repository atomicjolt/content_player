"use strict";

import {Constants as ApplicationConstants} from '../actions/application';

const initialState =  {
  sidebarOpen: true
};

export default (state = initialState, action) => {

  switch(action.type){
    case ApplicationConstants.TOGGLE_SIDEBAR:
      state.sidebarOpen = !state.sidebarOpen
      return Object.assign({}, state);
      break;
    default:
      return state;
  }
};
