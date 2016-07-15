"use stict";

import React            from 'react';

export default (props)=>{

  const styles = {
    container: {
      position: 'fixed',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '72px',
      backgroundColor: '#999999',
      boxShadow: '1px 1px 1px gray',
      zIndex: '2'
    },
    logo: {
      width: '100px',
      padding: '10px'
    }
  };

  return <div style={styles.container}>
    <img src="http://supplychainmit.com/wp-content/uploads/2015/04/MIT-logo.png" style={styles.logo}/>
  </div>
}