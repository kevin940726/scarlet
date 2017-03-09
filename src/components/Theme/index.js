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
    title: PropTypes.string,
    play: PropTypes.func,
    pause: PropTypes.func,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
  };

  static defaultProps = {
    title: '',
    play: defaultEventLogger('play'),
    pause: defaultEventLogger('pause'),
    currentTime: 0,
    duration: 0,
  };

  render() {
    const {
      title,
      play,
      pause,
      currentTime,
      duration,
    } = this.props;

    return (
      <div>
        <h3>{title}</h3>
        <DefaultButton onClick={play}>
          Play
        </DefaultButton>
        <DefaultButton onClick={pause}>
          Pause
        </DefaultButton>
        <DefaultProgressBar percent={(currentTime / duration) || 0}>
          {Math.round(currentTime)} / {Math.round(duration)}
        </DefaultProgressBar>
      </div>
    );
  }
}

export default DefaultTheme;
