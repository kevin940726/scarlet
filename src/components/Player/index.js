import React, { PureComponent, PropTypes } from 'react';
import getYoutubeId from 'get-youtube-id';

import SC from './sc';
import Youtube from './Youtube';
import SoundCloud from './SoundCloud';

class Player extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    refCallback: PropTypes.func.isRequired,
    onTimeUpdate: PropTypes.func.isRequired,
  };

  state = {
    type: '',
    videoId: '',
    metadata: {},
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
              metadata: res,
            });
          }
        });
    }
  }

  getPlayerComponent = () => {
    const { type } = this.state;

    if (type === 'youtube') {
      return Youtube;
    } else if (type === 'soundcloud') {
      return SoundCloud;
    }

    return null;
  }

  render() {
    const { refCallback, onTimeUpdate } = this.props;
    const { videoId, metadata } = this.state;

    const PlayerComponent = this.getPlayerComponent();

    if (!PlayerComponent) {
      return PlayerComponent;
    }

    return (
      <PlayerComponent
        videoId={videoId}
        refCallback={refCallback(metadata)}
        onTimeUpdate={onTimeUpdate}
      />
    );
  }
}

export default Player;
