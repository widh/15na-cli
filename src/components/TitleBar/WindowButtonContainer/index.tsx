/* IRONA Client Program is subject to the terms of the Mozilla Public License 2.0.
 * You can obtain a copy of MPL at LICENSE.md of root directory. */

import React from 'react';
import './style.scss';

interface Props {
  children?: React.ReactNode
}

export default (props: Props): React.ReactElement<any> => {
  const { children } = props;
  return (<div styleName="window-button-container">{children}</div>);
};
