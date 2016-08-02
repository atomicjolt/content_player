"use strict";

import React                    from "react";
import Sidebar from '../chrome/sidebar';
import * as ContentActions      from '../../actions/content';
import { connect }              from "react-redux";

class Index extends React.Component {

  componentWillMount(){
    this.props.loadContent(this.props.epubUrl);
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
    epubUrl: state.settings.epubUrl
  };
};

export default connect(select, ContentActions)(Index);
