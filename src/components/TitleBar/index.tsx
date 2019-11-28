import React from 'react';
import { initializeIcons } from '@uifabric/icons';
import { Label } from 'office-ui-fabric-react';
import WindowButtonContainer from './WindowButtonContainer';
import WindowButton from './WindowButton';
import './style.scss';

initializeIcons();

const { remote } = window.module.require('electron');
const killElectron = () => {
  remote.BrowserWindow.getFocusedWindow().close();
};
const minimizeElectron = () => {
  remote.BrowserWindow.getFocusedWindow().minimize();
};

export default () => (
  <div styleName="title-bar">
    <Label styleName="title-bar-label">IRONA</Label>
    <WindowButtonContainer>
      <WindowButton
        icon="ChromeMinimize"
        onClick={minimizeElectron}
      />
      <WindowButton
        icon="ChromeClose"
        background="red"
        color="white"
        onClick={killElectron}
      />
    </WindowButtonContainer>
  </div>
);
