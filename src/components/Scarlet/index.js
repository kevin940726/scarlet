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
    scarlet({
      onTimeUpdate: this.onTimeUpdate,
      onReady: this.onReady,
      onEnd: this.onEnd,
    })
      .then((loadTrack) => {
        this.scarlet = loadTrack;
        this.loadTrack(this.props.playlist[this.state.nowPlaying]);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.nowPlaying !== this.state.nowPlaying) {
      this.loadTrack(this.props.playlist[this.state.nowPlaying]);
    }
  }

  loadTrack = async (url) => {
    this.player = await this.scarlet(url);
    this.setState({
      currentTime: 0,
      duration: 0,
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

  onEnd = () => {
    this.setState(({ nowPlaying }, { playlist }) => ({
      nowPlaying: nowPlaying + 1 >= playlist.length ? nowPlaying : nowPlaying + 1,
    }));
  }

  handleSetVolume = (volume) => {
    if (this.player) {
      this.player.setVolume(volume);
      this.setState({
        volume: this.player.getVolume(),
      });
    }
  }

  handleSeekTo = (time) => {
    if (this.player) {
      this.player.seekTo(time);
      this.setState({
        currentTime: this.player.getCurrentTime(),
      });
    }
  }

  scarlet = {};
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
        seekTo={this.handleSeekTo}
      />
    );
  }
};

export default Player;
