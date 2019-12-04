/* IRONA Client Program is subject to the terms of the Mozilla Public License 2.0.
 * You can obtain a copy of MPL at LICENSE.md of root directory. */

import React from 'react';
import { initializeIcons } from '@uifabric/icons';
import { Label } from 'office-ui-fabric-react';
import WindowButtonContainer from './WindowButtonContainer';
import WindowButton from './WindowButton';
import './style.scss';

initializeIcons();

const { remote } = window.module.require('electron');
const {
  resizable, maximize, restore,
} = remote.getCurrentWindow();

const killElectron = () => {
  remote.BrowserWindow.getFocusedWindow().close();
};
const minimizeElectron = () => {
  remote.BrowserWindow.getFocusedWindow().minimize();
};

type Props = {
  showLabel?: boolean
}

type States = {
  isMaximized: boolean;
}

export default class TitleBar extends React.Component<Props, States> {
  constructor(props) {
    super(props);

    this.state = { isMaximized: false };

    this.mutateWindow = this.mutateWindow.bind(this);
  }

  mutateWindow() {
    const { isMaximized } = this.state;

    if (isMaximized) {
      this.setState({ isMaximized: false });
      restore();
    } else {
      this.setState({ isMaximized: true });
      maximize();
    }
  }

  render() {
    const { showLabel } = this.props;
    const { isMaximized } = this.state;

    return (
      <div styleName="title-bar">
        {showLabel && <Label styleName="title-bar-label">IRONA</Label>}
        <WindowButtonContainer>
          <WindowButton
            icon="ChromeMinimize"
            onClick={minimizeElectron}
          />
          {
            resizable && (
              <WindowButton
                icon={isMaximized ? 'ChromeRestore' : 'ChromeFullScreen'}
                onClick={this.mutateWindow}
              />
            )
          }
          <WindowButton
            icon="ChromeClose"
            background="red"
            color="white"
            onClick={killElectron}
          />
        </WindowButtonContainer>
      </div>
    );
  }
}
