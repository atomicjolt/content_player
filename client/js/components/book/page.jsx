"use strict";

import React                    from "react";
import assets                   from '../../libs/assets';
import * as ContentActions      from '../../actions/content';
import _                        from 'lodash';
import { connect }              from "react-redux";

const select = (state) => {
  return {
    tableOfContents : state.content.tableOfContents,
    contentName : state.settings.contentName
  }
};

@connect(select, ContentActions)
export default class Page extends React.Component {
  constructor(props){
    super();
  }

  getStyles(){
    return{
      logo: {
        position: 'absolute',
        bottom: '20px',
        right: '20px'
      },
      content: {
        position: 'relative',
        left: '300px',
        top: '80px'
      }
    };
  }

  iframe(){
    var current = _.find(
      this.props.tableOfContents,
      (item) => item.id == this.props.params.pageId
    );
    
    if(!current){return;}
    return (
      <iframe
        style={{float:'right', width:'80%', height:'100%'}}
        src={`pubs/${this.props.contentName}/OEBPS/${current.content}`} />
    );
  }

  render(){
    const styles = this.getStyles();



    return (
      <div>
        {this.iframe()}
      </div>
    );
  }

}
