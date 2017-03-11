/**
 * You can implement your own theme component,
 * you only need to make those props avaiable for Scarlet to call,
 * Scarlet will handle the rest for you.
 * All the theming and style are completly customizable.
 * This component is just a default theme for Scarlet,
 * fork this and customize it might be a good start.
 *
 * We use `styled-component` to style this default theme component,
 * but all the other ways should be fine too.
 */
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

// default to log the event to provide easy debuging interface
// eslint-disable-next-line no-console
const defaultEventLogger = name => () => console.log(name);

// make it a pure component may be a good practice in most situation.
class DefaultTheme extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool, // if the track is loading
    title: PropTypes.string, // track title
    play: PropTypes.func, // function to play the track
    pause: PropTypes.func, // function to pause the track
    currentTime: PropTypes.number, // current time of the playback in seconds
    duration: PropTypes.number, // total duration of the track in seconds
    volume: PropTypes.number, // volume between 0 to 100
    setVolume: PropTypes.func, // function to set the volume
    seekTo: PropTypes.func, // function to seek to a specific time of the playback
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

  // Scarlet don't assume your volume or progress component should be an input,
  // so you need to implement the event handler for your component and call the methods from props.
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
        <input type="range" min="0" max={duration} value={currentTime || 0} onChange={this.handleSeekChange} />
        <DefaultProgressBar percent={(currentTime / duration) || 0}>
          {Math.round(currentTime)} / {Math.round(duration)}
        </DefaultProgressBar>
        <input type="range" min="0" max="100" value={volume || 0} onChange={this.handleVolumeChange} />
      </div>
    );
  }
}

export default DefaultTheme;
