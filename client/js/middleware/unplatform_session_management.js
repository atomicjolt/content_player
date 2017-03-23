import api         from "../libs/api";
import Network     from '../constants/network';
import { DONE }    from "../constants/wrapper";
import { browserHistory } from 'react-router';
import { ANALYTICS_ACTION_MAP } from './analytics_logging';


const SessionExpiration = store => next => action => {

  if(ANALYTICS_ACTION_MAP[action.type]) {
    const state = store.getState();
    // call up to the parent window (unplatform)
    // and trigger it's startSessionCounter()
    window.parent.postMessage('startSessionCounter',
      state.settings.loggingApiUrl);
  }

  // call the next middleWare
  next(action);
};

export { SessionExpiration as default };
