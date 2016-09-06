import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { translationsObject } from "./components/translations/translations";

import { loadTranslations, setLocale, syncTranslationWithStore} from 'react-redux-i18n';

import store from './store';
import routes from './routes';

const history = syncHistoryWithStore(hashHistory, store);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translationsObject));
store.dispatch(setLocale((localStorage.getItem("locale")?localStorage.getItem("locale"):"sv")));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
  , document.getElementById('root')
);
