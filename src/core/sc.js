import SC from 'soundcloud';

const setupSoundCloud = (clientId) => {
  SC.initialize({
    client_id: clientId,
  });
  return SC;
};

export default setupSoundCloud;
