"use strict";

import React        from 'react';
import ReactDOM     from 'react-dom';
import TestUtils    from 'react/lib/ReactTestUtils';
import { Provider } from 'react-redux';
import Helper       from '../../../specs_support/helper';
import { Index }        from './index';
import { __RewireAPI__ as ChromeRewireApi } from './index';


const FakeChrome = React.createClass({
  render(){
    return <div>Howdy</div>;
  }
});

describe('index', function() {
  var result;
  var props;

  beforeEach(()=>{
    ChromeRewireApi.__Rewire__('Chrome', FakeChrome);

    props = {
      loadContent: () => {},
      params: {}
    };
    result = TestUtils.renderIntoDocument(<Index {...props} />);
  });

  afterEach(() => {
    ChromeRewireApi.__ResetDependency__('Chrome');
  });

  it('renders the index', function() {
    expect(ReactDOM.findDOMNode(result)).toBeDefined();
  });
});
