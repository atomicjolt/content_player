'use strict';

import React          from 'react';
import BookItem       from './bookItem.jsx';
import _              from 'lodash';

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
      },
      unit: {
        marginTop: '40px',
        paddingLeft: '20px',
        color: 'white',
        fontSize: '.7em'
      },
      subject:{
        color: 'white',
        paddingLeft: '20px',
        marginBottom: '10px'
      }
    };
  }

  tableOfContents(){
    return _.map(_.range(12), (id)=>{
      //the selected prop needs to be fixed when we have data
      return <BookItem selected={7 == id} />
    })
  }

  render(){
    const styles = this.getStyles();

    return <div style={styles.container}>
      <div style={styles.unit}>GRADE - UNIT</div>
      <div style={styles.subject}>LESSON SUBJECT</div>
      {this.tableOfContents()}
    </div>
  }
}