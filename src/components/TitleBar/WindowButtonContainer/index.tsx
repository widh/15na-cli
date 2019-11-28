import React from 'react';
import './style.scss';

interface Props {
  children?: React.ReactNode
}

export default (props: Props): React.ReactElement<any> => {
  const { children } = props;
  return (<div styleName="window-button-container">{children}</div>);
};
