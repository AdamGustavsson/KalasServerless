import { combineReducers } from 'redux';
import {routerReducer } from 'react-router-redux'

import UsersReducer from './users';
import PartiesReducer from './parties';
import InvitesReducer from './invites';
import ErrorReducer from './error';

export default combineReducers({
  users: UsersReducer,
  parties: PartiesReducer,
  invites: InvitesReducer,
  error: ErrorReducer,
  routing: routerReducer
});

