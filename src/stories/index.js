import React from 'react';
import { storiesOf } from '@kadira/storybook'; // eslint-disable-line import/no-extraneous-dependencies

import Scarlet from '../components/Scarlet';

storiesOf('Scarlet', module)
  .add('basic', () => (
    <Scarlet />
  ));
