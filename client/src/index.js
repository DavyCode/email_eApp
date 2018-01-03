
import 'materialize-css/dist/css/materialize.min.css'

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk'

import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
window.axios = axios;

require ('./styles.css');

const store = createStore(reducers, {},  compose(
    applyMiddleware(reduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

render( 
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
);

