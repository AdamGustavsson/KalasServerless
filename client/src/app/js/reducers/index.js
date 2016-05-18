import { combineReducers } from 'redux';
import {routerReducer } from 'react-router-redux'

import UsersReducer from './users';
import PartiesReducer from './parties';
import ErrorReducer from './error';

export default combineReducers({
  users: UsersReducer,
  parties: PartiesReducer,
  error: ErrorReducer,
  routing: routerReducer
});

