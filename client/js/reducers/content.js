"use strict";

import _                              from "lodash";

import { Constants as ContentConstants } from "../actions/content";




export default (state = {}, action) => {
  var nextState = _.merge({}, {...state});
  switch (action.type) {
    case ContentConstants.LOAD_CONTENT_DONE:
      nextState.tableOfContents = action.tableOfContents;
      nextState.title = action.tocDoc.docTitle;
      nextState.epubPath = action.epubPath;
      return nextState;

    default:
      return state;
  }
};
