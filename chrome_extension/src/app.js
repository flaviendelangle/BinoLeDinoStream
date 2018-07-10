import { GET_STREAM_STATUS, SEND_STREAM_STATUS } from './types';


function updateUI({ ui }) {
  document.querySelector('.stream_status').innerHTML = `
    <div class="message">${ui.message}</div>
    <img src="${ui.src}" />
  `;
}

chrome.runtime.onMessage.addListener(({ type, value }) => {
  if (type === SEND_STREAM_STATUS) {
    updateUI(value);
  }
  return true;
});

chrome.runtime.sendMessage({ type: GET_STREAM_STATUS });
