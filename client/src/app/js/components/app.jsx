import React from 'react';
import { Component } from 'react';

import Error from './shared/error';
import Header from './shared/header';

// import I18n from "redux-i18n";
import { translationsObject } from "./translations/translations";

import { createStore, combineReducers } from 'redux';
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';
import reducers from './../reducers';

export default class App extends Component {
  render() {
    console.log('Im in');
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

const store =  createStore(
    combineReducers({
      ...reducers,
      i18n: i18nReducer
    })
);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translationsObject));
store.dispatch(setLocale('sv'));