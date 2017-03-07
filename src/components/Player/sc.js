import SC from 'soundcloud';
import { soundcloudClientId } from '../../credentials.json';

SC.initialize({
  client_id: soundcloudClientId,
});

export default SC;
