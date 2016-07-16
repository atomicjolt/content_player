'use strict';

import React          from 'react';
import {hashHistory}  from "react-router";

export default (props)=>{

  const openPage = ()=>{
    hashHistory.push(`/${props.content.id}`);
  };

  const styles = {
    container: {
      backgroundColor: props.selected ? 'deepPink' : 'gray',
      padding: '10px 20px',
      margin: '2px 0px',
      color: 'white',
      fontSize: '.8em',
      cursor: 'pointer'
    }
  };

  return <div onClick={()=>openPage()} style={styles.container}>
    {props.content.navLabel}
  </div>;
};
