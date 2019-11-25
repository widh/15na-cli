import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'office-ui-fabric-react';
import './style.scss';

export default class WindowButtonView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hover: false, push: false };

    // Bind functions
    this.hoverOn = this.hoverOn.bind(this);
    this.hoverOff = this.hoverOff.bind(this);
    this.pushOn = this.pushOn.bind(this);
    this.pushOff = this.pushOff.bind(this);
  }

  hoverOn() { this.setState({ hover: true }); }

  hoverOff() { this.setState({ hover: false, push: false }); }

  pushOn() { this.setState({ push: true, hover: true }); }

  pushOff() { this.setState({ push: false }); }

  render() {
    const {
      onClick, icon, background, color,
    } = this.props;
    const { hover, push } = this.state;
    const buttonStyle = {
      backgroundColor: hover ? background : 'transparent',
      color: hover ? color : 'var(--fore-color)',
      opacity: push ? 0.8 : 1,
    };
    return (
      <button
        className="window-button"
        type="button"
        style={buttonStyle}
        onMouseOver={this.hoverOn}
        onMouseOut={this.hoverOff}
        onFocus={this.hoverOn}
        onBlur={this.hoverOff}
        onMouseDown={this.pushOn}
        onMouseUp={this.pushOff}
        onClick={onClick}
      >
        <Icon iconName={icon} />
      </button>
    );
  }
}

WindowButtonView.propTypes = {
  icon: PropTypes.string.isRequired,
  background: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

const { remote } = window.module.require('electron');
WindowButtonView.defaultProps = {
  background: 'rgba(164, 164, 164, .5)',
  color: remote.nativeTheme.shouldUseDarkColors ? 'white' : 'black',
};
