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

  tableOfContents(props){
    if(!props.tableOfContents){return;}
    return _.map(props.tableOfContents, (item)=>{
      return (
        <BookItem
          key={`bookItem_${item.id}`}
          content={item}
          selected={this.props.pageId == item.id}
          sidebarOpen={this.props.sidebarOpen} />
      );
    });
  }

  render(){
    var sidebarClass = this.props.sidebarOpen ? "c-sidebar c-sidebar--open" : "c-sidebar";

    if(this.props.sidebarOpen){
      var tableOfContents = this.tableOfContents(this.props);
    }

    return (
      <div
        className={sidebarClass}>
        <div
          onClick={() => {this.props.toggleSidebar();}}
          className="openButton">
          Activity List
          <svg viewBox="0 0 8 12" version="1.1">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Core" transform="translate(-260.000000, -90.000000)" fill="#FFFFFF">
                    <g id="chevron-right" transform="translate(259.500000, 90.000000)">
                        <polygon id="Shape" points="2 0 0.6 1.4 5.2 6 0.6 10.6 2 12 8 6"></polygon>
                    </g>
                </g>
            </g>
        </svg>
        </div>
        <div className="unit">GRADE - UNIT</div>
        <div className="subject">{this.props.title || 'LESSON SUBJECT'}</div>
        {tableOfContents}
      </div>
    );
  }
}
