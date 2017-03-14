import React, { PureComponent, PropTypes } from 'react';

class DefaultVolume extends PureComponent {
  static propTypes = {
    volume: PropTypes.number.isRequired,
    setVolume: PropTypes.func.isRequired,
  };

  // Scarlet don't assume your volume or progress component should be an input,
  // so you need to implement the event handler for your component and call the methods from props.
  handleVolumeChange = (e) => {
    this.props.setVolume(e.target.value);
  }

  render() {
    const { volume } = this.props;

    return (
      <div>
        <input type="range" min="0" max="100" value={volume || 0} onChange={this.handleVolumeChange} />
      </div>
    );
  }
}

export default DefaultVolume;
