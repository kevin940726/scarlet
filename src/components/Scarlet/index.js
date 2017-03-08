import React, { PureComponent, PropTypes } from 'react';
import Player from '../Player';
import DefaultTheme from '../Theme';
import setPlayer from '../../core/player';

class Scarlet extends PureComponent {
  static defaultProps = {
    children: methods => <DefaultTheme {...methods} />,
  }

  static propTypes = {
    playlist: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.func,
  };

  state = {
    nowPlaying: 0,
    duration: 0,
    currentTime: 0,
  };

  onTimeUpdate = () => {
    this.setState({
      currentTime: this.player.getCurrentTime(),
    });
  }

  getCurrentTime = () => this.player && this.player.getCurrentTime();

  getDuration = () => this.player && this.player.duration;

  play = () => {
    if (this.player) this.player.play();
  }

  pause = () => {
    if (this.player) this.player.pause();
  }

  refCallback = (metadata = {}) => (player, type) => {
    this.player = setPlayer(player, type, metadata);
    this.setState({
      duration: this.player.getDuration(),
    });
  }

  player = null;

  render() {
    const { playlist, children } = this.props;
    const { nowPlaying, currentTime, duration } = this.state;

    const methods = {
      onTimeUpdate: this.onTimeUpdate,
      play: this.play,
      pause: this.pause,
      currentTime,
      duration,
    };

    return (
      <div>
        <Player
          url={playlist[nowPlaying]}
          refCallback={this.refCallback}
          onTimeUpdate={this.onTimeUpdate}
        />
        {children(methods)}
      </div>

    );
  }
}

export default Scarlet;
