import { GET_STREAM_STATUS, SEND_STREAM_STATUS } from './types';


const API_CLIENT_ID = '047hyh2gfli6kv04oeuz4idpx4bzir';

const ONLINE_CONTENT = {
  message: 'BinoLeDino est en ligne',
  src: 'icons/112x112/BinoWave.png',
};

const OFFLINE_CONTENT = {
  message: 'Le live est fini :(',
  src: 'icons/112x112/BinoCry.png',
};

const STREAM_NAME = 'binoledino';

const API_ENDPOINT = `https://api.twitch.tv/helix/streams?user_login=${STREAM_NAME}`;

const REQUEST_INTERVAL = 60000;

let currentContent = {
  ui: OFFLINE_CONTENT,
  stream: undefined,
};

function sendStatus() {
  chrome.runtime.sendMessage({
    type: SEND_STREAM_STATUS,
    value: currentContent,
  });
  return currentContent;
}

function getStreamStatus() {
  const headers = new Headers();
  headers.append('Client-ID', API_CLIENT_ID);

  return fetch(API_ENDPOINT, { headers }).then(res => res.json());
}

function updateIcon(path) {
  if (chrome && chrome.browserAction && chrome.browserAction.setIcon) {
    chrome.browserAction.setIcon({ path });
  }
}

function main() {
  getStreamStatus().then(({ data }) => {
    setTimeout(main, REQUEST_INTERVAL);
    currentContent = {
      stream: data[0],
      ui: data.length > 0 ? ONLINE_CONTENT : OFFLINE_CONTENT,
    };
    updateIcon(currentContent.ui.src);
    sendStatus();
  });
}


main();

chrome.runtime.onMessage.addListener(({ type }) => {
  if (type === GET_STREAM_STATUS) {
    sendStatus();
  }
  return true;
});
