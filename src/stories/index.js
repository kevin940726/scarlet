import React from 'react';
import { storiesOf } from '@kadira/storybook'; // eslint-disable-line import/no-extraneous-dependencies

import Scarlet from '../components/Scarlet';

const Player = Scarlet();

storiesOf('refactor', module)
  .add('one youtube', () => (
    <Player
      playlist={[
        'https://www.youtube.com/watch?v=ULyTXwjojgc',
      ]}
    />
  ))
  .add('one soundcloud', () => (
    <Player
      playlist={[
        'https://soundcloud.com/too-many-sebastians/craig-paul-hardy-theo-chinara-make-ya-feel-good',
      ]}
    />
  ))
  .add('two soundcloud', () => (
    <Player
      playlist={[
        'https://soundcloud.com/too-many-sebastians/craig-paul-hardy-theo-chinara-make-ya-feel-good',
        'https://soundcloud.com/jacksonbreitmusic/show-me-the-money-jerry',
      ]}
    />
  ));
