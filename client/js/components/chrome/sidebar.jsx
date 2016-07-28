'use strict';

import React          from 'react';
import BookItem       from './bookItem.jsx';
import _              from 'lodash';
import {connect}      from 'react-redux';

const select = (state) => {
  return {
    tableOfContents: state.content.tableOfContents,
    title: state.content.title,
  }
};

@connect(select)
export default class Sidebar extends React.Component{

  getStyles(){
    return {
      container: {
        position: 'fixed',
        top: '72px',
        left: this.props.sidebarOpen ? '0px' : '-300px',
        width: '292px',
        height: 'calc(100% - 72px)',
        overflowY: 'scroll',
        borderRight: '3px solid deepPink',
        zIndex: '2',
        transition: 'all .4s ease',
        alignItems: 'stretch',
        backgroundColor: '#4a4a4a'
      },
      unit: {
        marginTop: '40px',
        paddingLeft: '20px',
        fontSize: '.7rem',
        color: '#fff',
        fontWeight: 300,
        letterSpacing: '1.15px',
        textTransform: 'uppercase'
      },
      subject:{
        paddingLeft: '20px',
        marginBottom: '10px',
        color: '#fff',
        fontWeight: 300,
        fontSize: '.875rem',
        textTransform: 'uppercase'
      }
    };
  }

  tableOfContents(){
    return _.map(this.props.tableOfContents, (item)=>{
      return <BookItem key={`bookItem_${item.id}`} content={item} selected={this.props.pageId == item.id} />;
    });
  }

  render(){
    const styles = this.getStyles();

    return <div style={styles.container}>
      <div style={styles.unit}>GRADE - UNIT</div>
      <div style={styles.subject}>{this.props.title || 'LESSON SUBJECT'}</div>
      {this.tableOfContents()}
    </div>;
  }
}
