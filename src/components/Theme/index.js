import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';

const DefaultButton = styled.button`
  background-color: #FFF;
  color: palevioletred;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
`;

// eslint-disable-next-line no-console
const defaultEventLogger = name => () => console.log(name);

class DefaultTheme extends PureComponent {
  static propTypes = {
    play: PropTypes.func,
    pause: PropTypes.func,
  };

  static defaultProps = {
    play: defaultEventLogger('play'),
    pause: defaultEventLogger('pause'),
  };

  render() {
    const {
      play,
      pause,
    } = this.props;

    return (
      <div>
        <DefaultButton onClick={play}>
          Play
        </DefaultButton>
        <DefaultButton onClick={pause}>
          Pause
        </DefaultButton>
      </div>
    );
  }
}

export default DefaultTheme;
