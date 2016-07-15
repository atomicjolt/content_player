"use strict";

import React            from 'react';

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
      width: '100px',
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
      right: '175px',
      cursor: 'pointer',
    },
    finish: {
      bottom: '10px',
      right: '20px',
      cursor: 'pointer',
    }
  };

  return <div style={styles.container}>
    <img src="http://supplychainmit.com/wp-content/uploads/2015/04/MIT-logo.png" style={styles.logo}/>
    <span style={{...styles.navItems, ...styles.version}}>UNPLATFORM VERSION 0.0</span>
    <span style={{...styles.navItems, ...styles.newSubject}}>CHOOSE NEW SUBJECT</span>
    <span style={{...styles.navItems, ...styles.finish}}>FINISH LESSON</span>
  </div>
}