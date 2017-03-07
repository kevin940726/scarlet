function setPlayer(player, type) {
  if (type === 'youtube') {
    return {
      play: () => player.playVideo(),
      pause: () => player.pauseVideo(),
    };
  } else if (type === 'soundcloud') {
    return {
      play: () => player.play(),
      pause: () => player.pause(),
    };
  }

  return {};
}

export default setPlayer;
