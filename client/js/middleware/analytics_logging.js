import _              from 'lodash';

import api         from "../libs/api";
import Network     from '../constants/network';
import { DONE }    from "../constants/wrapper";
import {Constants as ApplicationConstants} from '../actions/application';
import {Constants as AnalyticsActions} from '../actions/analytics';

//maps audio/video actions to the analytics logging action
const ANALYTICS_ACTION_MAP = {
  [AnalyticsActions.VIDEO_PLAY]: "play video",
  [AnalyticsActions.VIDEO_PAUSE]: "pause video",
  [AnalyticsActions.VIDEO_SEEKED]: "seek video",
  [AnalyticsActions.VIDEO_ENDED]: "end video",
  [AnalyticsActions.AUDIO_PLAY]: "play audio",
  [AnalyticsActions.AUDIO_PAUSE]: "pause audio",
  [AnalyticsActions.AUDIO_SEEKED]: "seek audio",
  [AnalyticsActions.AUDIO_ENDED]: "end audio",
  [AnalyticsActions.IMAGE_CLICK]: "click image",
  [AnalyticsActions.SELECT_PAGE]: "click nav",
  [AnalyticsActions.LINK_CLICK]: "click link",
  [AnalyticsActions.BUTTON_CLICK]: "click button",
  [AnalyticsActions.TRANSCRIPT_OPEN]: "open transcript",
  [AnalyticsActions.TRANSCRIPT_CLOSE]: "close transcript",
  [ApplicationConstants.SELECT_PAGE]: "click nav"
};

function logEvent(eventData, state) {
  api.execRequest(
    Network.POST,
    state.settings.loggingPath,
    state.settings.loggingApiUrl,
    state.settings.jwt,
    state.settings.csrfToken,
    {},
    eventData
  );
}

const AnalyticsLogging = store => next => action => {
  let state = {};
  let data = {};

  if(ANALYTICS_ACTION_MAP[action.type]) {
    state = store.getState();

    data = {
      action: ANALYTICS_ACTION_MAP[action.type],
      unit: state.content.tocMeta.gradeUnit,
      subject: state.content.tocMeta.subjectLesson,
      activity: state.application.currentPageName,
      sessionId: state.settings.sessionId
    };

    switch (action.type) {
      case ApplicationConstants.SELECT_PAGE:
        data.elementText = action.pageName;
        break;

      case AnalyticsActions.AUDIO_ENDED:
      case AnalyticsActions.VIDEO_ENDED:
      case AnalyticsActions.IMAGE_CLICK:
      case AnalyticsActions.LINK_CLICK:
        data.mediaId = action.mediaId;
        data.source = action.mediaSrc;
        break;

      case AnalyticsActions.VIDEO_PLAY:
      case AnalyticsActions.VIDEO_PAUSE:
      case AnalyticsActions.VIDEO_SEEKED:
      case AnalyticsActions.AUDIO_PLAY:
      case AnalyticsActions.AUDIO_PAUSE:
      case AnalyticsActions.AUDIO_SEEKED:
        data.mediaId = action.mediaId;
        data.source = action.mediaSrc;
        data.mediaTime = action.mediaTime;
        break;

      case AnalyticsActions.BUTTON_CLICK:
        data.mediaId = action.buttonId;
        break;

      case AnalyticsActions.TRANSCRIPT_OPEN:
      case AnalyticsActions.TRANSCRIPT_CLOSE:
        data.elementText = action.elementText;
    }

    logEvent(data, state);
  }

  // call the next middleWare
  next(action);
};

export { AnalyticsLogging as default };
