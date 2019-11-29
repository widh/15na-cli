import React from 'react';
import { Text } from 'office-ui-fabric-react';

import TextSection from './TextSection';
import './style.scss';

interface RegisterInfo {
  name: string
  areaCount: number
  connected: number
}

interface Props {
  regInfo: RegisterInfo
  hostURL: string
  io: any
}

type States = {
  connectedAPCount: number
}

export default class StatusPanel extends React.Component<Props, States> {
  constructor(props) {
    super(props);
    this.state = { connectedAPCount: Number(props.regInfo.connected) };

    const { io } = props;
    io.on('updateAPCount', (data) => {
      try {
        const change = JSON.parse(data);
        if (Number.isNaN(Number(change))) {
          console.error('Change is not number.');
        } else {
          const { connectedAPCount } = this.state;
          this.setState({ connectedAPCount: connectedAPCount + Number(change) });
        }
      } catch {
        console.error('Failed to parse APCount data.');
      }
    });
  }

  render() {
    const { connectedAPCount } = this.state;
    const { hostURL, regInfo } = this.props;
    const { name, areaCount } = regInfo;

    return (
      <div styleName="statusPanel">
        <div>
          <TextSection
            upperText="Hello,"
            lowerText={name}
          />
          <TextSection
            upperText="Managing Area #"
            lowerText={areaCount.toString()}
            lowerTextSize="mega"
          />
          <TextSection
            upperText="Working AP #"
            lowerText={connectedAPCount.toString()}
            lowerTextSize="mega"
          />
        </div>
        <div styleName="generalText">
          <Text>
            <span>Central Host : </span>
            <span styleName="generalHighlightText">{hostURL}</span>
          </Text>
        </div>
      </div>
    );
  }
}
