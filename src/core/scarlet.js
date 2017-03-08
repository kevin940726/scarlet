import getYoutubeId from 'get-youtube-id';
import SC from './sc';

import Youtube from './youtube';
import SoundCloud from './soundcloud';

const scarlet = async (url, methods = {}) => {
  const youtubeVideoId = getYoutubeId(url, { fuzzy: false });

  if (youtubeVideoId) {
    return new Youtube(youtubeVideoId, methods);
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
