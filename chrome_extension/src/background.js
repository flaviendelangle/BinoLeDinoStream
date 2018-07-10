import { GET_STREAM_STATUS } from './types';


const API_CLIENT_ID = "047hyh2gfli6kv04oeuz4idpx4bzir";

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

let currentContent = OFFLINE_CONTENT

function updateUI(isOnline = false) {
  currentContent = isOnline ? ONLINE_CONTENT : OFFLINE_CONTENT
  chrome.browserAction.setIcon({ path: currentContent.src })
}

function getStreamStatus() {
  const headers = new Headers();
  headers.append('Client-ID', API_CLIENT_ID);

  return fetch(API_ENDPOINT, { headers }).then(res => res.json())
}

function main() {
  getStreamStatus().then(({ data }) => {
    setTimeout(main, REQUEST_INTERVAL)
    updateUI(data.length > 0)
    console.log(data.length ? 'ONLINE' : 'ONLINE')
  })
}


main()

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === GET_STREAM_STATUS) {
    sendResponse(currentContent);
  } else {
    sendResponse(null);
}
  return true;
});
