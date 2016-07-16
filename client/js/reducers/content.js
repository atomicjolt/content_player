"use strict";

import _                              from "lodash";

import { Constants as ContentConstants } from "../actions/content";




export default (state = {}, action) => {
  switch (action.type) {

    case ContentConstants.LOAD_CONTENT_DONE:
      state.tableOfContents = action.tableOfContents;
      state.title = action.tocDoc.docTitle;
      return _.merge({}, {...state});

    case ContentConstants.LOAD_PAGE_DONE:
      let newEntry = {id: action.id, body: action.pageContent};
      if(state.pages){ state.pages.push(newEntry); }
      else { state.pages = [newEntry]; }
      return _.merge({}, {...state});

    default:
      return state;
  }
};
