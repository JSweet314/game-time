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

	'use strict';
	
	__webpack_require__(1);
	var Game = __webpack_require__(5);
	var gameUI = document.querySelector('.game-ui');
	var startScreen = document.querySelector('.start-screen');
	var startBtn = document.querySelector('.start-screen__btn');
	var pauseScreen = document.querySelector('.pause-screen');
	var advanceBtn = document.querySelector('.pause-screen__btn');
	var endgameScreen = document.querySelector('.endgame-screen');
	var endgameBtn = document.querySelector('.endgame-screen__btn');
	var wave = document.querySelector('.wave');
	var initials = document.querySelector('.initials');
	var score = document.querySelector('.game-stats__score');
	var highScoreText = document.querySelector('.high-score');
	var canvas = document.getElementById('game-canvas');
	var ctx = canvas.getContext('2d');
	var game = new Game(ctx);
	
	window.onload = function () {
	  var highScore = localStorage.getItem('high-score');
	
	  highScoreText.innerText = highScore || 0;
	  game.createBuildings();
	  game.drawBuildings();
	};
	
	startBtn.addEventListener('click', function () {
	  startScreen.style.display = 'none';
	  gameUI.style.display = 'none';
	  game.createEnemyMissiles();
	  canvas.addEventListener('click', returnFire);
	  animate();
	});
	
	advanceBtn.addEventListener('click', function () {
	  pauseScreen.style.display = 'none';
	  gameUI.style.display = 'none';
	  game.paused = false;
	  canvas.addEventListener('click', returnFire);
	  animate();
	});
	
	endgameBtn.addEventListener('click', function () {
	  if (game.score > parseInt(highScoreText.innerText.slice(4))) {
	    highScoreText.innerText = initials.value + ' ' + game.score;
	    localStorage.setItem("high-score", highScoreText.innerText);
	    initials.style.display = 'none';
	  }
	  game.resetGameState();
	  game.createBuildings();
	  game.drawBuildings();
	  endgameScreen.style.display = 'none';
	  startScreen.style.display = 'block';
	  canvas.addEventListener('click', returnFire);
	});
	
	function returnFire(event) {
	  var audioTest = game.bases.some(function (base) {
	    return base.numberOfMissiles > 0;
	  });
	
	  if (audioTest && event.offsetY < 420) {
	    var launchAudio = new Audio('lib/audio/missile-launch.wav');
	
	    launchAudio.play();
	  }
	  game.createReturnFire(event.offsetX, event.offsetY);
	}
	
	function displayPauseScreen() {
	  wave.innerText = game.wave - 1;
	  gameUI.style.display = 'flex';
	  pauseScreen.style.display = 'block';
	}
	
	function displayEndGameScreen() {
	  gameUI.style.display = 'flex';
	  endgameScreen.style.display = 'block';
	  if (game.score > parseInt(highScoreText.innerText.slice(4))) {
	    initials.style.display = 'block';
	  }
	}
	
	function updateScore() {
	  score.innerText = game.score;
	}
	
	function animate() {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	  game.procedure();
	
	  updateScore();
	
	  if (game.paused) {
	    displayPauseScreen();
	  } else if (game.gameOver) {
	    displayEndGameScreen();
	  }
	
	  if (!game.paused && !game.gameOver) {
	    requestAnimationFrame(animate);
	  } else {
	    canvas.removeEventListener('click', returnFire);
	  }
	}
	
	var skynet = document.querySelector('.skynet');
	skynet.addEventListener('blur', function () {
	  if (skynet.value === 'armageddon') {
	    game.numberOfEnemyMissiles = 500;
	    game.maxEnemyHeight = -1000;
	    game.createEnemyMissiles();
	  }
	
	  console.log('initials');
	
	  if (skynet.value === 'darpa') {
	    game.buildings.forEach(function (building) {
	      if (building.numberOfMissiles) {
	        building.numberOfMissiles = 50;
	        console.log(building.numberOfMissiles);
	      };
	    });
	  }
	  skynet.value = '';
	});
	
	window.addEventListener('keypress', function () {
	  if (event.keyCode === 97 || event.keyCode === 100) {
	    skynet.focus();
	  }
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Audiowide);", ""]);
	
	// module
	exports.push([module.id, "/*Blocks organized idiomatically*/\n/*position*/\n/*Display/Box-model*/\n/*Other*/\n\nhtml,\nbody {\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  width: 100%;\n}\n\nbody {\n  background: #000;\n  color: #fff;\n  font-family: Verdana, Arial, sans-serif;\n  font-size: 18px;\n}\n\nh1 {\n  text-align: center;\n  color: #CC0007;\n  text-shadow: 2px 2px 2px white;\n  font-size: 60px;\n  font-family: 'Audiowide', cursive;\n  background-color: #000000;\n  user-select: none;\n  margin: 0;\n}\n\nh2 {\n  text-align: center;\n}\n\n.game-background {\n  background: url(\"/lib/images/background.jpg\" );\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.game-ui {\n  height: 500px;\n  width: 500px;\n  position: absolute;\n  top: 100px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 100;\n}\n\n.start-screen,\n.pause-screen,\n.endgame-screen {\n  background-color: #00000000;\n  opacity: 1;\n  color: #ffffff;\n  padding: 10px;\n}\n\n.pause-screen,\n.endgame-screen,\n.initials {\n  display: none;\n}\n\n.initials {\n  text-align: center;\n  width: 84%;\n  margin: auto;\n  position: relative;\n  bottom: 8px;\n  font-weight: bold;\n}\n\n.start-screen__btn,\n.pause-screen__btn,\n.endgame-screen__btn {\n  background: red;\n  border-radius: 5px;\n  display: block;\n  font-size: 30px;\n  margin: 10px auto;\n  padding: 10px;\n  width: 200px;\n  color: white;\n  font-weight: bold;\n}\n\n.canvas-container {\n  position: relative;\n}\n\n.game-stats {\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: #00000000;\n  user-select: none;\n  margin: 102px 0 0 2px;\n}\n\n.game-stats p {\n  margin: 0;\n  padding: 0 5px;\n}\n\n.user-instructions {\n  text-align: center;\n  margin-top: 0;\n  color: red;\n  user-select: none;\n}\n\n.city-indicators {\n  letter-spacing: 15px;\n  margin: 0 38px 0 56px;\n}\n\n#game-canvas {\n  background: url(\"/lib/images/Full Moon - background.png\");\n  background-size: cover;\n  background-position: center;\n  border: 1px solid grey;\n  margin: 100px 0 0 0;\n}\n\n.white {\n  color: white;\n}\n\n#game-canvas:hover {\n  cursor: crosshair;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.skynet {\n  background-color: black;\n  color: black;\n  border: none;\n  user-select: none;\n  cursor: default;\n}\n\n.skynet:focus {\n  outline: none;\n}", ""]);
	
	// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Missile = __webpack_require__(6);
	var EnemyMissile = __webpack_require__(9);
	var Base = __webpack_require__(10);
	var Building = __webpack_require__(11);
	
	module.exports = function () {
	  function Game(ctx) {
	    _classCallCheck(this, Game);
	
	    this.bases = [];
	    this.buildings = [];
	    this.ctx = ctx;
	    this.enemyMissiles = [];
	    this.explosions = [];
	    this.gameOver = false;
	    this.maxEnemyHeight = -500;
	    this.numberOfBases = 3;
	    this.numberOfCities = 6;
	    this.numberOfEnemyMissiles = 10;
	    this.paused = false;
	    this.returnFire = [];
	    this.score = 0;
	    this.baseImage = "lib/images/Tower.png";
	    this.cityImage = "lib/images/House.png";
	    this.wave = 1;
	  }
	
	  _createClass(Game, [{
	    key: 'createBuildings',
	    value: function createBuildings() {
	      var _buildings;
	
	      this.bases.push(new Base(0, 450, 50, 50), new Base(225, 450, 50, 50), new Base(450, 450, 50, 50));
	
	      (_buildings = this.buildings).push.apply(_buildings, [new Building(75, 475, 25, 25), new Building(125, 475, 25, 25), new Building(175, 475, 25, 25), new Building(300, 475, 25, 25), new Building(350, 475, 25, 25), new Building(400, 475, 25, 25)].concat(_toConsumableArray(this.bases)));
	    }
	  }, {
	    key: 'drawBuildings',
	    value: function drawBuildings(src) {
	      var _this = this;
	
	      this.ctx.save();
	      this.ctx.fillStyle = '#2C651E';
	      this.ctx.fillRect(0, 470, 500, 30);
	      this.ctx.restore();
	      this.buildings.forEach(function (building) {
	        if (building instanceof Base) {
	          building.drawBuilding(_this.ctx, _this.baseImage);
	        } else {
	          building.drawBuilding(_this.ctx, _this.cityImage);
	        }
	      });
	    }
	  }, {
	    key: 'createEnemyMissiles',
	    value: function createEnemyMissiles() {
	      for (var i = 0; i < this.numberOfEnemyMissiles; i++) {
	        var x = Math.random() * 500;
	        var y = Math.random() * this.maxEnemyHeight;
	
	        this.enemyMissiles[i] = new EnemyMissile(x, y);
	        this.enemyMissiles[i].randomlySelectTarget(this.buildings);
	      }
	    }
	  }, {
	    key: 'updateEnemyMissiles',
	    value: function updateEnemyMissiles() {
	      var _this2 = this;
	
	      this.enemyMissiles.forEach(function (enemyMissile, index) {
	        enemyMissile.moveTowardsTarget();
	        if (enemyMissile.y >= enemyMissile.yTarget + 5) {
	          enemyMissile.destroyBuilding(_this2.buildings);
	          _this2.enemyMissiles.splice(index, 1);
	          _this2.explosions.push(enemyMissile.triggerExplosion());
	        }
	      });
	    }
	  }, {
	    key: 'drawEnemyMissiles',
	    value: function drawEnemyMissiles(ctx) {
	      this.enemyMissiles.forEach(function (enemyMissile) {
	        enemyMissile.drawMissile(ctx);
	      });
	    }
	  }, {
	    key: 'increaseEnemyMissiles',
	    value: function increaseEnemyMissiles() {
	      this.numberOfEnemyMissiles += 5;
	      this.maxEnemyHeight -= 100;
	    }
	  }, {
	    key: 'updateExplosions',
	    value: function updateExplosions() {
	      var _this3 = this;
	
	      this.explosions.forEach(function (explosion, index) {
	        explosion.updateRadius();
	        if (explosion.radius < 1) {
	          _this3.explosions.splice(index, 1);
	        }
	      });
	    }
	  }, {
	    key: 'detectCollisions',
	    value: function detectCollisions() {
	      var _this4 = this;
	
	      this.explosions.forEach(function (explosion) {
	        _this4.seekAndDestroy(explosion);
	      });
	    }
	  }, {
	    key: 'seekAndDestroy',
	    value: function seekAndDestroy(explosion) {
	      var _this5 = this;
	
	      this.enemyMissiles.forEach(function (enemyMissile, index) {
	        var dx = enemyMissile.x - explosion.x;
	        var dy = enemyMissile.y - explosion.y;
	        var distance = Math.sqrt(dx * dx + dy * dy);
	
	        if (distance < explosion.radius) {
	          _this5.enemyMissiles.splice(index, 1);
	          _this5.explosions.push(enemyMissile.triggerExplosion());
	          if (enemyMissile.y <= 420) {
	            _this5.score += 10;
	          }
	        }
	      });
	    }
	  }, {
	    key: 'drawExplosions',
	    value: function drawExplosions(ctx) {
	      this.explosions.forEach(function (explosion) {
	        explosion.drawExplosion(ctx);
	      });
	    }
	  }, {
	    key: 'createReturnFire',
	    value: function createReturnFire(xTarget, yTarget) {
	      var _this6 = this;
	
	      var firingBase = this.buildings.find(function (base) {
	        return base === _this6.determineClosestFiringBase(xTarget, yTarget);
	      });
	
	      if (firingBase) {
	        var x = firingBase.x + firingBase.width / 2;
	        var y = firingBase.y;
	
	        firingBase.numberOfMissiles--;
	        this.returnFire.push(new Missile(x, y, xTarget, yTarget));
	      }
	    }
	  }, {
	    key: 'updateUserMissiles',
	    value: function updateUserMissiles() {
	      var _this7 = this;
	
	      this.returnFire.forEach(function (missile, index) {
	        missile.moveTowardsTarget();
	        if (missile.y <= missile.yTarget) {
	          _this7.explosions.push(missile.triggerExplosion());
	          _this7.returnFire.splice(index, 1);
	        }
	      });
	    }
	  }, {
	    key: 'drawUserMissiles',
	    value: function drawUserMissiles(ctx) {
	      this.returnFire.forEach(function (missile) {
	        missile.drawMissile(ctx);
	      });
	    }
	  }, {
	    key: 'determineClosestFiringBase',
	    value: function determineClosestFiringBase(xTarget, yTarget) {
	      var leftBase = void 0,
	          midBase = void 0,
	          rightBase = void 0;
	
	      var _bases = _slicedToArray(this.bases, 3);
	
	      leftBase = _bases[0];
	      midBase = _bases[1];
	      rightBase = _bases[2];
	
	
	      var leftAmmo = leftBase.numberOfMissiles;
	      var midAmmo = midBase.numberOfMissiles;
	      var rightAmmo = rightBase.numberOfMissiles;
	
	      if (yTarget < 420) {
	        if (leftAmmo === 0 && midAmmo === 0 && rightAmmo === 0) {
	          return null;
	        } else if (xTarget <= 500 / 3 && leftAmmo > 0) {
	          return leftBase;
	        } else if (xTarget <= 500 / 3 && midAmmo > 0) {
	          return midBase;
	        } else if (xTarget <= 500 / 3) {
	          return rightBase;
	        } else if (xTarget >= 1000 / 3 && rightAmmo > 0) {
	          return rightBase;
	        } else if (xTarget >= 1000 / 3 && midAmmo > 0) {
	          return midBase;
	        } else if (xTarget >= 1000 / 3) {
	          return leftBase;
	        } else if (xTarget > 500 / 3 && xTarget < 1000 / 3 && midAmmo > 0) {
	          return midBase;
	        } else if (xTarget <= 250 && leftAmmo > 0) {
	          return leftBase;
	        } else if (xTarget <= 250) {
	          return rightBase;
	        } else if (xTarget > 250 && rightAmmo > 0) {
	          return rightBase;
	        } else if (xTarget > 250) {
	          return leftBase;
	        } else {
	          return null;
	        }
	      }
	    }
	  }, {
	    key: 'determineGameState',
	    value: function determineGameState() {
	      var noBuildings = this.buildings.length === 0;
	      var noEnemyMissiles = this.enemyMissiles.length === 0;
	      var noExplosions = this.explosions.length === 0;
	      var onlyBasesRemain = this.buildings.every(function (building) {
	        return building instanceof Base;
	      });
	      var allCitiesDestroyed = onlyBasesRemain || noBuildings;
	
	      if (onlyBasesRemain || allCitiesDestroyed) {
	        this.enemyMissiles.forEach(function (missile) {
	          missile.velocity = 20;
	        });
	      }
	      this.enemyHasDestroyedBases();
	      if (noEnemyMissiles && noExplosions && allCitiesDestroyed) {
	        this.gameOver = true;
	      } else if (noEnemyMissiles && noExplosions) {
	        this.paused = true;
	        this.wave++;
	        this.increaseEnemyMissiles();
	        this.prepareBasesForNextWave();
	        this.createEnemyMissiles();
	      }
	    }
	  }, {
	    key: 'enemyHasDestroyedBases',
	    value: function enemyHasDestroyedBases() {
	      var noBasesRemaining = this.buildings.every(function (buildings) {
	        return !(buildings instanceof Base);
	      });
	
	      if (noBasesRemaining) {
	        this.enemyMissiles.forEach(function (missile) {
	          missile.velocity = 20;
	        });
	      }
	    }
	  }, {
	    key: 'prepareBasesForNextWave',
	    value: function prepareBasesForNextWave() {
	      var _this8 = this;
	
	      this.bases.forEach(function (base) {
	        var baseInBuildingsArray = _this8.buildings.includes(base);
	
	        base.numberOfMissiles = 10;
	        if (!baseInBuildingsArray) {
	          _this8.buildings.push(base);
	        }
	      });
	    }
	  }, {
	    key: 'resetGameState',
	    value: function resetGameState() {
	      this.numberOfEnemyMissiles = 10;
	      this.maxEnemyHeight = -500;
	      this.buildings = [];
	      this.bases = [];
	      this.wave = 1;
	      this.score = 0;
	      this.gameOver = false;
	    }
	  }, {
	    key: 'procedure',
	    value: function procedure() {
	      this.updateEnemyMissiles();
	
	      this.updateUserMissiles();
	
	      this.updateExplosions();
	
	      this.detectCollisions();
	
	      this.drawBuildings();
	
	      this.drawEnemyMissiles(this.ctx);
	
	      this.drawUserMissiles(this.ctx);
	
	      this.drawExplosions(this.ctx);
	
	      this.determineGameState();
	    }
	  }]);
	
	  return Game;
	}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GamePiece = __webpack_require__(7);
	var Explosion = __webpack_require__(8);
	
	module.exports = function (_GamePiece) {
	  _inherits(Missile, _GamePiece);
	
	  function Missile(x, y, xTarget, yTarget) {
	    _classCallCheck(this, Missile);
	
	    var _this = _possibleConstructorReturn(this, (Missile.__proto__ || Object.getPrototypeOf(Missile)).call(this, x, y));
	
	    _this.magnitude = 0;
	    _this.xStart = x;
	    _this.yStart = y;
	    _this.xTarget = xTarget;
	    _this.yTarget = yTarget;
	    _this.velocity = 2;
	    _this.xVector = 0;
	    _this.yVector = 0;
	    return _this;
	  }
	
	  _createClass(Missile, [{
	    key: 'calculateDirectionalVectors',
	    value: function calculateDirectionalVectors() {
	      this.xVector = this.xTarget - this.xStart;
	      this.yVector = this.yTarget - this.yStart;
	    }
	  }, {
	    key: 'calculateMagnitude',
	    value: function calculateMagnitude() {
	      this.calculateDirectionalVectors();
	      var xVectorSquared = this.xVector * this.xVector;
	      var yVectorSquared = this.yVector * this.yVector;
	
	      this.magnitude = Math.sqrt(xVectorSquared + yVectorSquared);
	    }
	  }, {
	    key: 'moveTowardsTarget',
	    value: function moveTowardsTarget() {
	      this.calculateMagnitude();
	      var xUnitVector = this.xVector / this.magnitude;
	      var yUnitVector = this.yVector / this.magnitude;
	
	      this.x += xUnitVector * this.velocity;
	      this.y += yUnitVector * this.velocity;
	    }
	  }, {
	    key: 'triggerExplosion',
	    value: function triggerExplosion() {
	      return new Explosion(this.x, this.y);
	    }
	  }, {
	    key: 'drawMissile',
	    value: function drawMissile(ctx) {
	      ctx.save();
	      ctx.lineWidth = 2;
	      ctx.strokeStyle = 'white';
	      ctx.beginPath();
	      ctx.moveTo(this.xStart, this.yStart);
	      ctx.lineTo(this.x, this.y);
	      ctx.closePath();
	      ctx.stroke();
	      ctx.restore();
	    }
	  }]);
	
	  return Missile;
	}(GamePiece);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	module.exports = function GamePiece(x, y) {
	  _classCallCheck(this, GamePiece);
	
	  this.x = x;
	  this.y = y;
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GamePiece = __webpack_require__(7);
	
	module.exports = function (_GamePiece) {
	  _inherits(Explosion, _GamePiece);
	
	  function Explosion(x, y) {
	    _classCallCheck(this, Explosion);
	
	    var _this = _possibleConstructorReturn(this, (Explosion.__proto__ || Object.getPrototypeOf(Explosion)).call(this, x, y));
	
	    _this.radius = 1;
	    _this.maxRadius = 25;
	    _this.increment = 0.25;
	    return _this;
	  }
	
	  _createClass(Explosion, [{
	    key: 'updateRadius',
	    value: function updateRadius() {
	      this.radius += this.increment;
	      if (this.radius >= this.maxRadius) {
	        this.increment = -this.increment;
	      }
	    }
	  }, {
	    key: 'drawExplosion',
	    value: function drawExplosion(ctx) {
	      ctx.save();
	      ctx.beginPath();
	      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
	      ctx.closePath();
	      ctx.fillStyle = 'red';
	      ctx.fill();
	      ctx.restore();
	    }
	  }]);
	
	  return Explosion;
	}(GamePiece);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Missile = __webpack_require__(6);
	
	module.exports = function (_Missile) {
	  _inherits(EnemyMissile, _Missile);
	
	  function EnemyMissile(x, y, xTarget, yTarget) {
	    _classCallCheck(this, EnemyMissile);
	
	    var _this = _possibleConstructorReturn(this, (EnemyMissile.__proto__ || Object.getPrototypeOf(EnemyMissile)).call(this, x, y, xTarget, yTarget));
	
	    _this.targetIndex = 0;
	    _this.velocity = 0.5;
	    return _this;
	  }
	
	  _createClass(EnemyMissile, [{
	    key: 'randomlySelectTarget',
	    value: function randomlySelectTarget(buildingsArray) {
	      this.targetIndex = Math.floor(Math.random() * buildingsArray.length);
	      var target = buildingsArray[this.targetIndex];
	
	      var _ref = [target.x + target.width / 2, target.y];
	      this.xTarget = _ref[0];
	      this.yTarget = _ref[1];
	    }
	  }, {
	    key: 'destroyBuilding',
	    value: function destroyBuilding(buildingsArray) {
	      var _this2 = this;
	
	      if (this.y >= this.yTarget) {
	        buildingsArray.forEach(function (building, index, buildingsArray) {
	          if (building.x + building.width / 2 === _this2.xTarget) {
	            building.numberOfMissiles = 0;
	            buildingsArray.splice(index, 1);
	          }
	        });
	      }
	    }
	  }]);
	
	  return EnemyMissile;
	}(Missile);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Building = __webpack_require__(11);
	
	module.exports = function (_Building) {
	  _inherits(Base, _Building);
	
	  function Base(x, y, width, height) {
	    _classCallCheck(this, Base);
	
	    var _this = _possibleConstructorReturn(this, (Base.__proto__ || Object.getPrototypeOf(Base)).call(this, x, y, width, height));
	
	    _this.numberOfMissiles = 10;
	    return _this;
	  }
	
	  return Base;
	}(Building);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GamePiece = __webpack_require__(7);
	
	module.exports = function (_GamePiece) {
	  _inherits(Building, _GamePiece);
	
	  function Building(x, y, width, height) {
	    _classCallCheck(this, Building);
	
	    var _this = _possibleConstructorReturn(this, (Building.__proto__ || Object.getPrototypeOf(Building)).call(this, x, y));
	
	    _this.width = width;
	    _this.height = height;
	    return _this;
	  }
	
	  _createClass(Building, [{
	    key: 'drawBuilding',
	    value: function drawBuilding(ctx, src) {
	      var _this2 = this;
	
	      var buildingImage = new Image();
	      buildingImage.src = src;
	      buildingImage.onload = function () {
	        ctx.drawImage(buildingImage, _this2.x - 5, _this2.y - 10, _this2.width + 10, _this2.height + 10);
	      };
	      ctx.drawImage(buildingImage, this.x - 5, this.y - 10, this.width + 10, this.height + 10);
	    }
	  }]);
	
	  return Building;
	}(GamePiece);

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGM4YTVmOWNiZjQwMTRiMWJhMjciLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3M/MmFkOCIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9HYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9NaXNzaWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9HYW1lUGllY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0V4cGxvc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRW5lbXlNaXNzaWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9CYXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9CdWlsZGluZy5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiR2FtZSIsImdhbWVVSSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN0YXJ0U2NyZWVuIiwic3RhcnRCdG4iLCJwYXVzZVNjcmVlbiIsImFkdmFuY2VCdG4iLCJlbmRnYW1lU2NyZWVuIiwiZW5kZ2FtZUJ0biIsIndhdmUiLCJpbml0aWFscyIsInNjb3JlIiwiaGlnaFNjb3JlVGV4dCIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsImdhbWUiLCJ3aW5kb3ciLCJvbmxvYWQiLCJoaWdoU2NvcmUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiaW5uZXJUZXh0IiwiY3JlYXRlQnVpbGRpbmdzIiwiZHJhd0J1aWxkaW5ncyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdHlsZSIsImRpc3BsYXkiLCJjcmVhdGVFbmVteU1pc3NpbGVzIiwicmV0dXJuRmlyZSIsImFuaW1hdGUiLCJwYXVzZWQiLCJwYXJzZUludCIsInNsaWNlIiwidmFsdWUiLCJzZXRJdGVtIiwicmVzZXRHYW1lU3RhdGUiLCJldmVudCIsImF1ZGlvVGVzdCIsImJhc2VzIiwic29tZSIsImJhc2UiLCJudW1iZXJPZk1pc3NpbGVzIiwib2Zmc2V0WSIsImxhdW5jaEF1ZGlvIiwiQXVkaW8iLCJwbGF5IiwiY3JlYXRlUmV0dXJuRmlyZSIsIm9mZnNldFgiLCJkaXNwbGF5UGF1c2VTY3JlZW4iLCJkaXNwbGF5RW5kR2FtZVNjcmVlbiIsInVwZGF0ZVNjb3JlIiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJwcm9jZWR1cmUiLCJnYW1lT3ZlciIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJza3luZXQiLCJudW1iZXJPZkVuZW15TWlzc2lsZXMiLCJtYXhFbmVteUhlaWdodCIsImNvbnNvbGUiLCJsb2ciLCJidWlsZGluZ3MiLCJmb3JFYWNoIiwiYnVpbGRpbmciLCJrZXlDb2RlIiwiZm9jdXMiLCJNaXNzaWxlIiwiRW5lbXlNaXNzaWxlIiwiQmFzZSIsIkJ1aWxkaW5nIiwibW9kdWxlIiwiZXhwb3J0cyIsImVuZW15TWlzc2lsZXMiLCJleHBsb3Npb25zIiwibnVtYmVyT2ZCYXNlcyIsIm51bWJlck9mQ2l0aWVzIiwiYmFzZUltYWdlIiwiY2l0eUltYWdlIiwicHVzaCIsInNyYyIsInNhdmUiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsInJlc3RvcmUiLCJkcmF3QnVpbGRpbmciLCJpIiwieCIsIk1hdGgiLCJyYW5kb20iLCJ5IiwicmFuZG9tbHlTZWxlY3RUYXJnZXQiLCJlbmVteU1pc3NpbGUiLCJpbmRleCIsIm1vdmVUb3dhcmRzVGFyZ2V0IiwieVRhcmdldCIsImRlc3Ryb3lCdWlsZGluZyIsInNwbGljZSIsInRyaWdnZXJFeHBsb3Npb24iLCJkcmF3TWlzc2lsZSIsImV4cGxvc2lvbiIsInVwZGF0ZVJhZGl1cyIsInJhZGl1cyIsInNlZWtBbmREZXN0cm95IiwiZHgiLCJkeSIsImRpc3RhbmNlIiwic3FydCIsImRyYXdFeHBsb3Npb24iLCJ4VGFyZ2V0IiwiZmlyaW5nQmFzZSIsImZpbmQiLCJkZXRlcm1pbmVDbG9zZXN0RmlyaW5nQmFzZSIsIm1pc3NpbGUiLCJsZWZ0QmFzZSIsIm1pZEJhc2UiLCJyaWdodEJhc2UiLCJsZWZ0QW1tbyIsIm1pZEFtbW8iLCJyaWdodEFtbW8iLCJub0J1aWxkaW5ncyIsImxlbmd0aCIsIm5vRW5lbXlNaXNzaWxlcyIsIm5vRXhwbG9zaW9ucyIsIm9ubHlCYXNlc1JlbWFpbiIsImV2ZXJ5IiwiYWxsQ2l0aWVzRGVzdHJveWVkIiwidmVsb2NpdHkiLCJlbmVteUhhc0Rlc3Ryb3llZEJhc2VzIiwiaW5jcmVhc2VFbmVteU1pc3NpbGVzIiwicHJlcGFyZUJhc2VzRm9yTmV4dFdhdmUiLCJub0Jhc2VzUmVtYWluaW5nIiwiYmFzZUluQnVpbGRpbmdzQXJyYXkiLCJpbmNsdWRlcyIsInVwZGF0ZUVuZW15TWlzc2lsZXMiLCJ1cGRhdGVVc2VyTWlzc2lsZXMiLCJ1cGRhdGVFeHBsb3Npb25zIiwiZGV0ZWN0Q29sbGlzaW9ucyIsImRyYXdFbmVteU1pc3NpbGVzIiwiZHJhd1VzZXJNaXNzaWxlcyIsImRyYXdFeHBsb3Npb25zIiwiZGV0ZXJtaW5lR2FtZVN0YXRlIiwiR2FtZVBpZWNlIiwiRXhwbG9zaW9uIiwibWFnbml0dWRlIiwieFN0YXJ0IiwieVN0YXJ0IiwieFZlY3RvciIsInlWZWN0b3IiLCJjYWxjdWxhdGVEaXJlY3Rpb25hbFZlY3RvcnMiLCJ4VmVjdG9yU3F1YXJlZCIsInlWZWN0b3JTcXVhcmVkIiwiY2FsY3VsYXRlTWFnbml0dWRlIiwieFVuaXRWZWN0b3IiLCJ5VW5pdFZlY3RvciIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwiYmVnaW5QYXRoIiwibW92ZVRvIiwibGluZVRvIiwiY2xvc2VQYXRoIiwic3Ryb2tlIiwibWF4UmFkaXVzIiwiaW5jcmVtZW50IiwiYXJjIiwiUEkiLCJmaWxsIiwidGFyZ2V0SW5kZXgiLCJidWlsZGluZ3NBcnJh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QUFDM0JKLGFBQUlpSyxTQUFKLENBQWNGLGFBQWQsRUFBNkIsT0FBS3BGLENBQUwsR0FBUyxDQUF0QyxFQUF5QyxPQUFLRyxDQUFMLEdBQVMsRUFBbEQsRUFBc0QsT0FBS3ZDLEtBQUwsR0FBYSxFQUFuRSxFQUF1RSxPQUFLQyxNQUFMLEdBQWMsRUFBckY7QUFDRCxRQUZEO0FBR0F4QyxXQUFJaUssU0FBSixDQUFjRixhQUFkLEVBQTZCLEtBQUtwRixDQUFMLEdBQVMsQ0FBdEMsRUFBeUMsS0FBS0csQ0FBTCxHQUFTLEVBQWxELEVBQXNELEtBQUt2QyxLQUFMLEdBQWEsRUFBbkUsRUFBdUUsS0FBS0MsTUFBTCxHQUFjLEVBQXJGO0FBQ0Q7QUFkSDs7QUFBQTtBQUFBLEdBQXdDMEYsU0FBeEMsRSIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDhjOGE1ZjljYmY0MDE0YjFiYTI3IiwicmVxdWlyZSgnLi9zdHlsZS5jc3MnKVxuY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vR2FtZS5qcycpO1xuY29uc3QgZ2FtZVVJID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtdWknKVxuY29uc3Qgc3RhcnRTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQtc2NyZWVuJyk7XG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1zY3JlZW5fX2J0bicpO1xuY29uc3QgcGF1c2VTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGF1c2Utc2NyZWVuJyk7XG5jb25zdCBhZHZhbmNlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhdXNlLXNjcmVlbl9fYnRuJyk7XG5jb25zdCBlbmRnYW1lU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuZGdhbWUtc2NyZWVuJyk7XG5jb25zdCBlbmRnYW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuZGdhbWUtc2NyZWVuX19idG4nKTtcbmNvbnN0IHdhdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2F2ZScpO1xuY29uc3QgaW5pdGlhbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5pdGlhbHMnKTtcbmNvbnN0IHNjb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtc3RhdHNfX3Njb3JlJyk7XG5jb25zdCBoaWdoU2NvcmVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpZ2gtc2NvcmUnKVxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtY2FudmFzJyk7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbmxldCBnYW1lID0gbmV3IEdhbWUoY3R4KTtcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgbGV0IGhpZ2hTY29yZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoaWdoLXNjb3JlJyk7XG5cbiAgaGlnaFNjb3JlVGV4dC5pbm5lclRleHQgPSBoaWdoU2NvcmUgfHwgMDtcbiAgZ2FtZS5jcmVhdGVCdWlsZGluZ3MoKTtcbiAgZ2FtZS5kcmF3QnVpbGRpbmdzKCk7XG59XG5cbnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBzdGFydFNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBnYW1lVUkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgZ2FtZS5jcmVhdGVFbmVteU1pc3NpbGVzKCk7XG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJldHVybkZpcmUpO1xuICBhbmltYXRlKCk7XG59KTtcblxuYWR2YW5jZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgcGF1c2VTY3JlZW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgZ2FtZVVJLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGdhbWUucGF1c2VkID0gZmFsc2U7XG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJldHVybkZpcmUpO1xuICBhbmltYXRlKCk7XG59KTtcblxuZW5kZ2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKGdhbWUuc2NvcmUgPiBwYXJzZUludChoaWdoU2NvcmVUZXh0LmlubmVyVGV4dC5zbGljZSg0KSkpIHtcbiAgICBoaWdoU2NvcmVUZXh0LmlubmVyVGV4dCA9IGluaXRpYWxzLnZhbHVlICsgJyAnICsgZ2FtZS5zY29yZTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImhpZ2gtc2NvcmVcIiwgaGlnaFNjb3JlVGV4dC5pbm5lclRleHQpO1xuICAgIGluaXRpYWxzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbiAgZ2FtZS5yZXNldEdhbWVTdGF0ZSgpO1xuICBnYW1lLmNyZWF0ZUJ1aWxkaW5ncygpO1xuICBnYW1lLmRyYXdCdWlsZGluZ3MoKTtcbiAgZW5kZ2FtZVNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBzdGFydFNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmV0dXJuRmlyZSk7XG59KTtcblxuZnVuY3Rpb24gcmV0dXJuRmlyZShldmVudCkge1xuICBsZXQgYXVkaW9UZXN0ID0gZ2FtZS5iYXNlcy5zb21lKGJhc2UgPT4ge1xuICAgIHJldHVybiBiYXNlLm51bWJlck9mTWlzc2lsZXMgPiAwO1xuICB9KTtcblxuICBpZiAoYXVkaW9UZXN0ICYmIGV2ZW50Lm9mZnNldFkgPCA0MjApIHtcbiAgICBsZXQgbGF1bmNoQXVkaW8gPSBuZXcgQXVkaW8oJ2xpYi9hdWRpby9taXNzaWxlLWxhdW5jaC53YXYnKTtcblxuICAgIGxhdW5jaEF1ZGlvLnBsYXkoKTtcbiAgfVxuICBnYW1lLmNyZWF0ZVJldHVybkZpcmUoZXZlbnQub2Zmc2V0WCwgZXZlbnQub2Zmc2V0WSk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlQYXVzZVNjcmVlbigpIHtcbiAgd2F2ZS5pbm5lclRleHQgPSBnYW1lLndhdmUgLSAxO1xuICBnYW1lVUkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgcGF1c2VTY3JlZW4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlFbmRHYW1lU2NyZWVuKCkge1xuICBnYW1lVUkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgZW5kZ2FtZVNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgaWYgKGdhbWUuc2NvcmUgPiBwYXJzZUludChoaWdoU2NvcmVUZXh0LmlubmVyVGV4dC5zbGljZSg0KSkpIHtcbiAgICBpbml0aWFscy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVTY29yZSgpIHtcbiAgc2NvcmUuaW5uZXJUZXh0ID0gZ2FtZS5zY29yZTtcbn1cblxuZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gIGdhbWUucHJvY2VkdXJlKCk7XG5cbiAgdXBkYXRlU2NvcmUoKTtcblxuICBpZiAoZ2FtZS5wYXVzZWQpIHtcbiAgICBkaXNwbGF5UGF1c2VTY3JlZW4oKTtcbiAgfSBlbHNlIGlmIChnYW1lLmdhbWVPdmVyKSB7XG4gICAgZGlzcGxheUVuZEdhbWVTY3JlZW4oKTtcbiAgfVxuXG4gIGlmICghZ2FtZS5wYXVzZWQgJiYgIWdhbWUuZ2FtZU92ZXIpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gIH0gZWxzZSB7XG4gICAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmV0dXJuRmlyZSk7XG4gIH1cbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbmNvbnN0IHNreW5ldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5za3luZXQnKTtcbnNreW5ldC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCkgPT4ge1xuICBpZiAoc2t5bmV0LnZhbHVlID09PSAnYXJtYWdlZGRvbicpIHtcbiAgICBnYW1lLm51bWJlck9mRW5lbXlNaXNzaWxlcyA9IDUwMDtcbiAgICBnYW1lLm1heEVuZW15SGVpZ2h0ID0gLTEwMDA7XG4gICAgZ2FtZS5jcmVhdGVFbmVteU1pc3NpbGVzKCk7XG4gIH1cblxuICBjb25zb2xlLmxvZygnaW5pdGlhbHMnKVxuXG4gIGlmIChza3luZXQudmFsdWUgPT09ICdkYXJwYScpIHtcbiAgICBnYW1lLmJ1aWxkaW5ncy5mb3JFYWNoKGJ1aWxkaW5nID0+IHtcbiAgICAgIGlmIChidWlsZGluZy5udW1iZXJPZk1pc3NpbGVzKSB7XG4gICAgICAgIGJ1aWxkaW5nLm51bWJlck9mTWlzc2lsZXMgPSA1MDtcbiAgICAgICAgY29uc29sZS5sb2coYnVpbGRpbmcubnVtYmVyT2ZNaXNzaWxlcyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG4gIHNreW5ldC52YWx1ZSA9ICcnO1xufSk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsICgpID0+IHtcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDk3IHx8IGV2ZW50LmtleUNvZGUgPT09IDEwMCkge1xuICAgIHNreW5ldC5mb2N1cygpO1xuICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PUF1ZGlvd2lkZSk7XCIsIFwiXCJdKTtcblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKkJsb2NrcyBvcmdhbml6ZWQgaWRpb21hdGljYWxseSovXFxuLypwb3NpdGlvbiovXFxuLypEaXNwbGF5L0JveC1tb2RlbCovXFxuLypPdGhlciovXFxuXFxuaHRtbCxcXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kOiAjMDAwO1xcbiAgY29sb3I6ICNmZmY7XFxuICBmb250LWZhbWlseTogVmVyZGFuYSwgQXJpYWwsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE4cHg7XFxufVxcblxcbmgxIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiAjQ0MwMDA3O1xcbiAgdGV4dC1zaGFkb3c6IDJweCAycHggMnB4IHdoaXRlO1xcbiAgZm9udC1zaXplOiA2MHB4O1xcbiAgZm9udC1mYW1pbHk6ICdBdWRpb3dpZGUnLCBjdXJzaXZlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5oMiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5nYW1lLWJhY2tncm91bmQge1xcbiAgYmFja2dyb3VuZDogdXJsKFxcXCIvbGliL2ltYWdlcy9iYWNrZ3JvdW5kLmpwZ1xcXCIgKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmdhbWUtdWkge1xcbiAgaGVpZ2h0OiA1MDBweDtcXG4gIHdpZHRoOiA1MDBweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMTAwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgei1pbmRleDogMTAwO1xcbn1cXG5cXG4uc3RhcnQtc2NyZWVuLFxcbi5wYXVzZS1zY3JlZW4sXFxuLmVuZGdhbWUtc2NyZWVuIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDAwMDtcXG4gIG9wYWNpdHk6IDE7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcblxcbi5wYXVzZS1zY3JlZW4sXFxuLmVuZGdhbWUtc2NyZWVuLFxcbi5pbml0aWFscyB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uaW5pdGlhbHMge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgd2lkdGg6IDg0JTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJvdHRvbTogOHB4O1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5zdGFydC1zY3JlZW5fX2J0bixcXG4ucGF1c2Utc2NyZWVuX19idG4sXFxuLmVuZGdhbWUtc2NyZWVuX19idG4ge1xcbiAgYmFja2dyb3VuZDogcmVkO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBmb250LXNpemU6IDMwcHg7XFxuICBtYXJnaW46IDEwcHggYXV0bztcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB3aWR0aDogMjAwcHg7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLmNhbnZhcy1jb250YWluZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4uZ2FtZS1zdGF0cyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDAwO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICBtYXJnaW46IDEwMnB4IDAgMCAycHg7XFxufVxcblxcbi5nYW1lLXN0YXRzIHAge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMCA1cHg7XFxufVxcblxcbi51c2VyLWluc3RydWN0aW9ucyB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgY29sb3I6IHJlZDtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5cXG4uY2l0eS1pbmRpY2F0b3JzIHtcXG4gIGxldHRlci1zcGFjaW5nOiAxNXB4O1xcbiAgbWFyZ2luOiAwIDM4cHggMCA1NnB4O1xcbn1cXG5cXG4jZ2FtZS1jYW52YXMge1xcbiAgYmFja2dyb3VuZDogdXJsKFxcXCIvbGliL2ltYWdlcy9GdWxsIE1vb24gLSBiYWNrZ3JvdW5kLnBuZ1xcXCIpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyZXk7XFxuICBtYXJnaW46IDEwMHB4IDAgMCAwO1xcbn1cXG5cXG4ud2hpdGUge1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4jZ2FtZS1jYW52YXM6aG92ZXIge1xcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XFxufVxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcbi5za3luZXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogYmxhY2s7XFxuICBib3JkZXI6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLnNreW5ldDpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlciEuL3NyYy9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XG5cdFx0dmFyIG1lbW87XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRyZXR1cm4gbWVtbztcblx0XHR9O1xuXHR9LFxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qoc2VsZi5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xuXHR9KSxcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG5cdH0pLFxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2Vcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuXHRcdH1cblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XG5cdHJldHVybiBsaW5rRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG5cdFx0aWYobmV3T2JqKSB7XG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlcztcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdGlmKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XG5cblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKVxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IE1pc3NpbGUgPSByZXF1aXJlKCcuL01pc3NpbGUuanMnKVxuY29uc3QgRW5lbXlNaXNzaWxlID0gcmVxdWlyZSgnLi9FbmVteU1pc3NpbGUuanMnKTtcbmNvbnN0IEJhc2UgPSByZXF1aXJlKCcuL0Jhc2UuanMnKTtcbmNvbnN0IEJ1aWxkaW5nID0gcmVxdWlyZSgnLi9CdWlsZGluZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihjdHgpIHtcbiAgICB0aGlzLmJhc2VzID0gW11cbiAgICB0aGlzLmJ1aWxkaW5ncyA9IFtdO1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMuZW5lbXlNaXNzaWxlcyA9IFtdO1xuICAgIHRoaXMuZXhwbG9zaW9ucyA9IFtdO1xuICAgIHRoaXMuZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICB0aGlzLm1heEVuZW15SGVpZ2h0ID0gLTUwMDtcbiAgICB0aGlzLm51bWJlck9mQmFzZXMgPSAzO1xuICAgIHRoaXMubnVtYmVyT2ZDaXRpZXMgPSA2O1xuICAgIHRoaXMubnVtYmVyT2ZFbmVteU1pc3NpbGVzID0gMTA7XG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJldHVybkZpcmUgPSBbXTtcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLmJhc2VJbWFnZSA9IFwibGliL2ltYWdlcy9Ub3dlci5wbmdcIjtcbiAgICB0aGlzLmNpdHlJbWFnZSA9IFwibGliL2ltYWdlcy9Ib3VzZS5wbmdcIlxuICAgIHRoaXMud2F2ZSA9IDE7XG4gIH1cblxuICBjcmVhdGVCdWlsZGluZ3MoKSB7XG4gICAgdGhpcy5iYXNlcy5wdXNoKFxuICAgICAgbmV3IEJhc2UoMCwgNDUwLCA1MCwgNTApLFxuICAgICAgbmV3IEJhc2UoMjI1LCA0NTAsIDUwLCA1MCksXG4gICAgICBuZXcgQmFzZSg0NTAsIDQ1MCwgNTAsIDUwKVxuICAgICk7XG5cbiAgICB0aGlzLmJ1aWxkaW5ncy5wdXNoKFxuICAgICAgbmV3IEJ1aWxkaW5nKDc1LCA0NzUsIDI1LCAyNSksXG4gICAgICBuZXcgQnVpbGRpbmcoMTI1LCA0NzUsIDI1LCAyNSksXG4gICAgICBuZXcgQnVpbGRpbmcoMTc1LCA0NzUsIDI1LCAyNSksXG4gICAgICBuZXcgQnVpbGRpbmcoMzAwLCA0NzUsIDI1LCAyNSksXG4gICAgICBuZXcgQnVpbGRpbmcoMzUwLCA0NzUsIDI1LCAyNSksXG4gICAgICBuZXcgQnVpbGRpbmcoNDAwLCA0NzUsIDI1LCAyNSksXG4gICAgICAuLi50aGlzLmJhc2VzXG4gICAgKTtcbiAgfVxuXG4gIGRyYXdCdWlsZGluZ3Moc3JjKSB7XG4gICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjMkM2NTFFJztcbiAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCA0NzAsIDUwMCwgMzApO1xuICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICAgIHRoaXMuYnVpbGRpbmdzLmZvckVhY2goYnVpbGRpbmcgPT4ge1xuICAgICAgICBpZiAoYnVpbGRpbmcgaW5zdGFuY2VvZiBCYXNlKSB7XG4gICAgICAgICAgYnVpbGRpbmcuZHJhd0J1aWxkaW5nKHRoaXMuY3R4LCB0aGlzLmJhc2VJbWFnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVpbGRpbmcuZHJhd0J1aWxkaW5nKHRoaXMuY3R4LCB0aGlzLmNpdHlJbWFnZSlcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBjcmVhdGVFbmVteU1pc3NpbGVzKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXJPZkVuZW15TWlzc2lsZXM7IGkrKykge1xuICAgICAgbGV0IHggPSBNYXRoLnJhbmRvbSgpICogNTAwO1xuICAgICAgbGV0IHkgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5tYXhFbmVteUhlaWdodDtcblxuICAgICAgdGhpcy5lbmVteU1pc3NpbGVzW2ldID0gbmV3IEVuZW15TWlzc2lsZSh4LCB5KTtcbiAgICAgIHRoaXMuZW5lbXlNaXNzaWxlc1tpXS5yYW5kb21seVNlbGVjdFRhcmdldCh0aGlzLmJ1aWxkaW5ncyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlRW5lbXlNaXNzaWxlcygpIHtcbiAgICB0aGlzLmVuZW15TWlzc2lsZXMuZm9yRWFjaCgoZW5lbXlNaXNzaWxlLCBpbmRleCkgPT4ge1xuICAgICAgZW5lbXlNaXNzaWxlLm1vdmVUb3dhcmRzVGFyZ2V0KCk7XG4gICAgICBpZiAoZW5lbXlNaXNzaWxlLnkgPj0gZW5lbXlNaXNzaWxlLnlUYXJnZXQgKyA1KSB7XG4gICAgICAgIGVuZW15TWlzc2lsZS5kZXN0cm95QnVpbGRpbmcodGhpcy5idWlsZGluZ3MpO1xuICAgICAgICB0aGlzLmVuZW15TWlzc2lsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5leHBsb3Npb25zLnB1c2goZW5lbXlNaXNzaWxlLnRyaWdnZXJFeHBsb3Npb24oKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBkcmF3RW5lbXlNaXNzaWxlcyhjdHgpIHtcbiAgICB0aGlzLmVuZW15TWlzc2lsZXMuZm9yRWFjaChlbmVteU1pc3NpbGUgPT4ge1xuICAgICAgZW5lbXlNaXNzaWxlLmRyYXdNaXNzaWxlKGN0eCk7XG4gICAgfSk7XG4gIH1cblxuICBpbmNyZWFzZUVuZW15TWlzc2lsZXMoKSB7XG4gICAgdGhpcy5udW1iZXJPZkVuZW15TWlzc2lsZXMgKz0gNTtcbiAgICB0aGlzLm1heEVuZW15SGVpZ2h0IC09IDEwMDtcbiAgfVxuXG4gIHVwZGF0ZUV4cGxvc2lvbnMoKSB7XG4gICAgdGhpcy5leHBsb3Npb25zLmZvckVhY2goKGV4cGxvc2lvbiwgaW5kZXgpICA9PiB7XG4gICAgICBleHBsb3Npb24udXBkYXRlUmFkaXVzKCk7XG4gICAgICBpZiAoZXhwbG9zaW9uLnJhZGl1cyA8IDEpIHtcbiAgICAgICAgdGhpcy5leHBsb3Npb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBkZXRlY3RDb2xsaXNpb25zKCkge1xuICAgIHRoaXMuZXhwbG9zaW9ucy5mb3JFYWNoKChleHBsb3Npb24pID0+IHtcbiAgICAgIHRoaXMuc2Vla0FuZERlc3Ryb3koZXhwbG9zaW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNlZWtBbmREZXN0cm95KGV4cGxvc2lvbikge1xuICAgIHRoaXMuZW5lbXlNaXNzaWxlcy5mb3JFYWNoKChlbmVteU1pc3NpbGUsIGluZGV4KSA9PiB7XG4gICAgICBsZXQgZHggPSBlbmVteU1pc3NpbGUueCAtIGV4cGxvc2lvbi54O1xuICAgICAgbGV0IGR5ID0gZW5lbXlNaXNzaWxlLnkgLSBleHBsb3Npb24ueTtcbiAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cbiAgICAgIGlmIChkaXN0YW5jZSA8IGV4cGxvc2lvbi5yYWRpdXMpIHtcbiAgICAgICAgdGhpcy5lbmVteU1pc3NpbGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuZXhwbG9zaW9ucy5wdXNoKGVuZW15TWlzc2lsZS50cmlnZ2VyRXhwbG9zaW9uKCkpO1xuICAgICAgICBpZiAoZW5lbXlNaXNzaWxlLnkgPD0gNDIwKSB7XG4gICAgICAgICAgdGhpcy5zY29yZSArPSAxMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZHJhd0V4cGxvc2lvbnMoY3R4KSB7XG4gICAgdGhpcy5leHBsb3Npb25zLmZvckVhY2goZXhwbG9zaW9uICA9PiB7XG4gICAgICBleHBsb3Npb24uZHJhd0V4cGxvc2lvbihjdHgpO1xuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlUmV0dXJuRmlyZSh4VGFyZ2V0LCB5VGFyZ2V0KSB7XG4gICAgbGV0IGZpcmluZ0Jhc2UgPSB0aGlzLmJ1aWxkaW5ncy5maW5kKGJhc2UgPT5cbiAgICAgIGJhc2UgPT09IHRoaXMuZGV0ZXJtaW5lQ2xvc2VzdEZpcmluZ0Jhc2UoeFRhcmdldCwgeVRhcmdldCkpO1xuXG4gICAgaWYgKGZpcmluZ0Jhc2UpIHtcbiAgICAgIGxldCB4ID0gZmlyaW5nQmFzZS54ICsgZmlyaW5nQmFzZS53aWR0aCAvIDI7XG4gICAgICBsZXQgeSA9IGZpcmluZ0Jhc2UueTtcblxuICAgICAgZmlyaW5nQmFzZS5udW1iZXJPZk1pc3NpbGVzLS07XG4gICAgICB0aGlzLnJldHVybkZpcmUucHVzaChuZXcgTWlzc2lsZSh4LCB5LCB4VGFyZ2V0LCB5VGFyZ2V0KSk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVXNlck1pc3NpbGVzKCkge1xuICAgIHRoaXMucmV0dXJuRmlyZS5mb3JFYWNoKChtaXNzaWxlLCBpbmRleCkgPT4ge1xuICAgICAgbWlzc2lsZS5tb3ZlVG93YXJkc1RhcmdldCgpO1xuICAgICAgaWYgKG1pc3NpbGUueSA8PSBtaXNzaWxlLnlUYXJnZXQpIHtcbiAgICAgICAgdGhpcy5leHBsb3Npb25zLnB1c2gobWlzc2lsZS50cmlnZ2VyRXhwbG9zaW9uKCkpO1xuICAgICAgICB0aGlzLnJldHVybkZpcmUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGRyYXdVc2VyTWlzc2lsZXMoY3R4KSB7XG4gICAgdGhpcy5yZXR1cm5GaXJlLmZvckVhY2gobWlzc2lsZSA9PiB7XG4gICAgICBtaXNzaWxlLmRyYXdNaXNzaWxlKGN0eCk7XG4gICAgfSk7XG4gIH1cblxuICBkZXRlcm1pbmVDbG9zZXN0RmlyaW5nQmFzZSh4VGFyZ2V0LCB5VGFyZ2V0KSB7XG4gICAgbGV0IGxlZnRCYXNlLCBtaWRCYXNlLCByaWdodEJhc2U7XG5cbiAgICBbbGVmdEJhc2UsIG1pZEJhc2UsIHJpZ2h0QmFzZV0gPSB0aGlzLmJhc2VzO1xuXG4gICAgbGV0IGxlZnRBbW1vID0gbGVmdEJhc2UubnVtYmVyT2ZNaXNzaWxlcztcbiAgICBsZXQgbWlkQW1tbyA9IG1pZEJhc2UubnVtYmVyT2ZNaXNzaWxlcztcbiAgICBsZXQgcmlnaHRBbW1vID0gcmlnaHRCYXNlLm51bWJlck9mTWlzc2lsZXM7XG5cbiAgICBpZiAoeVRhcmdldCA8IDQyMCkge1xuICAgICAgaWYgKGxlZnRBbW1vID09PSAwICYmIG1pZEFtbW8gPT09IDAgJiYgcmlnaHRBbW1vID09PSAwKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIGlmICh4VGFyZ2V0IDw9IDUwMCAvIDMgJiYgbGVmdEFtbW8gPiAwKSB7XG4gICAgICAgIHJldHVybiBsZWZ0QmFzZTtcbiAgICAgIH0gZWxzZSBpZiAoeFRhcmdldCA8PSA1MDAgLyAzICYmIG1pZEFtbW8gPiAwKSB7XG4gICAgICAgIHJldHVybiBtaWRCYXNlO1xuICAgICAgfSBlbHNlIGlmICh4VGFyZ2V0IDw9IDUwMCAvIDMpIHtcbiAgICAgICAgcmV0dXJuIHJpZ2h0QmFzZTtcbiAgICAgIH0gZWxzZSBpZiAoeFRhcmdldCA+PSAxMDAwIC8gMyAmJiByaWdodEFtbW8gPiAwKSB7XG4gICAgICAgIHJldHVybiByaWdodEJhc2U7XG4gICAgICB9IGVsc2UgaWYgKHhUYXJnZXQgPj0gMTAwMCAvIDMgJiYgbWlkQW1tbyA+IDApIHtcbiAgICAgICAgcmV0dXJuIG1pZEJhc2U7XG4gICAgICB9IGVsc2UgaWYgKHhUYXJnZXQgPj0gMTAwMCAvIDMpIHtcbiAgICAgICAgcmV0dXJuIGxlZnRCYXNlO1xuICAgICAgfSBlbHNlIGlmICh4VGFyZ2V0ID4gNTAwIC8gMyAmJiB4VGFyZ2V0IDwgMTAwMCAvIDMgJiYgbWlkQW1tbyA+IDApIHtcbiAgICAgICAgcmV0dXJuIG1pZEJhc2U7XG4gICAgICB9IGVsc2UgaWYgKHhUYXJnZXQgPD0gMjUwICYmIGxlZnRBbW1vID4gMCkge1xuICAgICAgICByZXR1cm4gbGVmdEJhc2U7XG4gICAgICB9IGVsc2UgaWYgKHhUYXJnZXQgPD0gMjUwKSB7XG4gICAgICAgIHJldHVybiByaWdodEJhc2U7XG4gICAgICB9IGVsc2UgaWYgKHhUYXJnZXQgPiAyNTAgJiYgcmlnaHRBbW1vID4gMCkge1xuICAgICAgICByZXR1cm4gcmlnaHRCYXNlO1xuICAgICAgfSBlbHNlIGlmICh4VGFyZ2V0ID4gMjUwKSB7XG4gICAgICAgIHJldHVybiBsZWZ0QmFzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRldGVybWluZUdhbWVTdGF0ZSgpIHtcbiAgICBsZXQgbm9CdWlsZGluZ3MgPSB0aGlzLmJ1aWxkaW5ncy5sZW5ndGggPT09IDA7XG4gICAgbGV0IG5vRW5lbXlNaXNzaWxlcyA9IHRoaXMuZW5lbXlNaXNzaWxlcy5sZW5ndGggPT09IDA7XG4gICAgbGV0IG5vRXhwbG9zaW9ucyA9IHRoaXMuZXhwbG9zaW9ucy5sZW5ndGggPT09IDA7XG4gICAgbGV0IG9ubHlCYXNlc1JlbWFpbiA9IHRoaXMuYnVpbGRpbmdzLmV2ZXJ5KGJ1aWxkaW5nID0+IHtcbiAgICAgIHJldHVybiBidWlsZGluZyBpbnN0YW5jZW9mIEJhc2U7XG4gICAgfSk7XG4gICAgbGV0IGFsbENpdGllc0Rlc3Ryb3llZCA9IG9ubHlCYXNlc1JlbWFpbiB8fCBub0J1aWxkaW5ncztcblxuICAgIGlmIChvbmx5QmFzZXNSZW1haW4gfHwgYWxsQ2l0aWVzRGVzdHJveWVkKSB7XG4gICAgICB0aGlzLmVuZW15TWlzc2lsZXMuZm9yRWFjaChtaXNzaWxlID0+IHtcbiAgICAgICAgbWlzc2lsZS52ZWxvY2l0eSA9IDIwO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuZW5lbXlIYXNEZXN0cm95ZWRCYXNlcygpXG4gICAgaWYgKG5vRW5lbXlNaXNzaWxlcyAmJiBub0V4cGxvc2lvbnMgJiYgYWxsQ2l0aWVzRGVzdHJveWVkICkge1xuICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChub0VuZW15TWlzc2lsZXMgJiYgbm9FeHBsb3Npb25zKSB7XG4gICAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgICB0aGlzLndhdmUrKztcbiAgICAgIHRoaXMuaW5jcmVhc2VFbmVteU1pc3NpbGVzKCk7XG4gICAgICB0aGlzLnByZXBhcmVCYXNlc0Zvck5leHRXYXZlKCk7XG4gICAgICB0aGlzLmNyZWF0ZUVuZW15TWlzc2lsZXMoKTtcbiAgICB9XG4gIH1cblxuICBlbmVteUhhc0Rlc3Ryb3llZEJhc2VzKCkge1xuICAgIGxldCBub0Jhc2VzUmVtYWluaW5nID0gdGhpcy5idWlsZGluZ3MuZXZlcnkoYnVpbGRpbmdzID0+IHtcbiAgICAgIHJldHVybiAhKGJ1aWxkaW5ncyBpbnN0YW5jZW9mIEJhc2UpO1xuICAgIH0pXG5cbiAgICBpZiAobm9CYXNlc1JlbWFpbmluZykge1xuICAgICAgdGhpcy5lbmVteU1pc3NpbGVzLmZvckVhY2gobWlzc2lsZSA9PiB7XG4gICAgICAgIG1pc3NpbGUudmVsb2NpdHkgPSAyMDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByZXBhcmVCYXNlc0Zvck5leHRXYXZlKCkge1xuICAgIHRoaXMuYmFzZXMuZm9yRWFjaChiYXNlID0+IHtcbiAgICAgIGxldCBiYXNlSW5CdWlsZGluZ3NBcnJheSA9IHRoaXMuYnVpbGRpbmdzLmluY2x1ZGVzKGJhc2UpO1xuXG4gICAgICBiYXNlLm51bWJlck9mTWlzc2lsZXMgPSAxMDtcbiAgICAgIGlmICghYmFzZUluQnVpbGRpbmdzQXJyYXkpIHtcbiAgICAgICAgdGhpcy5idWlsZGluZ3MucHVzaChiYXNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0R2FtZVN0YXRlKCkge1xuICAgIHRoaXMubnVtYmVyT2ZFbmVteU1pc3NpbGVzID0gMTA7XG4gICAgdGhpcy5tYXhFbmVteUhlaWdodCA9IC01MDA7XG4gICAgdGhpcy5idWlsZGluZ3MgPSBbXTtcbiAgICB0aGlzLmJhc2VzID0gW107XG4gICAgdGhpcy53YXZlID0gMTtcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLmdhbWVPdmVyID0gZmFsc2U7XG4gIH1cblxuICBwcm9jZWR1cmUoKSB7XG4gICAgdGhpcy51cGRhdGVFbmVteU1pc3NpbGVzKCk7XG5cbiAgICB0aGlzLnVwZGF0ZVVzZXJNaXNzaWxlcygpXG5cbiAgICB0aGlzLnVwZGF0ZUV4cGxvc2lvbnMoKTtcblxuICAgIHRoaXMuZGV0ZWN0Q29sbGlzaW9ucygpO1xuXG4gICAgdGhpcy5kcmF3QnVpbGRpbmdzKCk7XG5cbiAgICB0aGlzLmRyYXdFbmVteU1pc3NpbGVzKHRoaXMuY3R4KTtcblxuICAgIHRoaXMuZHJhd1VzZXJNaXNzaWxlcyh0aGlzLmN0eCk7XG5cbiAgICB0aGlzLmRyYXdFeHBsb3Npb25zKHRoaXMuY3R4KTtcblxuICAgIHRoaXMuZGV0ZXJtaW5lR2FtZVN0YXRlKCk7XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvR2FtZS5qcyIsImNvbnN0IEdhbWVQaWVjZSA9IHJlcXVpcmUoJy4vR2FtZVBpZWNlLmpzJyk7XG5jb25zdCBFeHBsb3Npb24gPSByZXF1aXJlKCcuL0V4cGxvc2lvbi5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIE1pc3NpbGUgZXh0ZW5kcyBHYW1lUGllY2Uge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB4VGFyZ2V0LCB5VGFyZ2V0KSB7XG4gICAgc3VwZXIoeCwgeSk7XG4gICAgdGhpcy5tYWduaXR1ZGUgPSAwO1xuICAgIHRoaXMueFN0YXJ0ID0geDtcbiAgICB0aGlzLnlTdGFydCA9IHk7XG4gICAgdGhpcy54VGFyZ2V0ID0geFRhcmdldDtcbiAgICB0aGlzLnlUYXJnZXQgPSB5VGFyZ2V0O1xuICAgIHRoaXMudmVsb2NpdHkgPSAyO1xuICAgIHRoaXMueFZlY3RvciA9IDA7XG4gICAgdGhpcy55VmVjdG9yID0gMDtcbiAgfVxuXG4gIGNhbGN1bGF0ZURpcmVjdGlvbmFsVmVjdG9ycygpIHtcbiAgICB0aGlzLnhWZWN0b3IgPSB0aGlzLnhUYXJnZXQgLSB0aGlzLnhTdGFydDtcbiAgICB0aGlzLnlWZWN0b3IgPSB0aGlzLnlUYXJnZXQgLSB0aGlzLnlTdGFydDtcbiAgfVxuXG4gIGNhbGN1bGF0ZU1hZ25pdHVkZSgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZURpcmVjdGlvbmFsVmVjdG9ycygpO1xuICAgIGxldCB4VmVjdG9yU3F1YXJlZCA9IHRoaXMueFZlY3RvciAqIHRoaXMueFZlY3RvcjtcbiAgICBsZXQgeVZlY3RvclNxdWFyZWQgPSB0aGlzLnlWZWN0b3IgKiB0aGlzLnlWZWN0b3I7XG5cbiAgICB0aGlzLm1hZ25pdHVkZSA9IE1hdGguc3FydCh4VmVjdG9yU3F1YXJlZCArIHlWZWN0b3JTcXVhcmVkKTtcbiAgfVxuXG4gIG1vdmVUb3dhcmRzVGFyZ2V0KCkge1xuICAgIHRoaXMuY2FsY3VsYXRlTWFnbml0dWRlKCk7XG4gICAgbGV0IHhVbml0VmVjdG9yID0gdGhpcy54VmVjdG9yIC8gdGhpcy5tYWduaXR1ZGU7XG4gICAgbGV0IHlVbml0VmVjdG9yID0gdGhpcy55VmVjdG9yIC8gdGhpcy5tYWduaXR1ZGU7XG5cbiAgICB0aGlzLnggKz0geFVuaXRWZWN0b3IgKiB0aGlzLnZlbG9jaXR5O1xuICAgIHRoaXMueSArPSB5VW5pdFZlY3RvciAqIHRoaXMudmVsb2NpdHk7XG4gIH1cblxuICB0cmlnZ2VyRXhwbG9zaW9uKCkge1xuICAgIHJldHVybiBuZXcgRXhwbG9zaW9uKHRoaXMueCwgdGhpcy55KTtcbiAgfVxuXG4gIGRyYXdNaXNzaWxlKGN0eCkge1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ3doaXRlJztcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbyh0aGlzLnhTdGFydCwgdGhpcy55U3RhcnQpO1xuICAgIGN0eC5saW5lVG8odGhpcy54LCB0aGlzLnkpXG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL01pc3NpbGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEdhbWVQaWVjZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9HYW1lUGllY2UuanMiLCJjb25zdCBHYW1lUGllY2UgPSByZXF1aXJlKCcuL0dhbWVQaWVjZS5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEV4cGxvc2lvbiBleHRlbmRzIEdhbWVQaWVjZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICBzdXBlcih4LCB5KTtcbiAgICB0aGlzLnJhZGl1cyA9IDE7XG4gICAgdGhpcy5tYXhSYWRpdXMgPSAyNTtcbiAgICB0aGlzLmluY3JlbWVudCA9IDAuMjU7XG4gIH1cblxuICB1cGRhdGVSYWRpdXMoKSB7XG4gICAgdGhpcy5yYWRpdXMgKz0gdGhpcy5pbmNyZW1lbnQ7XG4gICAgaWYgKHRoaXMucmFkaXVzID49IHRoaXMubWF4UmFkaXVzKSB7XG4gICAgICB0aGlzLmluY3JlbWVudCA9IC10aGlzLmluY3JlbWVudDtcbiAgICB9XG4gIH1cblxuICBkcmF3RXhwbG9zaW9uKGN0eCkge1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSwgdHJ1ZSk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvRXhwbG9zaW9uLmpzIiwiY29uc3QgTWlzc2lsZSA9IHJlcXVpcmUoJy4vTWlzc2lsZS5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEVuZW15TWlzc2lsZSBleHRlbmRzIE1pc3NpbGUge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB4VGFyZ2V0LCB5VGFyZ2V0KSB7XG4gICAgc3VwZXIoeCwgeSwgeFRhcmdldCwgeVRhcmdldCk7XG4gICAgdGhpcy50YXJnZXRJbmRleCA9IDBcbiAgICB0aGlzLnZlbG9jaXR5ID0gMC41O1xuICB9XG5cbiAgcmFuZG9tbHlTZWxlY3RUYXJnZXQoYnVpbGRpbmdzQXJyYXkpIHtcbiAgICB0aGlzLnRhcmdldEluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYnVpbGRpbmdzQXJyYXkubGVuZ3RoKTtcbiAgICBsZXQgdGFyZ2V0ID0gYnVpbGRpbmdzQXJyYXlbdGhpcy50YXJnZXRJbmRleF07XG5cbiAgICBbdGhpcy54VGFyZ2V0LCB0aGlzLnlUYXJnZXRdID0gW3RhcmdldC54ICsgdGFyZ2V0LndpZHRoIC8gMiwgdGFyZ2V0LnldO1xuICB9XG5cbiAgZGVzdHJveUJ1aWxkaW5nKGJ1aWxkaW5nc0FycmF5KSB7XG4gICAgaWYgKHRoaXMueSA+PSB0aGlzLnlUYXJnZXQpIHtcbiAgICAgIGJ1aWxkaW5nc0FycmF5LmZvckVhY2goKGJ1aWxkaW5nLCBpbmRleCwgYnVpbGRpbmdzQXJyYXkpID0+IHtcbiAgICAgICAgaWYgKGJ1aWxkaW5nLnggKyBidWlsZGluZy53aWR0aCAvIDIgPT09IHRoaXMueFRhcmdldCkge1xuICAgICAgICAgIGJ1aWxkaW5nLm51bWJlck9mTWlzc2lsZXMgPSAwO1xuICAgICAgICAgIGJ1aWxkaW5nc0FycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9FbmVteU1pc3NpbGUuanMiLCJjb25zdCBCdWlsZGluZyA9IHJlcXVpcmUoJy4vQnVpbGRpbmcuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBCYXNlIGV4dGVuZHMgQnVpbGRpbmcge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgdGhpcy5udW1iZXJPZk1pc3NpbGVzID0gMTA7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9CYXNlLmpzIiwiY29uc3QgR2FtZVBpZWNlID0gcmVxdWlyZSgnLi9HYW1lUGllY2UuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBCdWlsZGluZyBleHRlbmRzIEdhbWVQaWVjZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcih4LCB5KTtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBkcmF3QnVpbGRpbmcoY3R4LCBzcmMpIHtcbiAgICBsZXQgYnVpbGRpbmdJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGJ1aWxkaW5nSW1hZ2Uuc3JjID0gc3JjO1xuICAgIGJ1aWxkaW5nSW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgY3R4LmRyYXdJbWFnZShidWlsZGluZ0ltYWdlLCB0aGlzLnggLSA1LCB0aGlzLnkgLSAxMCwgdGhpcy53aWR0aCArIDEwLCB0aGlzLmhlaWdodCArIDEwKTtcbiAgICB9XG4gICAgY3R4LmRyYXdJbWFnZShidWlsZGluZ0ltYWdlLCB0aGlzLnggLSA1LCB0aGlzLnkgLSAxMCwgdGhpcy53aWR0aCArIDEwLCB0aGlzLmhlaWdodCArIDEwKTtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9CdWlsZGluZy5qcyJdLCJzb3VyY2VSb290IjoiIn0=