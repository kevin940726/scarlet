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
    currentTime: PropTypes.number,
    seekTo: PropTypes.func.isRequired,
    getCurrentTime: PropTypes.func,
    setOnTimeUpdateCallback: PropTypes.func.isRequired,
  };

  static defaultProps = {
    currentTime: 0,
    getCurrentTime: () => {},
  };

  state = {
    currentTime: 0,
  };

  componentDidMount() {
    const { setOnTimeUpdateCallback } = this.props;

    if (typeof setOnTimeUpdateCallback === 'function') {
      setOnTimeUpdateCallback(this.onTimeUpdate);
      // calling this function will let you handle the time update event
      // with the callback passed in. In this way, you can manually set the duration
      // in the minimal component state, so that the other part of the theme won't do
      // unneccesary update.
      // NOTE: this function should only be called once in most cases,
      // placing it in `componentDidMount` is considered to be a good practice.
    }
  }

  onTimeUpdate = () => {
    this.setState({
      currentTime: this.props.getCurrentTime(),
    });
  }

  // Scarlet don't assume your volume or progress component should be an input,
  // so you need to implement the event handler for your component and call the methods from props.
  handleSeekChange = (e) => {
    this.props.seekTo(e.target.value);
  }

  render() {
    const { duration, getCurrentTime } = this.props;
    const currentTime = getCurrentTime ? this.state.currentTime : this.props.currentTime;

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
