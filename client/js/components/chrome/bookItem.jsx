import React from 'react';

export default function BookItem(props) {

  const openPage = (e) => {
    e.preventDefault();
    props.focusPage();
    props.selectPage(`/${props.content.id}`, props.content.navLabel);
  };

  let bookItemClass = 'c-book-item';
  let ariaCurr;
  if (props.sidebarOpen && props.selected) {
    bookItemClass = 'c-book-item c-book-item--selected';
    ariaCurr = 'true';
  }

  return (
    <li className={bookItemClass} >
      <a
        href={`#${props.content.navLabel}}`}
        aria-current={ariaCurr} // eslint-disable-line
        onClick={e => openPage(e)}
      >
        {props.content.navLabel}
      </a>
    </li>
  );
}


BookItem.propTypes = {
  content: React.PropTypes.object,
  sidebarOpen: React.PropTypes.bool,
  selected: React.PropTypes.bool,
  selectPage: React.PropTypes.func,
  focusPage: React.PropTypes.func
};
