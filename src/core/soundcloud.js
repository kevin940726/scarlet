import SC from './sc';

const SoundCloud = (videoId, methods = {}) => {
  let player = null;

  SC.stream(videoId)
    .then((p) => {
      player = p;

      // tell chrome to not to use flash
      // https://github.com/soundcloud/soundcloud-javascript/issues/39#issuecomment-238250274
      if (player.options.protocols[0] === 'rtmp') {
        player.options.protocols.splice(0, 1);
      }

      player.on('time', methods.onTimeUpdate);

      methods.onReady();
    });

  const getCurrentTime = () => player && player.currentTime() / 1000; // milliseconds to seconds

  const getDuration = () => methods.duration / 1000; // milliseconds to seconds

  const play = () => player && player.play();

  const pause = () => player && player.pause();

  return {
    play,
    pause,
    getCurrentTime,
    getDuration,
  };
};

export default SoundCloud;
