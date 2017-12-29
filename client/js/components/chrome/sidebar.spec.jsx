import React        from 'react';
import ReactDOM     from 'react-dom';
import TestUtils    from 'react-dom/test-utils';
import { Sidebar }  from './sidebar';

describe('sidebar', () => {
  let result;
  let subject;
  let props;

  const renderResult = () => {
    result = TestUtils.renderIntoDocument(<Sidebar {...props} />);
    subject = ReactDOM.findDOMNode(result);
  };

  beforeEach(() => {
    props = {
      tableOfContents: [{ id:1, navLabel:'tocA' }, { id:2, navLabel:'tocB' }],
      title: 'title',
      sidebarOpen: true,
      tocMeta: { },
      localizedStrings: { sidebar: { activityList: 'Activity List' } }
    };
    renderResult();
  });

  it('renders table of contents', () => {
    expect(subject.innerHTML).toContain('tocA');
    expect(subject.innerHTML).toContain('tocB');
  });

  it('renders correct toggle state', () => {
    expect(subject.outerHTML).toContain('c-sidebar c-sidebar--open');
    props.sidebarOpen = false;
    renderResult();

    expect(subject.outerHTML).not.toContain('c-sidebar--open');
  });
});
