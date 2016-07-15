'use strict';

import React          from 'react';

export default class TableOfContents extends React.Component{

  getStyles(){
    return {
      container: {
        position: 'fixed',
        top: '72px',
        left: '0px',
        width: '250px',
        height: 'calc(100% - 72px)',
        backgroundColor: '#C0C0C0',
        overflowY: 'scroll'
      }
    };
  }

  render(){
    const styles = this.getStyles();

    return <div style={styles.container}>

    </div>
  }
}