import getYoutubeId from 'get-youtube-id';
import fetch from 'isomorphic-fetch';
import { stringify } from 'query-string';
import SC from './sc';
import credentials from '../credentials.json';

import youtube from './youtube';
import SoundCloud from './soundcloud';

const scarlet = async (methods = {}) => {
  // await youtube to finish loading the API
  const youtubePlayer = await youtube(methods);
  const soundcloudPlayer = new SoundCloud(methods);

  return async (url) => {
    // stop previous player to prevent overlapping of two players
    youtubePlayer.stop();
    soundcloudPlayer.stop();

    const youtubeVideoId = getYoutubeId(url, { fuzzy: false });

    // if type is youtube
    if (youtubeVideoId) {
      // load youtube track metadata
      const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?${stringify({
        part: 'snippet',
        id: youtubeVideoId,
        key: credentials.youtubeApiKey,
      })}`).then(response => response.json());

      return youtubePlayer.loadTrack(youtubeVideoId, res.items[0].snippet);
    }

    // resolve soundcloud metadata
    const res = await SC.resolve(url);

    // if type is soundcloud
    if (res && res.kind === 'track' && res.id) {
      return soundcloudPlayer.loadTrack(`/tracks/${res.id}`, res);
    }

    return null;
  };
};

export default scarlet;
