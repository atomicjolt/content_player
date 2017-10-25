import {Constants as ApplicationConstants} from '../actions/application';

const initialState =  {
  sidebarOpen: true,
  currentPage: null,
  pageFocus: null
};

export default (state = initialState, action) => {

  switch(action.type){
    case ApplicationConstants.TOGGLE_SIDEBAR: {
      const toggled = Object.assign({}, state);
      toggled.sidebarOpen = !toggled.sidebarOpen;
      return toggled;
    }

    case ApplicationConstants.SELECT_PAGE: {
      const selectedPage = Object.assign({}, state);
      selectedPage.currentPage = action.pageId;
      selectedPage.currentPageName = action.pageName;
      return selectedPage;
    }

    case ApplicationConstants.FOCUS_PAGE: {
      const focusedPage = Object.assign({}, state);
      focusedPage.pageFocus = true;
      return focusedPage;
    }

    default:
      return state;
  }
};
