import { loadItems, unloadItems } from './items';
import reducer from '../reducers/lists';
import user from '../reducers/user';
import * as api from '../util/api';
import { generateId } from '../util/id';
import { navigate } from '../util/history';

import {
  getKey,
  generateKey,
  exportKey,
  importKey,
  encryptObject,
  decryptObject,
} from '../util/crypt';

const LISTS_KEY = 'LISTS';

async function save({ lists }) {
  let key = getKey(LISTS_KEY);

  if (!key) {
    key = await generateKey(LISTS_KEY);
  }

  const k = await exportKey(LISTS_KEY);
  const data = await encryptObject(lists, key);

  const encData = JSON.stringify({ k, data });

  localStorage.setItem(LISTS_KEY, encData);
  api.post('lists', { data: encData });
}

export const loadLists = () => async (dispatch) => {
  const rawData = localStorage.getItem(LISTS_KEY);

  if (!rawData) {
    return;
  }

  try {
    const { k, data } = JSON.parse(rawData);
    const key = await importKey(LISTS_KEY, k);

    /* eslint-disable no-console */
    const localLists = await decryptObject(data, key);
    console.log('++ localLists', localLists);

    const { data: rData } = await api.get('lists');

    const serverLists = await decryptObject(rData, key);
    console.log('+++ serverLists', serverLists);

    // TODO: merge lists
    const lists = serverLists;

    dispatch(reducer.loadLists(lists));
    dispatch(loadItems(lists.map(({ $id }) => $id)));
  } catch (e) {
    dispatch(user.setMasterPassword(e));
  }
};

export const unloadLists = () => (dispatch, getState) => {
  const { lists } = getState();
  dispatch(reducer.loadLists([]));
  localStorage.removeItem(LISTS_KEY);

  dispatch(unloadItems(lists.map(({ $id }) => $id)));
};

export const addList = payload => (dispatch, getState) => {
  const $id = generateId();
  dispatch(reducer.addList($id, api.getTime(), payload));
  navigate(`/lists/${$id}/edit`, null, true);
  save(getState());
};

export const updateList = ($id, payload) => (dispatch, getState) => {
  dispatch(reducer.updateList($id, api.getTime(), payload));
  save(getState());
};

export const deleteList = $id => (dispatch, getState) => {
  dispatch(reducer.deleteList($id));
  save(getState());
};
