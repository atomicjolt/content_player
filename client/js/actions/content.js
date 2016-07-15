import wrapper    from "../constants/wrapper";
import Network    from '../constants/network';

// Local actions
const actions = [
  "RESET",
  "LOAD_CONTENT"
];

// Actions that make an api request
const requests = [
];

export const Constants = wrapper(actions, requests);

export const resetValue = (key) => ({
  type: Constants.RESET,
  key
});

export const loadContent = (deck) => ({
  type: Constants.LOAD_CONTENT,
  deck
});
