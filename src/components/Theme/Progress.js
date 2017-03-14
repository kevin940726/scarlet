import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';

const DefaultProgressBar = styled.div`
  width: 100px;
  height: 20px;
  text-align: center;
  position: relative;
  &:after: {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 20px;
    width: ${({ percent }) => percent}%
  }
`;

class DefaultProgress extends PureComponent {
  static propTypes = {
    duration: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    seekTo: PropTypes.func.isRequired,
  }

  // Scarlet don't assume your volume or progress component should be an input,
  // so you need to implement the event handler for your component and call the methods from props.
  handleSeekChange = (e) => {
    this.props.seekTo(e.target.value);
  }

  render() {
    const { duration, currentTime } = this.props;

    return (
      <div>
        <input type="range" min="0" max={duration} value={currentTime || 0} onChange={this.handleSeekChange} />
        <DefaultProgressBar percent={(currentTime / duration) || 0}>
          {Math.round(currentTime)} / {Math.round(duration)}
        </DefaultProgressBar>
      </div>
    );
  }
}

export default DefaultProgress;
