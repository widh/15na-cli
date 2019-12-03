/* IRONA Client Program is subject to the terms of the Mozilla Public License 2.0.
 * You can obtain a copy of MPL at LICENSE.md of root directory. */

import React from 'react';
import { hot } from 'react-hot-loader';
import { Text, CompoundButton } from 'office-ui-fabric-react';

import './style.scss';

// Prepare information input
declare global { interface Window { IRONA: any; } }
window.IRONA = {};
window.IRONA.setFallInformation = (rawJSON: string): void => {
  const info = JSON.parse(rawJSON);
  document.getElementById('fallLoc').innerHTML = info.loc;
  document.getElementById('fallProb').innerHTML = info.prob.toString();
};

type States = {

}

class AlertPage extends React.Component<{}, States> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main styleName="alertPage">
        <div styleName="fallTextContainer">
          <Text id="fallLoc" styleName="fallText" variant="mega">...</Text>
          <Text id="fallProb" styleName="fallText fallProb" variant="xxLarge">0....</Text>
        </div>
        <Text variant="mediumPlus" styleName="fallMessage">A fall is detected.</Text>
        <CompoundButton
          secondaryText="All accidents are resolved."
          onClick={window.close}
          styleName="fallButton"
        >
          Okay
        </CompoundButton>
        <audio src="./beep.wav" autoPlay />
      </main>
    );
  }
}

export default hot(module)(AlertPage);
