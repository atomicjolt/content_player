"use strict";

import React        from 'react';
import ReactDOM     from 'react-dom';
import TestUtils    from 'react/lib/ReactTestUtils';
import { Page }  from './page';

var page;
var props;
describe('page', () => {
  beforeEach(() => {
    page = TestUtils.renderIntoDocument(<Page />);
    props = {
      tableOfContents: [{id:1}, {id:2}],
      contentPath:"FakeUrl",
      params:{pageId:1}
    };
  });

  it('renders iframe of selected item', () => {
    var result = page.iframe(props);
    expect(result.type).toEqual('iframe');
  });

  it('returns undefined if no item is selected', () => {
    props.params.pageId = 3;
    var result = page.iframe(props);
    expect(result).toBeUndefined();
  });
});
