import React     from 'react';
import ReactDOM  from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import NotFound  from './not_found';

describe('not found', () => {
  it('renders a "not found" message', () => {
    const result = TestUtils.renderIntoDocument(<div><NotFound /></div>);
    expect(ReactDOM.findDOMNode(result).textContent).toContain('Page Not Found'); // eslint-disable-line
  });
});
