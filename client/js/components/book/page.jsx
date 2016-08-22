"use strict";

import _            from "lodash";
import React        from "react";
import { connect }  from "react-redux";

import * as ContentActions  from "../../actions/content";
import assets               from "../../libs/assets";

const select = (state) => {
  return {
    tableOfContents : state.content.tableOfContents,
    contentName : state.settings.contentName,
    tocMeta: state.content.tocMeta,
    contentPath: state.content.contentPath
  };
};

export class Page extends React.Component {

  onMessage(message) {
    // Inconveniently, we don't seem to be able to locate the
    // assessment-player's iframe inside the content's iframe.  Conventiently,
    // the assessment-player sends a message up to us to indicate its available
    // locales.  Although we ignore the available locales, we use that message's
    // source to target a message back down to the assessment-player.
    const data = message.data;
    const type = data.open_assessments_msg;
    switch(type) {
      case "open_assessments_available_locales":
        message.source.postMessage({
          open_assessments_msg: "open_assessments_set_locale",
          locale: "hi"
        }, "*");
        break;
    }
  }

  componentDidMount() {
    window.addEventListener("message", (e) => this.onMessage(e), false);
  }

  iframe(props) {
    var current = _.find(
      props.tableOfContents,
      (item) => item.id == props.params.pageId
    );
    if(!current) { return; }
    return <iframe src={`${props.contentPath}/${current.content}`} />;
  }

  render() {
    var lastModified = this.props.tocMeta.lastModified;
    var footerText = lastModified ? `CLIx release date: ${lastModified}` : undefined;
    return (
      <div className="c-page">
        {this.iframe(this.props)}
        <div className="c-release">
          {footerText}
        </div>
      </div>
    );
  }
}

export default connect(select, ContentActions)(Page);
