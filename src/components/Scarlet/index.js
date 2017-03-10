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
    volume: 100,
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
      volume: this.player.getVolume(),
    });
  }

  onTimeUpdate = () => {
    this.setState({
      currentTime: this.player.getCurrentTime(),
    });
  }

  handleSetVolume = (volume) => {
    if (this.player) {
      this.player.setVolume(volume);
      this.setState({
        volume: this.player.getVolume(),
      });
    }
  }

  player = {};

  render() {
    const {
      currentTime,
      duration,
      volume,
    } = this.state;

    const {
      title,
      play,
      pause,
    } = this.player;

    return (
      <Theme
        title={title}
        play={play}
        pause={pause}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        setVolume={this.handleSetVolume}
      />
    );
  }
};

export default Player;
