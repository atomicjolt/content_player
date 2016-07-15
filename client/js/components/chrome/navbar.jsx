"use strict";

import React            from 'react';
import assets           from '../../libs/assets';

export default (props)=>{

  const styles = {
    container: {
      position: 'fixed',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '72px',
      backgroundColor: 'white',
      boxShadow: '1px 1px 1px gray',
      zIndex: '3'
    },
    logo: {
      width: '160px',
      padding: '10px'
    },
    navItems: {
      position: 'absolute',
      fontSize: '.7em',
      color: 'gray'
    },
    version: {
      top: '10px',
      right: '20px',
      color: 'lightGray'
    },
    newSubject: {
      bottom: '10px',
      right: '150px',
      cursor: 'pointer',
    },
    finish: {
      bottom: '10px',
      right: '20px',
      cursor: 'pointer',
    }
  };

  const img = assets("./images/newLogo.png");

  return <div style={styles.container}>
    <img src={img} style={styles.logo}/>
    <span style={{...styles.navItems, ...styles.version}}>UNPLATFORM VERSION 0.0</span>
    <span style={{...styles.navItems, ...styles.newSubject}}>CHOOSE NEW SUBJECT</span>
    <span style={{...styles.navItems, ...styles.finish}}>FINISH LESSON</span>
  </div>;
};
