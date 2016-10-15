import 'whatwg-fetch';
import _ from 'lodash';
import { push } from 'react-router-redux';

import { API_URL } from './index';
import {resetError} from './error';

import {
  ERROR,
  GET_PARTIES,
  GET_PARTY,
  CREATE_PARTY,
  UPDATE_PARTY,
  THEME_PARTY
} from './constants';





export function getMyParties(token) {
  const query = { "query":
    `{
      users_parties(token: "${token}") {
            id,
            header,
            childName,
            startDateTime
            }
    }`
  };
  console.log(token);
  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: GET_PARTIES,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function getParty(id) {
  const query = { "query":
    `{
      party(id: "${id}")
      {
        id,
        header,
        description,
        childName,
        startDateTime,
        endDateTime,
        partyLocation,
        hostUser,
        theme
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: GET_PARTY,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function createParty(party,locale) {
  party.description = party.description.replace(/(\r\n|\n|\r)/gm," ");
  const query = { "query":
    `mutation createNewParty {
      party: createParty (
        hostUser: "${party.hostUser}",
        header: "${party.header}",
        description: "${party.description}",
        childName: "${party.childName}",
        startDateTime: "${party.startDateTime}",
        endDateTime: "${party.endDateTime}",
        partyLocation: "${party.partyLocation}",
        locale: "${locale}"
      )
      {
        id
      }
    }`
  };
  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: CREATE_PARTY,
    payload: json
  }))
  .then((response) => dispatch(push(`p/${response.payload.data.party.id}`)))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function updateParty(party) {
  const query = { "query":
    `mutation updateTheParty {
      party: updateParty (
        id: "${party.id}",
        ${party.header?'header: "' + party.header +'"':''}
        ${party.description?'description: "' + party.description +'"':''}
        ${party.childName?'childName: "' + party.childName +'"':''}
        ${party.startDateTime?'startDateTime: "' + party.startDateTime +'"':''}
        ${party.endDateTime?'endDateTime: "' + party.endDateTime +'"':''}
        ${party.partyLocation?'partyLocation: "' + party.partyLocation +'"':''}
      )
      {
        id,
        header,
        description,
        childName,
        startDateTime,
        endDateTime,
        partyLocation,
        theme
      }
    }`
  };

  return (dispatch) => {fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(payload => dispatch({payload: payload, type: UPDATE_PARTY}))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
  }
}

export function setThemeOnParty(id,theme) {
  const query = { "query":
    `mutation setThemeOnParty {
      party: setThemeOnParty (
        id: "${id}",
        theme: "${theme}"
      )
      {
        id
      }
    }`
  };
  return (dispatch) => {
    dispatch({
      type: THEME_PARTY,
      theme: theme
    });
    return fetch(`${API_URL}/data/`, {
      method: 'POST',
      body: JSON.stringify(query)
    }).catch(exception => dispatch({
        type: ERROR,
        payload: exception.message
      }));
  }
}
