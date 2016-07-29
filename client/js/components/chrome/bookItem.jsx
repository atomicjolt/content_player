'use strict';

import React          from 'react';
import {hashHistory}  from "react-router";

export default (props)=>{

  const openPage = ()=>{
    hashHistory.push(`/${props.content.id}`);
  };

  var bookItemClass = props.selected ? "c-book-item c-book-item--selected" : "c-book-item";

  return <div className={bookItemClass} onClick={()=>openPage()}>
    <a>
      {props.content.navLabel}
    </a>
  </div>;
};
