"use strict";

import _                              from "lodash";

import { Constants as ContentConstants } from "../actions/content";

const initialState = {
  tocMeta: {}
};

export default (state = initialState, action) => {
  var nextState = _.merge({}, {...state});
  switch (action.type) {
    case ContentConstants.LOAD_CONTENT_DONE:
      nextState.tableOfContents = action.tableOfContents;
      nextState.title = action.tocDoc.docTitle;
      nextState.contentPath = action.contentPath;
      nextState.tocMeta = action.tocMeta;
      return nextState;

    default:
      return state;
  }
};
