import React, { Component, PropTypes } from 'react';
import { generate } from 'shortid';

class Youtube extends Component {
  static propTypes = {
    videoId: PropTypes.string.isRequired,
    refCallback: PropTypes.func.isRequired,
  };

  state = {
    id: generate(),
  };

  componentDidMount() {
    if (!window.YT) {
      // This code loads the IFrame Player API code asynchronously.
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }

    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
    window.onYouTubeIframeAPIReady = () => {
      this.player = new window.YT.Player(this.state.id, {
        height: '390',
        width: '640',
        videoId: this.props.videoId,
        events: {
          onReady: this.handlePlayerReady,
          onStateChange: this.handlePlayerStateChange,
        },
      });
    };
  }

  handlePlayerReady = () => {
    this.props.refCallback(this.player, 'youtube');
  }

  handlePlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      this.player.stopVideo();
    }
  }

  player = null;

  render() {
    const { id } = this.state;

    return (
      <div id={id}>loading...</div>
    );
  }
}

export default Youtube;
