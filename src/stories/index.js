import React from 'react';
import { storiesOf } from '@kadira/storybook'; // eslint-disable-line import/no-extraneous-dependencies

import Scarlet from '../components/Scarlet';
import Player from '../components/Scarlet/Player';

const ScarletPlayer = Player();

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

storiesOf('refactor', module)
  .add('one youtube', () => (
    <ScarletPlayer url="https://www.youtube.com/watch?v=ULyTXwjojgc" />
  ))
  .add('one soundcloud', () => (
    <ScarletPlayer url="https://soundcloud.com/too-many-sebastians/craig-paul-hardy-theo-chinara-make-ya-feel-good" />
  ));
