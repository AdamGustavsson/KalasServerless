import 'whatwg-fetch';
import _ from 'lodash';
import { push } from 'react-router-redux';

import { API_URL } from './index';
import {resetError} from './error';

import {
  ERROR,
  CREATE_REMINDER
} from './constants';







export function createReminder(reminder,locale) {
  const query = { "query":
    `mutation createNewReminder {
      reminder: createReminder (
        mobileNumber: "${reminder.mobileNumber}"
        reminderDate: "${reminder.reminderDate}",
        locale: "${locale}"
      )
      {
        id
      }
    }`
  };
  return (dispatch) => {
    dispatch({
      type: CREATE_REMINDER
    });
    return fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

}
