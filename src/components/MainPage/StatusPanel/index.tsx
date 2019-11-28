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
}

export default (props: Props) => {
  const { hostURL, regInfo } = props;
  const { name, areaCount, connected } = regInfo;

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
          lowerText={connected.toString()}
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
};
