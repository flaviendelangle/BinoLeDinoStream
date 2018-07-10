import { GET_STREAM_STATUS } from './types'


chrome.runtime.sendMessage(GET_STREAM_STATUS, (content) => {
  document.querySelector('.stream_status').innerHTML = `
    <div class="message">${content.message}</div>
    <img src="${content.src}" />
  `;
});
