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

type Props = {
  showLabel?: boolean
}

export default (props: Props) => {
  const { showLabel } = props;

  return (
    <div styleName="title-bar">
      {showLabel && <Label styleName="title-bar-label">IRONA</Label>}
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
};
