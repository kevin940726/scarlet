import React, { Component, PropTypes } from 'react';
import Player from '../Player';
import DefaultTheme from '../Theme';
import setPlayer from '../../core/player';

class Scarlet extends Component {
  static defaultProps = {
    children: methods => <DefaultTheme {...methods} />,
  }

  static propTypes = {
    playlist: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.func,
  };

  state = {
    nowPlaying: 0,
  };

  refCallback = (player, type) => {
    this.player = setPlayer(player, type);
  }

  play = () => {
    if (this.player) this.player.play();
  }

  pause = () => {
    if (this.player) this.player.pause();
  }

  player = null;

  render() {
    const { playlist, children } = this.props;
    const { nowPlaying } = this.state;

    const methods = {
      play: this.play,
      pause: this.pause,
    };

    return (
      <div>
        <Player
          url={playlist[nowPlaying]}
          refCallback={this.refCallback}
          {...methods}
        />
        {children(methods)}
      </div>

    );
  }
}

export default Scarlet;
