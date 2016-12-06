import wrapper from "../constants/wrapper";

// Local actions
const actions = [
  "TOGGLE_SIDEBAR",
  "SELECT_PAGE"
];

export const Constants = wrapper(actions);


export const toggleSidebar = () => ({
  type: Constants.TOGGLE_SIDEBAR
});

export const selectPage = (pageId, pageName) => ({
  type: Constants.SELECT_PAGE,
  pageId,
  pageName
});
