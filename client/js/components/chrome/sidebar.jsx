import _                        from 'lodash';
import React                    from 'react';
import { connect }              from 'react-redux';
import BookItem                 from './bookItem.jsx';
import * as ApplicationActions  from '../../actions/application';
import { localizeStrings }      from '../../selectors/locale';

const select = state => (
  {
    tableOfContents: state.content.tableOfContents,
    title: state.content.title,
    tocMeta: state.content.tocMeta,
    sidebarOpen: state.application.sidebarOpen,
    localizedStrings: localizeStrings(state)
  }
);

export class Sidebar extends React.Component {

  static propTypes = {
    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: React.PropTypes.object,
    tocMeta: React.PropTypes.shape({
      gradeUnit: React.PropTypes.string,
      subjectLesson: React.PropTypes.string,
      lastModified: React.PropTypes.string,
    }),
    selectPage: React.PropTypes.func,
    focusPage: React.PropTypes.func,
    toggleSidebar: React.PropTypes.func,
    pageId: React.PropTypes.string,
    sidebarOpen: React.PropTypes.bool
  };


  tableOfContents(props) {
    if (!props.tableOfContents) { return <div />; }
    return _.map(props.tableOfContents, item => (
      <BookItem
        key={`bookItem_${item.id}`}
        content={item}
        selected={this.props.pageId === item.id}
        sidebarOpen={this.props.sidebarOpen}
        selectPage={this.props.selectPage}
        focusPage={this.props.focusPage}
      />
    ));
  }

  render() {
    let btnToggleClass = 'c-sidebar__toggle-button';
    let svgSpinClass = 'c-sidebar__svg';
    let btnAriaPressed = 'false';
    let btnAriaExpanded = 'false';
    let sidebarClass = 'c-sidebar';
    let unit = '';
    let subject = '';
    let tableOfContents = '';
    const lastModified = this.props.tocMeta.lastModified;
    const footerText = lastModified ? `CLIx release date: ${lastModified}` : undefined;

    if (this.props.sidebarOpen) {
      btnToggleClass = 'c-sidebar__toggle-button c-sidebar__toggle-button--open';
      svgSpinClass = 'c-sidebar__svg c-sidebar__svg--spin';
      btnAriaPressed = 'true';
      btnAriaExpanded = 'true';
      sidebarClass = 'c-sidebar c-sidebar--open';
      unit = this.props.tocMeta.gradeUnit;
      subject = this.props.tocMeta.subjectLesson;
      tableOfContents = this.tableOfContents(this.props);
    }

    return (
      <nav aria-labelledby="activityToggle">
        <button
          id="activityToggle"
          onClick={() => { this.props.toggleSidebar(); }}
          className={btnToggleClass}
          aria-pressed={btnAriaPressed}
          aria-expanded={btnAriaExpanded}
          aria-haspopup
          aria-controls="activityList"
        >
          <span>{this.props.localizedStrings.sidebar.activityList}</span>
          <svg
            className={svgSpinClass}
            aria-hidden
            version="1.1"
            width="9.9"
            height="16"
            viewBox="0 0 9.9 16"
            enableBackground="new 0 0 9.9 16"
            xmlSpace="preserve"
          >
            <g transform="translate(-218.000000, -90.000000)">
              <g id="chevron-right" transform="translate(218.500000, 90.000000)">
                <polygon id="Shape" fill="#FFFFFF" points="0,10.6 1.4,12 7.4,6 1.4,0 0,1.4 4.6,6" />
              </g>
            </g>
          </svg>

        </button>
        <div id="activityList" className={sidebarClass}>
          <div className="unit">{unit}</div>
          <div className="subject">{subject}</div>
          <ul>
            {tableOfContents}
          </ul>
        </div>
        <footer>
          <p className="c-release">{footerText}</p>
        </footer>
      </nav>
    );
  }
}
export default connect(select, ApplicationActions)(Sidebar);
