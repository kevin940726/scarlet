import React, { PureComponent, PropTypes } from 'react';
import scarlet from '../../core/scarlet';
import DefaultTheme from '../Theme';

class Scarlet extends PureComponent {
  static defaultProps = {
    isAutoPlay: true,
    children: props => <DefaultTheme {...props} />,
  };

  static propTypes = {
    playlist: PropTypes.arrayOf(PropTypes.string).isRequired,
    isAutoPlay: PropTypes.bool,
    children: PropTypes.func,
    youtubeApiKey: PropTypes.string.isRequired,
    soundcloudClientId: PropTypes.string.isRequired,
  };

  state = {
    nowPlaying: 0,
    currentTime: 0,
    duration: 0,
    volume: 100,
    isLoading: true,
  };

  componentDidMount() {
    scarlet({
      onTimeUpdate: this.timeRef ?
        (this.timeRef.props.onTimeUpdate || this.timeRef.onTimeUpdate) :
        this.onTimeUpdate,
      // if there is timeRef specified, use it, otherwise use the state of this component
      onReady: this.onReady,
      onEnd: this.onEnd,
      onDurationReady: this.onDurationReady,
    }, {
      youtubeApiKey: this.props.youtubeApiKey,
      soundcloudClientId: this.props.soundcloudClientId,
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

  // the ref callback function on the component which implement `onTimeUpdate` function (optional)
  onTimeRefCallback = (ref) => {
    this.timeRef = ref;
  }

  onReady = () => {
    this.setState({
      duration: this.player.getDuration(),
      volume: this.player.getVolume(),
      isLoading: false,
    });

    if (this.props.isAutoPlay) {
      this.player.play();
    }
  }

  onDurationReady = () => {
    this.setState({
      duration: this.player.getDuration(),
    });
  }

  onTimeUpdate = () => {
    this.setState({
      currentTime: this.player.getCurrentTime(),
    });
  }

  onEnd = () => {
    this.nextTrack();
  }

  loadTrack = async (url) => {
    this.setState({
      isLoading: true,
    });
    this.player = await this.scarlet(url);
    this.setState({
      currentTime: 0,
      duration: 0,
    });
  }

  nextTrack = () => {
    this.setState(({ nowPlaying }, { playlist }) => ({
      nowPlaying: nowPlaying + 1 >= playlist.length ? 0 : nowPlaying + 1,
    }));
  }

  prevTrack = () => {
    this.setState(({ nowPlaying }, { playlist }) => ({
      nowPlaying: nowPlaying - 1 < 0 ? playlist.length - 1 : nowPlaying - 1,
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

  // the ref of the component which implement `onTimeUpdate`
  timeRef = null;

  render() {
    const {
      currentTime,
      duration,
      volume,
      isLoading,
    } = this.state;

    const {
      title,
      play,
      pause,
      stop,
      getCurrentTime,
    } = this.player;

    const themeProps = {
      isLoading,
      title,
      play,
      pause,
      stop,
      currentTime,
      getCurrentTime,
      duration,
      volume,
      setVolume: this.handleSetVolume,
      seekTo: this.handleSeekTo,
      prevTrack: this.prevTrack,
      nextTrack: this.nextTrack,
      onTimeRefCallback: this.onTimeRefCallback,
    };

    return this.props.children(themeProps);
  }
}

export default Scarlet;
