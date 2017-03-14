class SoundCloud {
  player = null;
  title = '';
  isPlaying = false;
  duration = 0;
  SC = {};

  constructor(methods = {}, SC) {
    this.methods = methods;
    this.SC = SC;
  }

  getCurrentTime = () => this.player && this.player.currentTime() / 1000; // milliseconds to seconds

  getDuration = () => this.duration;

  getVolume = () => this.player && this.player.getVolume() * 100; // 0~1 to 0~100

  setVolume = volume => this.player && this.player.setVolume(volume / 100); // 0~100 to 0~1

  seekTo = time => this.player && this.player.seek(time * 1000); // seconds to milliseconds

  play = () => this.player && this.player.play();

  pause = () => this.player && this.player.pause();

  stop = () => this.player && this.player.dispose();

  loadTrack = (trackId, metadata = {}) => {
    this.title = metadata.title;
    this.duration = metadata.duration / 1000; // milliseconds to seconds

    this.SC.stream(trackId)
      .then((player) => {
        this.player = player;

        // tell chrome to not to use flash
        // https://github.com/soundcloud/soundcloud-javascript/issues/39#issuecomment-238250274
        if (this.player.options.protocols[0] === 'rtmp') {
          this.player.options.protocols.splice(0, 1);
        }

        // fire callback on event
        this.player.on('time', this.methods.onTimeUpdate);
        this.player.on('finish', this.methods.onEnd);

        // fire onReady callback
        this.methods.onReady();
      });

    return this;
  }
}

export default SoundCloud;
