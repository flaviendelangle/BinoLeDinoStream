/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _types = __webpack_require__(2);
	
	var API_CLIENT_ID = "047hyh2gfli6kv04oeuz4idpx4bzir";
	
	var ONLINE_CONTENT = {
	  message: 'BinoLeDino est en ligne',
	  src: 'icons/112x112/BinoWave.png'
	};
	
	var OFFLINE_CONTENT = {
	  message: 'Le live est fini :(',
	  src: 'icons/112x112/BinoCry.png'
	};
	
	var STREAM_NAME = 'binoledino';
	
	var API_ENDPOINT = 'https://api.twitch.tv/helix/streams?user_login=' + STREAM_NAME;
	
	var REQUEST_INTERVAL = 60000;
	
	var currentContent = {
	  ui: OFFLINE_CONTENT,
	  stream: undefined
	};
	
	function sendStatus() {
	  chrome.runtime.sendMessage({
	    type: _types.SEND_STREAM_STATUS,
	    value: currentContent
	  });
	  return currentContent;
	}
	
	function getStreamStatus() {
	  var headers = new Headers();
	  headers.append('Client-ID', API_CLIENT_ID);
	
	  return fetch(API_ENDPOINT, { headers: headers }).then(function (res) {
	    return res.json();
	  });
	}
	
	function main() {
	  getStreamStatus().then(function (_ref) {
	    var data = _ref.data;
	
	    setTimeout(main, REQUEST_INTERVAL);
	    currentContent = {
	      stream: data[0],
	      ui: data.length > 0 ? ONLINE_CONTENT : OFFLINE_CONTENT
	    };
	    chrome.browserAction.setIcon({ path: currentContent.src });
	    sendStatus();
	  });
	}
	
	main();
	
	chrome.runtime.onMessage.addListener(function (_ref2) {
	  var type = _ref2.type;
	
	  if (type === _types.GET_STREAM_STATUS) {
	    sendStatus();
	  }
	  return true;
	});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var GET_STREAM_STATUS = exports.GET_STREAM_STATUS = 'get_stream_status';
	
	var SEND_STREAM_STATUS = exports.SEND_STREAM_STATUS = 'send_stream_status';

/***/ })
/******/ ]);
//# sourceMappingURL=background.js.map