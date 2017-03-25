import { generate } from 'shortid';

const buildThumbnailCollection = (thumbnails) => {
  const mapping = {
    high: 'maxres', // 720 x 1280
    default: 'medium', // 180 x 320
    small: 'default', // 90 x 120
  };

  return Object.entries(mapping)
    .reduce((collection, [name, value]) => ({
      ...collection,
      [name]: thumbnails[value] && thumbnails[value].url,
    }), {});
};

class Youtube {
  player = null;
  wrapperId = '';
  thumbnails = null;
  timeUpdateInterval = 0;
  onTimeUpdate = null;

  constructor(wrapperId, methods = {}) {
    this.wrapperId = wrapperId;
    this.methods = methods;

    this.onTimeUpdate = methods.onTimeUpdate;
  }

  getCurrentTime = () => this.player && this.player.getCurrentTime();

  getDuration = () => this.player && this.player.getDuration();

  getVolume = () => this.player && this.player.getVolume();

  setVolume = volume => this.player && this.player.setVolume(volume);

  seekTo = time => this.player && this.player.seekTo(time);

  clearOnTimeUpdate = () => {
    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
    }
  }

  setOnTimeUpdate = () => {
    if (typeof this.onTimeUpdate === 'function') {
      // fire time update callback
      this.timeUpdateInterval = setInterval(this.onTimeUpdate, 500);
    }
  }

  handlePlayerReady = () => {
    this.clearOnTimeUpdate();
    this.setOnTimeUpdate();
    this.methods.onReady();
  };

  handlePlayerStateChange = (event) => {
    if (event.data === 1) {
      // the duration is only ready after the video is played
      this.methods.onDurationReady();
    } else if (event.data === window.YT.PlayerState.ENDED) {
      // track ended
      this.methods.onEnd();
    } else if (event.data === window.YT.PlayerState.CUED) {
      // new track is cued
      this.handlePlayerReady();
    }
  };

  play = () => this.player && this.player.playVideo && this.player.playVideo();

  pause = () => this.player && this.player.pauseVideo && this.player.pauseVideo();

  stop = () => {
    this.pause();
    this.seekTo(0);
    this.clearOnTimeUpdate();
  }

  setOnTimeUpdateCallback = (callback) => {
    this.clearOnTimeUpdate();
    this.onTimeUpdate = callback;
    this.setOnTimeUpdate();
  }

  loadTrack = (trackId, metadata) => {
    this.title = metadata.title;
    this.thumbnails = buildThumbnailCollection(metadata.thumbnails);
    this.isPlaying = true;

    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
    }

    // if there is already a player instance, cue new track, or else won't work
    if (this.player) {
      this.player.cueVideoById(trackId);
    } else {
      this.player = new window.YT.Player(this.wrapperId, {
        height: '0',
        width: '0',
        videoId: trackId,
        events: {
          onReady: this.handlePlayerReady,
          onStateChange: this.handlePlayerStateChange,
        },
      });
    }

    return this;
  }
}

const youtube = (methods = {}) => new Promise((resolve) => {
  const wrapperId = generate(); // generate a non-collision id

  if (!window.YT) {
    // This code loads the IFrame Player API code asynchronously.
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);

    // create a wrapper to put in the video iframe
    const wrapper = document.createElement('div');
    wrapper.id = wrapperId;
    document.body.appendChild(wrapper);
  }

  // This function creates an <iframe> (and YouTube player)
  // after the API code downloads.
  window.onYouTubeIframeAPIReady = () => {
    resolve(new Youtube(wrapperId, methods));
  };
});

export default youtube;
