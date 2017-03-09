import React, { PureComponent, PropTypes } from 'react';
import scarlet from '../../core/scarlet';
import DefaultTheme from '../Theme';

const Player = (Theme = DefaultTheme) => class Scarlet extends PureComponent {
  static propTypes = {
    playlist: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  state = {
    nowPlaying: 0,
    currentTime: 0,
    duration: 0,
  };

  componentDidMount() {
    scarlet(this.props.playlist[this.state.nowPlaying], {
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
      title,
      play,
      pause,
    } = this.player;

    return (
      <Theme
        title={title}
        currentTime={currentTime}
        duration={duration}
        play={play}
        pause={pause}
      />
    );
  }
};

export default Player;
