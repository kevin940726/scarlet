import React from 'react';
import { storiesOf } from '@kadira/storybook'; // eslint-disable-line import/no-extraneous-dependencies

import Scarlet from '../components/Scarlet';
import Player from '../components/Player';

storiesOf('Player', module)
  .add('youtube', () => (
    <Player url="https://www.youtube.com/watch?v=ULyTXwjojgc" />
  ))
  .add('soundcloud', () => (
    <Player url="https://soundcloud.com/too-many-sebastians/craig-paul-hardy-theo-chinara-make-ya-feel-good" />
  ));

storiesOf('Scarlet', module)
  .add('one youtube', () => (
    <Scarlet
      playlist={[
        'https://www.youtube.com/watch?v=ULyTXwjojgc',
      ]}
    />
  ))
  .add('one soundcloud', () => (
    <Scarlet
      playlist={[
        'https://soundcloud.com/too-many-sebastians/craig-paul-hardy-theo-chinara-make-ya-feel-good',
      ]}
    />
  ));
