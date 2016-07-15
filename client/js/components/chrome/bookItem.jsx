'use strict';

import React          from 'react';

export default (props)=>{

  const openPage = ()=>{
    console.log('BUILD ME!');
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
    Activity Name
  </div>
}