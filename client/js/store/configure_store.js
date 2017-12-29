import { createStore, applyMiddleware, compose } from 'redux';
import { persistState }                          from 'redux-devtools';
import rootReducer                               from '../reducers';
import DevTools                                  from '../dev/dev_tools.jsx';
import API                                       from '../middleware/api';
import EPUB                                      from '../middleware/epub';
import AnalyticsLogging                          from '../middleware/analytics_logging';
import SessionExpiration                         from '../middleware/unplatform_session_management';

let middleware = [ API, EPUB, AnalyticsLogging, SessionExpiration ];

let enhancers = [
  applyMiddleware(...middleware)
];

// In production, we want to use just the middleware.
// In development, we want to use some store enhancers from redux-devtools.
// UglifyJS will eliminate the dead code depending on the build environment.
if (__DEV__){
  enhancers = [
    ...enhancers,
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  ];
}

export default function(initialState){
  const store = compose(...enhancers)(createStore)(rootReducer, initialState);

  if (__DEV__ && module.hot) {
    module.hot.accept(
      '../reducers',
      () => store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}
