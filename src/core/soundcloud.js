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
      player.on('finish', methods.onEnd);

      methods.onReady();
    });

  const getCurrentTime = () => player && player.currentTime() / 1000; // milliseconds to seconds

  const getDuration = () => methods.duration / 1000; // milliseconds to seconds

  const getVolume = () => player && player.getVolume() * 100; // 0~1 to 0~100

  const setVolume = volume => player && player.setVolume(volume / 100); // 0~100 to 0~1

  const seekTo = time => player && player.seek(time * 1000); // seconds to milliseconds

  const play = () => player && player.play();

  const pause = () => player && player.pause();

  return {
    title: methods.title,
    play,
    pause,
    getCurrentTime,
    getDuration,
    getVolume,
    setVolume,
    seekTo,
  };
};

export default SoundCloud;
