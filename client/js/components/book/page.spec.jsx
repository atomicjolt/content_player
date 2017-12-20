import React        from 'react';
import TestUtils    from 'react-dom/test-utils';
import Drawer       from 'material-ui/Drawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Page }     from './page';

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

  it('renders navigation buttons', () => {
    const pageProps = {
      tocMeta: {},
      tableOfContents: [{ id:'1' }, { id:'2' }, { id:'3' }],
      params: {
        pageId: '1'
      },
      localizedStrings: {
        footer: {
          next: 'Next',
          previous: 'Previous'
        }
      }
    };

    page = TestUtils.renderIntoDocument(<Page {...pageProps} />);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(page, 'page-nav-button').length).toEqual(1);

    pageProps.params.pageId = '2';
    page = TestUtils.renderIntoDocument(<Page {...pageProps} />);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(page, 'page-nav-button').length).toEqual(2);

    pageProps.params.pageId = '3';
    page = TestUtils.renderIntoDocument(<Page {...pageProps} />);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(page, 'page-nav-button').length).toEqual(1);
  });

  it('renders bibliography button when appropriate', () => {
    const pageProps = {
      tocMeta: {},
      tableOfContents: [{ id:'1' }, { id:'2' }, { id:'3' }],
      params: {
        pageId: '1'
      },
      localizedStrings: {
        footer: {
          next: 'Next',
          previous: 'Previous',
          bibliography: 'bib'
        }
      },
      styles: {}
    };

    let wrappedPage = (
      <MuiThemeProvider>
        <Page {...pageProps} />
      </MuiThemeProvider>
    );

    page = TestUtils.renderIntoDocument(wrappedPage);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(page, 'bibliography-btn').length).toEqual(0);
    expect(TestUtils.scryRenderedComponentsWithType(page, Drawer).length).toEqual(0);

    pageProps.bibliography = {
      content: 'fakeUrl'
    };

    wrappedPage = (
      <MuiThemeProvider>
        <Page {...pageProps} />
      </MuiThemeProvider>
    );

    page = TestUtils.renderIntoDocument(wrappedPage);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(page, 'bibliography-btn').length).toEqual(1);
    const drawerBtn = TestUtils.findRenderedDOMComponentWithClass(page, 'bibliography-btn');

    expect(TestUtils.scryRenderedComponentsWithType(page, Drawer).length).toEqual(1);
    let drawer = TestUtils.findRenderedComponentWithType(page, Drawer);
    expect(drawer.props.open).toEqual(false);

    TestUtils.Simulate.click(drawerBtn);

    drawer = TestUtils.findRenderedComponentWithType(page, Drawer);
    expect(drawer.props.open).toEqual(true);
  });
});
