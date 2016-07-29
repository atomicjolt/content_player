import wrapper from "../constants/wrapper";

// Local actions
const actions = [
  "TOGGLE_SIDEBAR"
];

export const Constants = wrapper(actions);


export const toggleSidebar = () => ({
  type: Constants.TOGGLE_SIDEBAR
});
