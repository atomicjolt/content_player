'use strict';

import React          from 'react';
import {hashHistory}  from "react-router";

export default (props)=>{

  const openPage = ()=>{
    hashHistory.push(`/${props.content.id}`);
  };

  const styles = {
    container: {
      // backgroundColor: props.selected ? 'deepPink' : 'gray',
      // padding: '10px 20px',
      // margin: '2px 0px',
      // color: 'white',
      fontSize: '.8em',
      cursor: 'pointer',

      marginTop: '.125em',
      padding: '.25em 1em .5em',
      backgroundColor: 'rgba(255,255,255, 0.1)'
      // cursor: pointer;
    }
  };

  return <div className="test" onClick={()=>openPage()} style={styles.container}>
    {props.content.navLabel}
  </div>;
};
