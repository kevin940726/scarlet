import React, { PureComponent, PropTypes } from 'react';
import scarlet from '../../core/scarlet';
import DefaultTheme from '../Theme';

class Scarlet extends PureComponent {
  static defaultProps = {
    isAutoPlay: true,
    children: props => <DefaultTheme {...props} />,
    onReady: null,
    onDurationReady: null,
    onTimeUpdate: null,
    onEnd: null,
  };

  static propTypes = {
    playlist: PropTypes.arrayOf(PropTypes.string).isRequired,
    isAutoPlay: PropTypes.bool,
    children: PropTypes.func,
    youtubeApiKey: PropTypes.string.isRequired,
    soundcloudClientId: PropTypes.string.isRequired,
    onReady: PropTypes.func,
    onDurationReady: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onEnd: PropTypes.func,
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

    if (typeof this.props.onReady === 'function') {
      this.props.onReady(this.player);
    }
  }

  onDurationReady = () => {
    const duration = this.player.getDuration();

    this.setState({ duration });

    if (typeof this.props.onDurationReady === 'function') {
      this.props.onDurationReady(duration);
    }
  }

  onTimeUpdate = () => {
    const currentTime = this.player.getCurrentTime();

    this.setState({ currentTime });

    if (typeof this.props.onTimeUpdate === 'function') {
      this.props.onTimeUpdate(currentTime);
    }
  }

  onEnd = () => {
    this.nextTrack();

    if (typeof this.props.onEnd === 'function') {
      this.props.onEnd();
    }
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
    if (!this.state.isLoading) {
      this.setState(({ nowPlaying }, { playlist }) => ({
        nowPlaying: nowPlaying + 1 >= playlist.length ? 0 : nowPlaying + 1,
      }));
    }
  }

  prevTrack = () => {
    if (!this.state.isLoading) {
      this.setState(({ nowPlaying }, { playlist }) => ({
        nowPlaying: nowPlaying - 1 < 0 ? playlist.length - 1 : nowPlaying - 1,
      }));
    }
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
      thumbnails,
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
      thumbnails,
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
