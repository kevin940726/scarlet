import getYoutubeId from 'get-youtube-id';
import fetch from 'isomorphic-fetch';
import { stringify } from 'query-string';
import SC from './sc';
import credentials from '../credentials.json';

import Youtube from './youtube';
import SoundCloud from './soundcloud';

const scarlet = async (url, methods = {}) => {
  const youtubeVideoId = getYoutubeId(url, { fuzzy: false });

  if (youtubeVideoId) {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?${stringify({
      part: 'snippet',
      id: youtubeVideoId,
      key: credentials.youtubeApiKey,
    })}`).then(response => response.json());

    return new Youtube(youtubeVideoId, {
      ...res.items[0].snippet,
      ...methods,
    });
  }

  const res = await SC.resolve(url);

  if (res && res.kind === 'track') {
    return new SoundCloud(`/tracks/${res.id}`, {
      ...res,
      ...methods,
    });
  }

  return null;
};

export default scarlet;
