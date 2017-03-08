import React, { Component, PropTypes } from 'react';
import scarlet from '../../core/scarlet';
import DefaultTheme from '../Theme';

const Player = (Theme = DefaultTheme) => class extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
  };

  state = {
    currentTime: 0,
    duration: 0,
  };

  componentDidMount() {
    scarlet(this.props.url, {
      onTimeUpdate: this.onTimeUpdate,
      onReady: this.onReady,
    })
      .then((player) => {
        this.player = player;
      });
  }

  onReady = () => {
    this.setState({
      duration: this.player.getDuration(),
    });
  }

  onTimeUpdate = () => {
    this.setState({
      currentTime: this.player.getCurrentTime(),
    });
  }

  player = {};

  render() {
    const {
      currentTime,
      duration,
    } = this.state;

    const {
      play,
      pause,
    } = this.player;

    return (
      <Theme
        currentTime={currentTime}
        duration={duration}
        play={play}
        pause={pause}
      />
    );
  }
};

export default Player;
