import SC from './sc';

function soundcloud(methods = {}) {
  let player = null;

  const getCurrentTime = () => player && player.currentTime() / 1000; // milliseconds to seconds

  const getVolume = () => player && player.getVolume() * 100; // 0~1 to 0~100

  const setVolume = volume => player && player.setVolume(volume / 100); // 0~100 to 0~1

  const seekTo = time => player && player.seek(time * 1000); // seconds to milliseconds

  const play = () => player && player.play();

  const pause = () => player && player.pause();

  function loadTrack(trackId, metadata = {}) {
    this.title = metadata.title;
    this.getDuration = () => metadata.duration / 1000; // milliseconds to seconds

    SC.stream(trackId)
      .then((p) => {
        player = p;

        // tell chrome to not to use flash
        // https://github.com/soundcloud/soundcloud-javascript/issues/39#issuecomment-238250274
        if (player.options.protocols[0] === 'rtmp') {
          player.options.protocols.splice(0, 1);
        }

        // fire callback on event
        player.on('time', methods.onTimeUpdate);
        player.on('finish', methods.onEnd);

        // fire onReady callback
        methods.onReady();
      });

    return this;
  }

  return {
    title: '',
    play,
    pause,
    getCurrentTime,
    // default to zero, this part is implement on every `loadTrack` call
    getDuration: () => 0,
    getVolume,
    setVolume,
    seekTo,
    loadTrack,
  };
}

export default soundcloud;
