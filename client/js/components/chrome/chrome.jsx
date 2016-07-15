'use strict';

import React              from 'react';
import Navbar             from './navbar.jsx';
import TableOfContents    from './table_of_contents.jsx';

export default class Chrome extends React.Component{


  render(){

    return <div>
      <Navbar/>
      <TableOfContents />
    </div>
  }
}