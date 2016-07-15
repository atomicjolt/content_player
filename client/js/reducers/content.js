"use strict";

import Immutable                      from "immutable";
import _                              from "lodash";

import { Constants as ContentConstants } from "../actions/content";

const Content = Immutable.Record({
  id: null
});

const initialState = new Immutable.Map();

export default (state = initialState, action) => {
  switch (action.type) {

    case ContentConstants.LOAD_CONTENT_DONE:
      if(!action.response || action.err) return state;

      var content = action.payload.content;
      return new Content(content);

    default:
      return state;
  }
};
