"use strict";

import React                    from "react";
import assets                   from '../../libs/assets';
import * as ContentActions      from '../../actions/content';
import _                        from 'lodash';
import { connect }              from "react-redux";

const select = (state) => {
  return {
    tableOfContents : state.content.tableOfContents,
    contentName : state.settings.contentName,
    epubPath: state.content.epubPath
  };
};

@connect(select, ContentActions)
export default class Page extends React.Component {

  iframe(props){
    var current = _.find(
      props.tableOfContents,
      (item) => item.id == this.props.params.pageId
    );
    if(!current){return;}
    return (
      <iframe src={`${this.props.epubPath}/${current.content}`} />
    );
  }

  render(){
    return (
      <div className="c-page">
        {this.iframe(this.props)}
      </div>
    );
  }

}
