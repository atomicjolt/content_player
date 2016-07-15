"use strict";

import React                    from 'react';
import assets                   from '../libs/assets';
import Navbar                   from './chrome/navbar.jsx';
import BookOverview             from './book/book_overview';

class Home extends React.Component {

  getStyles(){
    return{
      body: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
      }
    }
  }

  render(){
    const img = assets("./images/atomicjolt.jpg");
    const styles = this.getStyles();

    return<div style={styles.body}>
      <Navbar/>
      <BookOverview />
      <img src={img} />
    </div>;
  }

}

export { Home as default };