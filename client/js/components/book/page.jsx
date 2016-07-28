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
      },
      iframe: {
        margin: '0 auto',
        padding: 0,
        border: 'none',
        height: 'calc(100% - 72px)',
        width: '90%',
        display: 'block',
        position: 'relative',
        top: '72px',
      },
      container: {
        height: '100%',
        width: '100%'
      }
    };
  }

  iframe(props){
    var current = _.find(
      props.tableOfContents,
      (item) => item.id == this.props.params.pageId
    );
    var styles = this.getStyles();
    if(!current){return;}
    return (
      <iframe
        style={styles.iframe}
        src={`pubs/${props.contentName}/OEBPS/${current.content}`} />
    );
  }

  render(){
    const styles = this.getStyles();



    return (
      <div style={styles.container}>
        {this.iframe(this.props)}
      </div>
    );
  }

}
