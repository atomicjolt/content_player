"use strict";

import React                    from "react";
import Chrome                   from '../chrome/chrome.jsx';
import { connect }              from "react-redux";

class Index extends React.Component {

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
        top: '72px',
        left: '292px',
        width: 'calc(100% - 292px)',
        height: 'calc(100% - 72px)',
        backgroundColor: 'lightGrey'
      }
    };
  }

  render(){
    const styles = this.getStyles();
    return (
      <div style={styles.body}>
        <Chrome />
        <div style={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }

}

const select = (state) => {
  return {
  };
};

export default connect(select)(Index);
