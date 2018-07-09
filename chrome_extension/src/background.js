const API_CLIENT_ID = "047hyh2gfli6kv04oeuz4idpx4bzir";

const ONLINE_CONTENT = {
  message: 'BinoLeDino est en ligne',
  src: 'icons/112x112/BinoWave.png',
}

const OFFLINE_CONTENT = {
  message: 'Le live est fini :(',
  src: 'icons/112x112/BinoCry.png',
}

const STREAM_NAME = 'zerator' //'binoledino'

const API_ENDPOINT = `https://api.twitch.tv/helix/streams?user_login=${STREAM_NAME}`

const REQUEST_INTERVAL = 100000000

function updateUI(isOnline = false) {
  console.log('OH')
  const content = isOnline ? ONLINE_CONTENT : OFFLINE_CONTENT
  chrome.browserAction.setIcon({ path: content.src })

  if (document.querySelectorAll('section').length > 0) {
    /*
    document.querySelector('section').innerHTML = `
      <div class="message">${content.message}</div>
      <img src="${content.src}" />
    `;
    */
  }
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
