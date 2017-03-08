import React, { Component, PropTypes } from 'react';
import SC from './sc';

class SoundCloud extends Component {
  static propTypes = {
    videoId: PropTypes.string.isRequired,
    refCallback: PropTypes.func.isRequired,
    onTimeUpdate: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { videoId, refCallback } = this.props;

    SC.stream(videoId)
      .then((player) => {
        this.player = player;

        // tell chrome to not to use flash
        // https://github.com/soundcloud/soundcloud-javascript/issues/39#issuecomment-238250274
        if (player.options.protocols[0] === 'rtmp') {
          player.options.protocols.splice(0, 1);
        }

        player.on('time', this.props.onTimeUpdate);

        refCallback(player, 'soundcloud');
      });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.off('time', this.props.onTimeUpdate);
    }
  }

  player = null;

  render() {
    return (<div />);
  }
}

export default SoundCloud;
