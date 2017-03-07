const createPlayer = ({
  play = () => {},
  pause = () => {},
}) => ({
  play,
  pause,
});

function setPlayer(player, type) {
  if (type === 'youtube') {
    return createPlayer({
      play: () => player.playVideo(),
      pause: () => player.pauseVideo(),
    });
  } else if (type === 'soundcloud') {
    return createPlayer({
      play: () => player.play(),
      pause: () => player.pause(),
    });
  }

  return createPlayer({});
}

export default setPlayer;
