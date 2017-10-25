import React        from 'react';
import TestUtils    from 'react-dom/test-utils';
import { Page }  from './page';

describe('page', () => {
  let page;
  let props;
  const renderResult = () => {
    page = TestUtils.renderIntoDocument(<Page tocMeta={{}} />);
  };

  beforeEach(() => {
    props = {
      tableOfContents: [{ id:1 }, { id:2 }],
      contentPath:'FakeUrl',
      params:{ pageId:1 },
    };
    renderResult();
  });

  it('renders iframe of selected item', () => {
    const result = page.iframe(props);
    expect(result.type).toEqual('iframe');
  });

  it('returns div if no item is selected', () => {
    props.params.pageId = 3;
    const result = page.iframe(props);
    expect(result.type).toEqual('div');
  });
});
