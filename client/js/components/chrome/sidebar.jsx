'use strict';

import React          from 'react';
import BookItem       from './bookItem.jsx';
import _              from 'lodash';
import {connect}      from 'react-redux';
import * as ApplicationActions  from '../../actions/application';

const select = (state) => {
  return {
    tableOfContents: state.content.tableOfContents,
    title: state.content.title,
    sidebarOpen: state.application.sidebarOpen
  };
};

@connect(select, ApplicationActions)
export default class Sidebar extends React.Component{



  tableOfContents(){
    return _.map(this.props.tableOfContents, (item)=>{
      return <BookItem key={`bookItem_${item.id}`} content={item} selected={this.props.pageId == item.id} />;
    });
  }

  render(){

    var sidebarClass = this.props.sidebarOpen ? "c-sidebar c-sidebar--open" : "c-sidebar";
    return <div className={sidebarClass} onMouseLeave={() => this.props.toggleSidebar()}>
      <div className="unit">GRADE - UNIT</div>
      <div className="subject">{this.props.title || 'LESSON SUBJECT'}</div>
      {this.tableOfContents()}
    </div>;
  }
}
