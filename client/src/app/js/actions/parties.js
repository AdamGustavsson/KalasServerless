import 'whatwg-fetch';
import _ from 'lodash';
import { push } from 'react-router-redux';

import { API_URL } from './index';
import {resetError} from './error';

import {
  ERROR,
  GET_PARTIES,
  GET_PARTY,
  CREATE_PARTY
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
        partyLocation
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
    
export function createParty(party,token) {
  const query = { "query":
    `mutation createNewParty {
      party: createParty (
        header: "${party.header}",
        description: "${party.description}",
        childName: "${party.childName}",
        startDateTime: "${party.startDateTime}",
        endDateTime: "${party.endDateTime}",
        partyLocation: "${party.partyLocation}"
        token: "${token}"
      )
      {
        id
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
    type: CREATE_PARTY,
    payload: json
  }))
  .then((response) => dispatch(push(`parties/${response.payload.data.party.id}/show`)))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}
