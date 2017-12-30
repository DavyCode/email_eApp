import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App'
import reducers from './reducers'

const store = createStore(reducers, {}, applyMiddleware())

render( 
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
);

