"use strict";

import wrapper from "../constants/wrapper";

export const Constants = wrapper([],[
  "AUDIO_PLAY",
  "AUDIO_RECORD_START",
  "AUDIO_RECORD_STOP",
  "AUDIO_PAUSE",
  "AUDIO_SEEKED",
  "AUDIO_ENDED",
  "VIDEO_PLAY",
  "VIDEO_PAUSE",
  "VIDEO_SEEKED",
  "VIDEO_ENDED",
  "MEDIA_CLICK",
  "LINK_CLICK",
  "BUTTON_CLICK",
  "IMAGE_CLICK",
  "TRANSCRIPT_OPEN",
  "TRANSCRIPT_CLOSE"
]);

export function audioPlay(mediaId, mediaSrc, mediaTime) {
  return {
    type: Constants.AUDIO_PLAY,
    mediaId,
    mediaSrc,
    mediaTime
  };
}

export function audioPause(mediaId, mediaSrc, mediaTime) {
  return {
    type: Constants.AUDIO_PAUSE,
    mediaId,
    mediaSrc,
    mediaTime
  };
}

export function audioSeeked(mediaId, mediaSrc, mediaTime) {
  return {
    type: Constants.AUDIO_SEEKED,
    mediaId,
    mediaSrc,
    mediaTime
  };
}

export function audioEnded(mediaId, mediaSrc) {
  return {
    type: Constants.AUDIO_ENDED,
    mediaId,
    mediaSrc
  };
}

export function videoPlay(mediaId, mediaSrc, mediaTime) {
  return {
    type: Constants.VIDEO_PLAY,
    mediaId,
    mediaSrc,
    mediaTime
  };
}

export function videoPause(mediaId, mediaSrc, mediaTime) {
  return {
    type: Constants.VIDEO_PAUSE,
    mediaId,
    mediaSrc,
    mediaTime
  };
}

export function videoSeeked(mediaId, mediaSrc, mediaTime) {
  return {
    type: Constants.VIDEO_SEEKED,
    mediaId,
    mediaSrc,
    mediaTime
  };
}

export function videoEnded(mediaId, mediaSrc) {
  return {
    type: Constants.VIDEO_ENDED,
    mediaId,
    mediaSrc
  };
}

export function imageClick(mediaId, mediaSrc) {
  return {
    type: Constants.IMAGE_CLICK,
    mediaId,
    mediaSrc
  };
}

export function linkClick(linkId, linkSrc) {
  return {
    type: Constants.LINK_CLICK,
    linkId,
    linkSrc
  };
}

export function buttonClick(buttonId) {
  return {
    type: Constants.BUTTON_CLICK,
    buttonId
  };
}

export function openTranscript(elementText) {
  return {
    type: Constants.TRANSCRIPT_OPEN,
    elementText
  };
}

export function closeTranscript(elementText) {
  return {
    type: Constants.TRANSCRIPT_CLOSE,
    elementText
  };
}
