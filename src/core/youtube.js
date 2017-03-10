import { generate } from 'shortid';

function youtube(methods = {}) {
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

  const getVolume = () => player && player.getVolume();

  const setVolume = volume => player && player.setVolume(volume);

  const seekTo = time => player && player.seekTo(time);

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

  const play = () => player && player.playVideo();

  const pause = () => player && player.pauseVideo();

  function loadTrack(trackId, metadata) {
    this.title = metadata.title;

    player = new window.YT.Player(wrapperId, {
      height: '0',
      width: '0',
      videoId: trackId,
      events: {
        onReady: handlePlayerReady,
        onStateChange: handlePlayerStateChange,
      },
    });

    return this;
  }

  return new Promise((resolve) => {
    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
    window.onYouTubeIframeAPIReady = () => {
      resolve({
        title: '',
        play,
        pause,
        getCurrentTime,
        getDuration,
        getVolume,
        setVolume,
        seekTo,
        loadTrack,
      });
    };
  });
}

export default youtube;
