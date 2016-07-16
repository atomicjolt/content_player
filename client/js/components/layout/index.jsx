"use strict";

import React                    from "react";
import Chrome                   from '../chrome/chrome.jsx';
import * as ContentActions      from '../../actions/content';
import { connect }              from "react-redux";

class Index extends React.Component {

  componentWillMount(){
    this.props.loadContent(this.props.contentName);
  }

  getStyles(){
    return{
      body: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        fontFamily: "'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
        fontWeight: '300'
      },
      content: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: 'lightGrey',
        zIndex: '1'
      }
    };
  }

  render(){
    const styles = this.getStyles();
    return (
      <div style={styles.body}>
        <Chrome pageId={this.props.params.pageId}/>
        <div style={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }

}

const select = (state) => {
  return {
    contentName: state.settings.contentName
  };
};

export default connect(select, ContentActions)(Index);
