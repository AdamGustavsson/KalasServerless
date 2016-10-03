import { createStore, applyMiddleware, compose } from 'redux';
import { hashHistory} from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const middlewares = [thunk, routerMiddleware(hashHistory)];

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  middlewares.push(createLogger());
}

const createStoreWithMiddleware = compose(
  applyMiddleware(...middlewares),
  devTools
)(createStore);

export default createStoreWithMiddleware(reducers);
