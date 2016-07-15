'use strict';

import React          from 'react';

export default class Sidebar extends React.Component{

  getStyles(){
    return {
      container: {
        position: 'fixed',
        top: '72px',
        left: '0px',
        width: '292px',
        height: 'calc(100% - 72px)',
        backgroundColor: 'dimGrey',
        overflowY: 'scroll',
        borderRight: '3px solid deepPink',
        zIndex: '2'
      }
    };
  }

  render(){
    const styles = this.getStyles();

    return <div style={styles.container}>

    </div>
  }
}