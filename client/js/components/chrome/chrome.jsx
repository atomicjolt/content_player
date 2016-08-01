'use strict';

import React              from 'react';
import Navbar             from './navbar.jsx';
import Sidebar            from './sidebar.jsx';

export default class Chrome extends React.Component{
  render(){

    return <div>
      <Sidebar pageId={this.props.pageId}/>
    </div>;
  }
}
