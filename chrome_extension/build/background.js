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
/***/ (function(module, exports) {

	'use strict';
	
	var API_CLIENT_ID = "047hyh2gfli6kv04oeuz4idpx4bzir";
	
	var ONLINE_CONTENT = {
	  message: 'BinoLeDino est en ligne',
	  src: 'icons/112x112/BinoWave.png'
	};
	
	var OFFLINE_CONTENT = {
	  message: 'Le live est fini :(',
	  src: 'icons/112x112/BinoCry.png'
	};
	
	var STREAM_NAME = 'zerator'; //'binoledino'
	
	var API_ENDPOINT = 'https://api.twitch.tv/helix/streams?user_login=' + STREAM_NAME;
	
	var REQUEST_INTERVAL = 100000000;
	
	function updateUI() {
	  var isOnline = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
	  console.log('OH');
	  var content = isOnline ? ONLINE_CONTENT : OFFLINE_CONTENT;
	  chrome.browserAction.setIcon({ path: content.src });
	
	  if (document.querySelectorAll('section').length > 0) {
	    console.log('I UPDATE');
	    document.querySelector('section').innerHTML = '\n      <div class="message">' + content.message + '</div>\n      <img src="' + content.src + '" />\n    ';
	  }
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
	    updateUI(data.length > 0);
	    console.log(data.length ? 'ONLINE' : 'ONLINE');
	  });
	}
	
	main();

/***/ })
/******/ ]);
//# sourceMappingURL=background.js.map