import React, { Component, PropTypes } from 'react';
import { generate } from 'shortid';

class Scarlet extends Component {
  static defaultProps = {
    url: 'M7lc1UVf-VE',
  };

  static propTypes = {
    url: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.handlePlayerReady = this.handlePlayerReady.bind(this);
    this.handlePlayerStateChange = this.handlePlayerStateChange.bind(this);
  }

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
        videoId: 'M7lc1UVf-VE',
        events: {
          onReady: this.handlePlayerReady,
          onStateChange: this.handlePlayerStateChange,
        },
      });
    };
  }

  handlePlayerReady() {
    this.player.playVideo();
  }

  handlePlayerStateChange(event) {
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

export default Scarlet;
