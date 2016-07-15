'use strict';

import React              from 'react';
import Navbar             from './navbar.jsx';
import Sidebar    from './sidebar.jsx';

export default class Chrome extends React.Component{
  constructor(){
    super();
    this.state = { sidebarOpen: true }
  }

  toggleSidebar(){
    this.setState({sidebarOpen: !this.state.sidebarOpen});
  }

  render(){

    return <div>
      <Navbar toggleSidebar={()=>this.toggleSidebar()}/>
      <Sidebar sidebarOpen={this.state.sidebarOpen}/>
    </div>;
  }
}
