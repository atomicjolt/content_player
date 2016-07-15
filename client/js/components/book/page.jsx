"use strict";

import React                    from "react";
import assets                   from '../../libs/assets';
import { connect }              from "react-redux";

class Page extends React.Component {

  getStyles(){
    return{
      logo: {
        position: 'absolute',
        bottom: '20px',
        right: '20px'
      }
    };
  }

  render(){
    const styles = this.getStyles();
    const img = assets("./images/atomicjolt.jpg");

    return (
      <div>
        {this.props.params.pageId}
        <img src={img} style={styles.logo}/>
      </div>
    );
  }

}

const select = (state) => {
  return {
    page: state.page
  };
};

export default connect(select)(Page);
