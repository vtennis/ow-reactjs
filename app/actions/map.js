import fetch from 'isomorphic-fetch';
import mapKeys from 'lodash/mapKeys';

import {
  OW_MAPS_URL
} from '../constants/urls';

export const REQUEST_MAPS = 'REQUEST_MAPS';
export const RECEIVE_MAPS = 'RECEIVE_MAPS';

export function fetchMapsIfNeeded () {
  return (dispatch, getState) => {
    if (shouldFetchMaps(getState())) {
      return dispatch(fetchMaps(OW_MAPS_URL));
    }
  };
}

function shouldFetchMaps (state) {
  // const {
  //   map: {
  //     maps
  //   }
  // } = state;

  // if (maps.isFetching)
  //   return false;
  return true;
}

function fetchMaps (url) {
  return dispatch => {
    dispatch(requestMaps());

    return fetch(url)
      .then(response => {
        const {
          status,
          statusText
        } = response;

        if (status >= 200 && status < 300) {
          return response;
        } else {
          const error = new Error(statusText);
          console.log(`Response returned an error for ${url}: ${error.message}`);

          return Promise.reject(error);
        }
      })
      .then(response => response.json())
      .then(json => dispatch(receiveMaps(json)))
      .catch (error => {
        console.log(`Request failed for ${url}: ${error.message}`);
      });
  }
}

function requestMaps () {
  return {
    type: REQUEST_MAPS
  };
}

function receiveMaps (data) {
  // const cleanedData = mapKeys(data.data, (v, k) => ("" + k).replace(/[-\+'`´\s]+/g, '').toLowerCase());
  // data.data = cleanedData;

  return {
    type: RECEIVE_MAPS,
    data
  };
}