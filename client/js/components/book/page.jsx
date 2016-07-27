"use strict";

import React                    from "react";
import assets                   from '../../libs/assets';
import * as ContentActions      from '../../actions/content';
import _                        from 'lodash';
import { connect }              from "react-redux";

const select = (state) => {
  return {
    pages :            state.content.pages,
    tableOfContents : state.content.tableOfContents
  }
};

@connect(select, ContentActions)
export default class Page extends React.Component {
  constructor(props){
    super();
    var page = _.find(props.pages, page => page.id ==  props.params.pageId );
    this.state = { content: page ? page.body : null }
  }

  componentWillUpdate(nextProps){
    // debugger;
    // if(this.props.params.pageId != nextProps.params.pageId){
      // var page = _.find(this.props.pages, page => page.id ==  nextProps.params.pageId );
      // if(page){
      //   // this.setState({ content: page.body});
      // } else {
      //   var entry = _.find(nextProps.tableOfContents, (item) => item.id == nextProps.params.pageId);
      //   debugger;
      //   if(entry){ this.props.loadPage(nextProps.params.pageId, unescape(entry.content)); }
      // }
    // }
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

  render(){
    // debugger;
    const styles = this.getStyles();
    const img = assets("./images/atomicjolt.jpg");

    //There are assets issues, iframing may be a better idea
    // <div style={styles.content} dangerouslySetInnerHTML={/*{__html: this.state.content}} />

    return (
      <div>
        <img src={img} style={styles.logo}/>
        <iframe src={} />
      </div>
    );
  }

}
