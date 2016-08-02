"use strict";

import React        from 'react';
import ReactDOM     from 'react-dom';
import TestUtils    from 'react/lib/ReactTestUtils';
import { Provider } from 'react-redux';
import Helper       from '../../../specs_support/helper';
import { Index }        from './index';
import { __RewireAPI__ as SidebarRewire } from './index';


const FakeSidebar = React.createClass({
  render(){
    return <div></div>;
  }
});

describe('index', function() {
  var result, subject;
  var props;

  beforeEach(()=>{
    SidebarRewire.__Rewire__('Sidebar', FakeSidebar);

    props = {
      loadContent: () => {},
      params: {}
    };
    result = TestUtils.renderIntoDocument(<Index {...props}><h1>Howdy</h1></Index>);
    subject = ReactDOM.findDOMNode(result);
  });

  afterEach(() => {
    SidebarRewire.__ResetDependency__('Sidebar');
  });

  it('renders the index', function() {
    expect(ReactDOM.findDOMNode(result)).toBeDefined();
  });
  it("renders children", () => {
    expect(subject.innerHTML).toContain('Howdy');
  });
});
