"use strict";

import React                    from "react";

import Sidebar                  from '../chrome/sidebar';
import * as ContentActions      from '../../actions/content';
import * as ApplicationActions  from '../../actions/application';
import { connect }              from "react-redux";

export class Index extends React.Component {

  componentWillMount(){
    this.props.loadContent(this.props.epubUrl);
  }

  componentWillReceiveProps(nextProps){
    const toc = nextProps.tableOfContents;
    const currentPage = this.props.currentPage;
    if(!currentPage && toc && toc[0]){
      this.props.selectPage(`/${toc[0].id}`);
    }
  }

  render(){
    return (
      <div className="c-container">
        <Sidebar pageId={this.props.params.pageId}/>
        <div className="c-content">
          {this.props.children}
        </div>
      </div>
    );
  }

}

const select = (state) => {
  return {
    contentName: state.settings.contentName,
    epubUrl: state.settings.epubUrl,
    tableOfContents: state.content.tableOfContents,
    currentPage: state.application.currentPage
  };
};

export default connect(select, {...ContentActions, ...ApplicationActions})(Index);
