import { combineReducers } from 'redux';
import { makeReducers } from '../util/saymyname';

import lists from './lists';
import items from './items';
import user from './user';

const reducers = makeReducers({
  lists,
  items,
  user,
});

export default combineReducers(reducers);
