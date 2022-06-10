import React from "react";
import * as ReactDOM from "react-dom";
//import { stopReportingRuntimeErrors } from 'react-error-overlay';
import { Provider } from 'react-redux'; //access store from global state 
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

//fixed error in package.json by adding "react-error-overlay": "6.0.7" to devDependencies