import { combineReducers } from 'redux';
import { toArray } from 'lodash';

import {
  REQUEST_HEROES,
  RECEIVE_HEROES
} from '../actions/riot';
const initialState = {
  isFetching: false,
  data: null
};

function heroes (state = initialState, action) {
  switch (action.type) {
    case REQUEST_HEROES:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_HEROES:
      return {
        ...state,
        isFetching: false,
        _map: action.data.data,
        _array: toArray(action.data.data)
      };
    default:
      return state;
  }
}

const riot = combineReducers({
  heroes
});

export default riot;