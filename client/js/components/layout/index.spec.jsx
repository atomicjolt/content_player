import React                              from 'react';
import ReactDOM                           from 'react-dom';
import TestUtils                          from 'react-dom/test-utils';
import { Index, __RewireAPI__ as SidebarRewire } from './index';


const FakeSidebar = React.createClass({ // eslint-disable-line
  render() {
    return <div />;
  }
});

describe('index', () => {
  let result;
  let subject;
  let props;

  beforeEach(() => {
    SidebarRewire.__Rewire__('Sidebar', FakeSidebar); // eslint-disable-line no-underscore-dangle

    props = {
      loadContent: () => {},
      params: {}
    };
    result = TestUtils.renderIntoDocument(<Index {...props}><h1>Howdy</h1></Index>);
    subject = ReactDOM.findDOMNode(result); // eslint-disable-line
  });

  afterEach(() => {
    SidebarRewire.__ResetDependency__('Sidebar'); // eslint-disable-line no-underscore-dangle
  });

  it('renders the index', () => {
    expect(ReactDOM.findDOMNode(result)).toBeDefined(); // eslint-disable-line
  });
  it('renders children', () => {
    expect(subject.innerHTML).toContain('Howdy');
  });
});
