import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';

const DefaultButton = styled.button`
  background-color: #FFF;
  color: palevioletred;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
`;

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

// eslint-disable-next-line no-console
const defaultEventLogger = name => () => console.log(name);

class DefaultTheme extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    play: PropTypes.func,
    pause: PropTypes.func,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    volume: PropTypes.number,
    setVolume: PropTypes.func,
    seekTo: PropTypes.func,
  };

  static defaultProps = {
    isLoading: true,
    title: '',
    play: defaultEventLogger('play'),
    pause: defaultEventLogger('pause'),
    currentTime: 0,
    duration: 0,
    volume: 100,
    setVolume: defaultEventLogger('setVolume'),
    seekTo: defaultEventLogger('seekTo'),
  };

  handleVolumeChange = (e) => {
    this.props.setVolume(e.target.value);
  }

  handleSeekChange = (e) => {
    this.props.seekTo(e.target.value);
  }

  render() {
    const {
      isLoading,
      title,
      play,
      pause,
      currentTime,
      duration,
      volume,
    } = this.props;

    return (
      <div>
        {isLoading && 'loading...'}
        <h3>{title}</h3>
        <DefaultButton onClick={play}>
          Play
        </DefaultButton>
        <DefaultButton onClick={pause}>
          Pause
        </DefaultButton>
        <input type="range" min="0" max={duration} value={currentTime} onChange={this.handleSeekChange} />
        <DefaultProgressBar percent={(currentTime / duration) || 0}>
          {Math.round(currentTime)} / {Math.round(duration)}
        </DefaultProgressBar>
        <input type="range" min="0" max="100" value={volume} onChange={this.handleVolumeChange} />
      </div>
    );
  }
}

export default DefaultTheme;
