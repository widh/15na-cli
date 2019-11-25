import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import Main from './components/Main';
import TitleBar from './components/TitleBar';

const store = createStore(reducers);
const { remote } = window.module.require('electron');
const client = document.getElementById('client');
client.dataset.theme = remote.nativeTheme.shouldUseDarkColors ? 'dark' : 'light';

ReactDOM.render(
  <Provider store={store}>
    <TitleBar />
    <Main />
  </Provider>,
  client,
);
