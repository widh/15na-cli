import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class WindowButtonContainerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <div className="window-button-container">
        {children}
      </div>
    );
  }
}

WindowButtonContainerView.propTypes = {
  children: PropTypes.node.isRequired,
};
