import { combineReducers }  from 'redux';
import settings             from './settings';
import application          from './application';
import jwt                  from './jwt';
import content              from './content';

const rootReducer = combineReducers({
  settings,
  jwt,
  application,
  content
});

export default rootReducer;
