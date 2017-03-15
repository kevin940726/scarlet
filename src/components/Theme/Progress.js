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
  };

  static defaultProps = {
    currentTime: 0,
    getCurrentTime: () => {},
  };

  state = {
    currentTime: 0,
  };

  // adding this function in the component or as props (like Redux)
  // will allow Scarlet to pass this function to the core callback.
  // so the heavy state-management re-render function can happen in this component only.
  // you also need to make the `ref` of this component point to `onTimeRefCallback`.
  // check the `Trace React Updates` checkbox in React devtool to see the difference.
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
