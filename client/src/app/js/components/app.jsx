import React from 'react';
import { Component } from 'react';

import Error from './shared/error';
import Header from './shared/header';
import Helmet from "react-helmet";
import { Translate, I18n } from 'react-redux-i18n';

// import I18n from "redux-i18n";
import { translationsObject } from "./translations/translations";

import { createStore, combineReducers } from 'redux';

import reducers from './../reducers';

export default class App extends Component {
  render() {
    return (
          <div>
              <Helmet title={I18n.t('landingPage.title')} />
              <Header />
              <div className="container">
                  <Error />
                  {this.props.children}
                </div>
          </div>
    );
  }
}
