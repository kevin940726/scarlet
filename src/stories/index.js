import React from 'react';
import { storiesOf } from '@kadira/storybook'; // eslint-disable-line import/no-extraneous-dependencies

import Scarlet from '../components/Scarlet';

storiesOf('refactor', module)
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
  ))
  .add('two soundcloud', () => (
    <Scarlet
      playlist={[
        'https://soundcloud.com/too-many-sebastians/craig-paul-hardy-theo-chinara-make-ya-feel-good',
        'https://soundcloud.com/jacksonbreitmusic/show-me-the-money-jerry',
      ]}
    />
  ))
  .add('two youtube', () => (
    <Scarlet
      playlist={[
        'https://www.youtube.com/watch?v=ULyTXwjojgc',
        'https://www.youtube.com/watch?v=5ANRKzwcEEY&list=FLp9N6FdCzTyQZKMOZEz2Kjw&index=1',
      ]}
    />
  ))
  .add('youtube then soundcloud', () => (
    <Scarlet
      playlist={[
        'https://www.youtube.com/watch?v=ULyTXwjojgc',
        'https://soundcloud.com/too-many-sebastians/craig-paul-hardy-theo-chinara-make-ya-feel-good',
      ]}
    />
  ))
  .add('soundcloud then youtube', () => (
    <Scarlet
      playlist={[
        'https://soundcloud.com/too-many-sebastians/craig-paul-hardy-theo-chinara-make-ya-feel-good',
        'https://www.youtube.com/watch?v=ULyTXwjojgc',
      ]}
    />
  ));
