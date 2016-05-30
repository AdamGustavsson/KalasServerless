import 'whatwg-fetch';
import _ from 'lodash';
import { push } from 'react-router-redux';

import { API_URL } from './index';
import {resetError} from './error';


import {
  ERROR,
  GET_INVITES_FOR_PARTY,
  CREATE_INVITE
} from './constants';





export function getInvitesForParty(token,partyId) {
 
 
  const query = { "query":
    `{
      invites_for_party(token: "${token}",partyId: "${partyId}")
      {
        id,
        childName,
        mobileNumber
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: GET_INVITES_FOR_PARTY,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function createInvite(invite, partyId, token) {
  const query = { "query":
      `mutation createNewInvite {
      invite: createInvite (
        childName: "${invite.childName}",
        mobileNumber: "${invite.mobileNumber}",
        partyId: "${partyId}",
        token: "${token}"
      )
      {
        id,
        childName,
        mobileNumber
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: CREATE_INVITE,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}
  
