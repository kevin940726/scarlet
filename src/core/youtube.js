import { generate } from 'shortid';

function Youtube(videoId, methods = {}) {
  let player = null;
  const wrapperId = generate(); // generate a non-collision id
  let timeUpdateInterval = 0;

  if (!window.YT) {
    // This code loads the IFrame Player API code asynchronously.
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);

    // create a wrapper to put in the video iframe
    const wrapper = document.createElement('div');
    wrapper.id = wrapperId; // generate a non-collision id
    document.body.appendChild(wrapper);
  }

  const getCurrentTime = () => player && player.getCurrentTime();

  const getDuration = () => player && player.getDuration();

  const handlePlayerReady = () => {
    if (timeUpdateInterval) {
      clearInterval(timeUpdateInterval);
    }

    timeUpdateInterval = setInterval(methods.onTimeUpdate, 250);

    methods.onReady();
  };

  const handlePlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      methods.onEnd();
    }
  };

  // This function creates an <iframe> (and YouTube player)
  // after the API code downloads.
  window.onYouTubeIframeAPIReady = () => {
    player = new window.YT.Player(wrapperId, {
      height: '390',
      width: '640',
      videoId,
      events: {
        onReady: handlePlayerReady,
        onStateChange: handlePlayerStateChange,
      },
    });
  };

  const play = () => {
    if (player) {
      player.playVideo();
    }
  };

  const pause = () => {
    if (player) {
      player.pauseVideo();
    }
  };

  return {
    play,
    pause,
    getCurrentTime,
    getDuration,
  };
}

export default Youtube;
