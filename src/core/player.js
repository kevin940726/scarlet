const createPlayer = ({
  play = () => {},
  pause = () => {},
  getCurrentTime = () => 0,
  getDuration = () => 0,
}) => ({
  play,
  pause,
  getCurrentTime,
  getDuration,
});

function setPlayer(player, type, metadata = {}) {
  if (type === 'youtube') {
    return createPlayer({
      play: () => player.playVideo(),
      pause: () => player.pauseVideo(),
      getCurrentTime: () => player.getCurrentTime(),
      getDuration: () => player.getDuration(),
    });
  } else if (type === 'soundcloud') {
    return createPlayer({
      play: () => player.play(),
      pause: () => player.pause(),
      getCurrentTime: () => player.currentTime() / 1000, // milliseconds to seconds
      getDuration: () => metadata.duration / 1000, // milliseconds to seconds
    });
  }

  return createPlayer({});
}

export default setPlayer;
