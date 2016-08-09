"use strict";

import {Constants as ApplicationConstants} from '../actions/application';

const initialState =  {
  sidebarOpen: true,
  currentPage: null
};

export default (state = initialState, action) => {

  switch(action.type){
    case ApplicationConstants.TOGGLE_SIDEBAR:
      var toggled = Object.assign({}, state);
      toggled.sidebarOpen = !toggled.sidebarOpen;
      return toggled;
      break;
    case ApplicationConstants.SELECT_PAGE:
      var selectedPage = Object.assign({}, state);
      selectedPage.currentPage = action.pageId;
      return selectedPage;
      break;
    default:
      return state;
  }
};
