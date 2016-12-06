"use strict";

import _                          from "lodash";
import React                      from "react";
import { connect }                from "react-redux";

import * as ContentActions        from "../../actions/content";
import * as AnalyticsActions from "../../actions/analytics";
import assets                     from "../../libs/assets";

const select = (state) => {
  let lang = state.content.tocMeta.language;
  return {
    tableOfContents:  state.content.tableOfContents,
    contentName:      state.settings.contentName,
    tocMeta:          state.content.tocMeta,
    contentPath:      state.content.contentPath,
    locale:           lang
  };
};

export class Page extends React.Component {

  scrollToAssessment(){
    var pubFrame = document.getElementsByTagName('iframe')[0];
    var epubBody = pubFrame.contentDocument.body;
    if(!epubBody){ return; }

    var quizIframe = pubFrame.contentDocument.getElementById('openassessments_container');
    if(!quizIframe){ return; }

    var quizTop = quizIframe.getBoundingClientRect().top;
    epubBody.scrollTop += quizTop;
  }


  onMessage(message) {
    // Inconveniently, we don't seem to be able to locate the
    // assessment-player's iframe inside the content's iframe.  Conventiently,
    // the assessment-player sends a message up to us to indicate its available
    // locales.  Although we ignore the available locales, we use that message's
    // source to target a message back down to the assessment-player.
    var data = message.data;
    if(_.isString(message.data)){
      data = JSON.parse(message.data);
    }
    const type = data.open_assessments_msg;

    switch(type) {
      case "open_assessments_available_locales":
        message.source.postMessage({
          open_assessments_msg: "open_assessments_set_locale",
          locale: this.props.locale
        }, "*");
        break;
      case "scrollToTop":
        this.scrollToAssessment();
        break;
    }
  }

  componentDidMount() {
    window.addEventListener("message", (e) => this.onMessage(e), false);
  }

  /* We need to listen to video/audio play and pause events and click events on
   * images inside the iframe.
   */
  addIframeEventListeners() {
    let iframeDocument = this.contentIframe.contentDocument ||
        this.contentIframe.contentWindow.document;

    let videoElements = iframeDocument.querySelectorAll('video');
    _.each(videoElements, (element) => {
      element.addEventListener('play', (e) => {
        this.props.videoPlay(e.target.id, e.target.src, e.target.currentTime);
      }, false);

      element.addEventListener('pause', (e) => {
        if(!e.target.ended) {
          this.props.videoPause(e.target.id, e.target.src, e.target.currentTime);
        }
      }, false);

      element.addEventListener('seeked', (e) => {
        this.props.videoSeeked(e.target.id, e.target.src, e.target.currentTime);
      }, false);

      element.addEventListener('ended', (e) => {
        this.props.videoEnded(e.target.id, e.target.src);
      }, false);
    });

    let audioElements = iframeDocument.querySelectorAll('audio');
    _.each(audioElements, (element) => {
      element.addEventListener('play', (e) => {
        this.props.audioPlay(e.target.id, e.target.src, e.target.currentTime);
      }, false);

      element.addEventListener('pause', (e) => {
        if(!e.target.ended) {
          this.props.audioPause(e.target.id, e.target.src, e.target.currentTime);
        }
      }, false);

      element.addEventListener('seeked', (e) => {
        this.props.audioSeeked(e.target.id, e.target.src, e.target.currentTime);
      }, false);

      element.addEventListener('ended', (e) => {
        this.props.audioEnded(e.target.id, e.target.src);
      }, false);
    });

    let imgElements = iframeDocument.querySelectorAll('img.zoom-but-sm, img.zoom-but-md');
    _.each(imgElements, (element) => {
      element.addEventListener('click', (e) => {
        this.props.imageClick(e.target.id, e.target.src);
      }, false);
    });

    let linkElements = iframeDocument.querySelectorAll('a');
    _.each(linkElements, (element) => {
      element.addEventListener('click', (e) => {
        this.props.linkClick(e.target.id, e.target.src);
      }, false);
    });

    let buttonElements = iframeDocument.querySelectorAll('figure button');
    _.each(buttonElements, (element) => {
      element.addEventListener('click', (e) => {
        this.props.buttonClick(e.target.id);
      }, false);
    });

    let transcriptButtons = iframeDocument.querySelectorAll('.trans-form input');
    _.each(transcriptButtons, (element) => {
      let label = element.parentElement.querySelector('label');
      let labelName = label ? label.textContent : "";

      element.addEventListener('change', (e) => {
        if(e.target.checked) {
          this.props.openTranscript(labelName);
        } else {
          this.props.closeTranscript(labelName);
        }
      }, false);
    });
  }

  iframe(props) {
    var current = _.find(
      props.tableOfContents,
      (item) => item.id == props.params.pageId
    );
    if(!current) { return; }
    return <iframe
      onLoad={() => this.addIframeEventListeners()}
      ref={(iframe) => this.contentIframe = iframe }
      src={`${props.contentPath}/${current.content}`}
      allowFullScreen="true" />;
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

export default connect(select, {...ContentActions, ...AnalyticsActions})(Page);
