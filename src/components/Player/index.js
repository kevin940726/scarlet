import React, { Component, PropTypes } from 'react';
import getYoutubeId from 'get-youtube-id';

import SC from './sc';
import Youtube from './Youtube';
import SoundCloud from './SoundCloud';

class Player extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    refCallback: PropTypes.func.isRequired,
  };

  state = {
    type: '',
    videoId: '',
  };

  componentDidMount() {
    this.getVideoTypeAndId(this.props.url);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      this.getVideoTypeAndId(nextProps.url);
    }
  }

  getVideoTypeAndId = (url) => {
    const youtubeVideoId = getYoutubeId(url, { fuzzy: false });

    if (youtubeVideoId) {
      this.setState({
        type: 'youtube',
        videoId: youtubeVideoId,
      });
    } else {
      SC.resolve(url)
        .then((res) => {
          if (res && res.kind === 'track') {
            this.setState({
              type: 'soundcloud',
              videoId: `/tracks/${res.id}`,
            });
          }
        });
    }
  }

  render() {
    const { refCallback } = this.props;
    const { type, videoId } = this.state;

    if (type === 'youtube') {
      return (
        <Youtube videoId={videoId} refCallback={refCallback} />
      );
    } else if (type === 'soundcloud') {
      return (
        <SoundCloud videoId={videoId} refCallback={refCallback} />
      );
    }

    return null;
  }
}

export default Player;
