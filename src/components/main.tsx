import React from 'react';
import ReactDOM from 'react-dom';

import { loadTheme } from 'office-ui-fabric-react';

import MainPage from './MainPage';
import TitleBar from './TitleBar';

import * as theme from './theme';
import './style.scss';

// Add theming features
declare global { interface Window { IRONA: any; } }
window.IRONA = {};
window.IRONA.setDevPort = (port: number) : void => {
  window.IRONA.port = port;
};
window.IRONA.applyPalette = () : void => {
  loadTheme(theme[document.body.dataset.theme]);
};
window.IRONA.changeTheme = () : void => {
  if (document.body.dataset.theme === 'dark') {
    document.body.dataset.theme = 'light';
  } else {
    document.body.dataset.theme = 'dark';
  }
  window.IRONA.applyPalette();
};
window.IRONA.setFocus = (isFocused: boolean) : void => {
  if (isFocused) {
    document.body.dataset.focus = 'in';
  } else {
    document.body.dataset.focus = 'out';
  }
};

// Set main theme
const { remote } = window.module.require('electron');
document.body.dataset.theme = remote.nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
window.IRONA.applyPalette();

// Render main DOM
const primClient = document.getElementById('primClient');
ReactDOM.render(
  <div styleName="client">
    <TitleBar showLabel />
    <MainPage />
  </div>,
  primClient,
);
