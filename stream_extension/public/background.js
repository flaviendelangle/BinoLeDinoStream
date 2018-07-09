import TwitchHelix from 'twitch-helix';

const TICK_RATE = 60000;
const CLIENT_ID = '047hyh2gfli6kv04oeuz4idpx4bzir';
const CLIENT_SECRET = 'ocj4xwjk9fosbnu67pbl7wf8kjwzcp';
const STREAM_NAME = 'binoledino';

const twitchApi = new TwitchHelix({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

console.log('AAAAAAAAAAAAAAAAAAAAA')

// twitchApi.getStreamInfoByUsername(STREAM_NAME).then(() => {});

setInterval(() => {
  console.log('AAAAAAAAAAAAAAAAAAAAA')
}, 1000);
