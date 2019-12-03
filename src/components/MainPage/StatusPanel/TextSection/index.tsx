/* IRONA Client Program is subject to the terms of the Mozilla Public License 2.0.
 * You can obtain a copy of MPL at LICENSE.md of root directory. */

import React from 'react';
import { Text } from 'office-ui-fabric-react';
import './style.scss';

interface Props {
  upperText: string
  lowerText: string
  lowerTextSize?: 'xxLarge' | 'mega'
}

export default class StatusPanel extends React.Component<Props, {}> {
  static defaultProps = {
    lowerTextSize: 'xxLarge',
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { upperText, lowerText, lowerTextSize } = this.props;

    return (
      <div styleName="textSection">
        <Text variant="mediumPlus" styleName="upperText">{upperText}</Text>
        <Text variant={lowerTextSize} styleName="lowerText">{lowerText}</Text>
      </div>
    );
  }
}
