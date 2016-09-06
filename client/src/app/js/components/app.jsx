import React from 'react';
import { Component } from 'react';

import Error from './shared/error';
import Header from './shared/header';

// import I18n from "redux-i18n";
import { translationsObject } from "./translations/translations";

import { createStore, combineReducers } from 'redux';

import reducers from './../reducers';

export default class App extends Component {
  render() {
    return (
          <div>
              <Header />
              <div className="container">
                  <Error />
                  {this.props.children}
                </div>
          </div>
    );
  }
}
