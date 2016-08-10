'use strict';

import React          from 'react';

export default (props)=>{

  const openPage = ()=>{
    props.selectPage(`/${props.content.id}`);
  };

  var bookItemClass = 'c-book-item';
  if(props.sidebarOpen && props.selected){
    bookItemClass = 'c-book-item c-book-item--selected';
  }

  return <div className={bookItemClass} onClick={()=>openPage()}>
    <a>
      {props.content.navLabel}
    </a>
  </div>;
};
