/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/feed.worker.ts":
/*!****************************!*\
  !*** ./src/feed.worker.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nexports.__esModule = true;\nvar Parser = __webpack_require__(/*! rss-parser */ \"rss-parser\");\nvar schema_1 = __webpack_require__(/*! ./schema */ \"./src/schema.ts\");\nvar FeedWorker = /** @class */ (function () {\n    function FeedWorker(name, url) {\n        var _this = this;\n        this.is_executing = false;\n        this.is_finished = false;\n        this.parser = new Parser();\n        this.parse = function () { return __awaiter(_this, void 0, void 0, function () {\n            var feed, feed_object;\n            var _this = this;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        console.log(this.feed_url);\n                        return [4 /*yield*/, this.parser.parseURL(this.feed_url)];\n                    case 1:\n                        feed = _a.sent();\n                        console.log(feed);\n                        feed_object = new schema_1.Feed({\n                            name: feed.title,\n                            url: feed.feedUrl,\n                        });\n                        feed_object.save().then(function () {\n                            console.log(\"added\");\n                            _this.is_executing = false;\n                            _this.is_finished = true;\n                        });\n                        return [2 /*return*/];\n                }\n            });\n        }); };\n        this.execute = function () {\n            console.log(\"worker executing\");\n            _this.is_executing = true;\n            _this.parse();\n        };\n        this.name = name;\n        this.feed_url = url;\n    }\n    return FeedWorker;\n}());\nexports[\"default\"] = FeedWorker;\n\n\n//# sourceURL=webpack:///./src/feed.worker.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\nexports.__esModule = true;\nvar express = __webpack_require__(/*! express */ \"express\");\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nvar feed_worker_1 = __webpack_require__(/*! ./feed.worker */ \"./src/feed.worker.ts\");\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nvar schema_1 = __webpack_require__(/*! ./schema */ \"./src/schema.ts\");\nvar Parser = __webpack_require__(/*! rss-parser */ \"rss-parser\");\nvar parser = new Parser();\nvar Main = /** @class */ (function () {\n    function Main() {\n        var _this = this;\n        this.is_running = false;\n        this.task_ids = [];\n        this.worker_queue = [];\n        this.app = express();\n        this.PORT = 3000;\n        this.runMainLoop = function () {\n            _this.is_running = true;\n            _this.worker_queue.forEach(function (worker) {\n                worker.execute();\n            });\n            // while (this.is_running) {\n            //   this.worker_queue.forEach(worker => {\n            //     if (worker.is_executing) {\n            //     } else {\n            //       worker.execute();\n            //       // if(worker.is_finished){\n            //       //   this.worker_queue.splice(this.worker_queue.indexOf(worker),1);\n            //       if (this.worker_queue.length == 0) {\n            //         this.is_running = false;\n            //         console.log(\"tasks done\");\n            //       }\n            //       // } else {\n            //       //   worker.execute();\n            //       // }\n            //     }\n            //   });\n            // }\n        };\n        this.addWorker = function (worker) {\n            _this.worker_queue.push(worker);\n            console.log(\"Worker queue has \" +\n                _this.worker_queue.length +\n                \" items. Waiting for execution\");\n            if (!_this.is_running) {\n                _this.runMainLoop();\n            }\n        };\n        this.setupDatabase = function () {\n            mongoose.connect(\"mongodb://127.0.0.1:27017/test\", {\n                useNewUrlParser: true\n            });\n        };\n        this.setupRoutes = function () {\n            _this.app.get(\"/\", function (req, res) {\n                res.send({\n                    message: \"hello worlds\"\n                });\n            });\n            _this.app.get(\"/abc\", function (req, res) {\n                res.send({\n                    message: \"hello worlds\"\n                });\n            });\n            _this.app.post(\"/add_feed\", function (req, res) {\n                var feed_worker = new feed_worker_1[\"default\"](\"worker\", req.body.url);\n                _this.addWorker(feed_worker);\n                res.send({\n                    message: \"hello\"\n                });\n            });\n            _this.app.get(\"/get_feeds\", function (req, res) {\n                schema_1.Feed.find({}).exec(function (err, data) {\n                    res.send({\n                        message: data\n                    });\n                });\n            });\n            _this.app.get(\"/start_execution\", function (req, res) {\n                if (_this.worker_queue.length == 0) {\n                    res.send({\n                        message: \"No workers in queue\"\n                    });\n                }\n                else {\n                    _this.runMainLoop();\n                    res.send({\n                        message: \"Execution started\"\n                    });\n                }\n            });\n        };\n        this.startServer = function () {\n            if (__webpack_require__.c[__webpack_require__.s] === module) {\n                _this.app.listen(_this.PORT, function () {\n                    console.log(\"server started at http://localhost:\" + _this.PORT);\n                });\n            }\n        };\n        this.app.use(bodyParser.json());\n    }\n    return Main;\n}());\nexports[\"default\"] = Main;\nvar main = new Main();\nmain.setupRoutes();\nmain.startServer();\nmain.setupDatabase();\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/schema.ts":
/*!***********************!*\
  !*** ./src/schema.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nvar FeedSchema = new mongoose.Schema({\n    name: String,\n    url: String,\n    added: {\n        type: Date,\n        \"default\": Date.now()\n    },\n    id: String\n});\nexports.Feed = mongoose.model('Feed', FeedSchema);\n\n\n//# sourceURL=webpack:///./src/schema.ts?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "rss-parser":
/*!*****************************!*\
  !*** external "rss-parser" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"rss-parser\");\n\n//# sourceURL=webpack:///external_%22rss-parser%22?");

/***/ })

/******/ });