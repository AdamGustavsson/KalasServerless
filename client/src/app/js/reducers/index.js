import { combineReducers } from 'redux';
import {routerReducer } from 'react-router-redux'

import UsersReducer from './users';
import PartiesReducer from './parties';
import InvitesReducer from './invites';
import ReminderReducer from './reminders';
import ErrorReducer from './error';
import PaymentReducer from './payment';
import { i18nReducer } from 'react-redux-i18n';

export default combineReducers({
  users: UsersReducer,
  parties: PartiesReducer,
  invites: InvitesReducer,
  reminders: ReminderReducer,
  error: ErrorReducer,
  routing: routerReducer,
  i18n: i18nReducer,
  payment: PaymentReducer
});
