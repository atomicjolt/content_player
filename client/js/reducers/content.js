"use strict";

import _                              from "lodash";

import { Constants as ContentConstants } from "../actions/content";




export default (state = {}, action) => {
  switch (action.type) {

    case ContentConstants.LOAD_CONTENT_DONE:
      debugger
      state.tableOfContents = action.tableOfContents;
      return _.merge({}, {...state});

    default:
      return state;
  }
};
