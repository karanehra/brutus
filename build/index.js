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

/***/ "./src/index.router.ts":
/*!*****************************!*\
  !*** ./src/index.router.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar schema_1 = __webpack_require__(/*! ./utils/schema */ \"./src/utils/schema.ts\");\nvar feed_worker_1 = __webpack_require__(/*! ./utils/feed.worker */ \"./src/utils/feed.worker.ts\");\nvar express = __webpack_require__(/*! express */ \"express\");\nvar IndexRouter = /** @class */ (function () {\n    function IndexRouter(worker_queue) {\n        var _this = this;\n        this.setupRoutes = function () {\n            _this.router.get(\"/\", function (req, res) {\n                res.send({\n                    message: \"hello worlds\"\n                });\n            });\n            _this.router.get(\"/abc\", function (req, res) {\n                res.send({\n                    message: \"hello worlds\"\n                });\n            });\n            _this.router.post(\"/add_feeds\", function (req, res) {\n                req.body.urls.forEach(function (url) {\n                    var feed_worker = new feed_worker_1[\"default\"](\"worker\", url);\n                    _this.main_queue.add_worker(feed_worker);\n                });\n                res.send({\n                    message: \"hello\"\n                });\n            });\n            _this.router.get(\"/get_feeds\", function (req, res) {\n                schema_1.Feed.find({}).exec(function (err, data) {\n                    res.send({\n                        message: data\n                    });\n                });\n            });\n        };\n        this.getRouter = function () {\n            return _this.router;\n        };\n        this.router = express.Router();\n        this.main_queue = worker_queue;\n    }\n    return IndexRouter;\n}());\nexports[\"default\"] = IndexRouter;\n\n\n//# sourceURL=webpack:///./src/index.router.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nvar queue_1 = __webpack_require__(/*! ./utils/queue */ \"./src/utils/queue.ts\");\nvar express = __webpack_require__(/*! express */ \"express\");\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nvar index_router_1 = __webpack_require__(/*! ./index.router */ \"./src/index.router.ts\");\nvar app = express();\napp.use(bodyParser.json());\nvar Main = /** @class */ (function () {\n    function Main() {\n        var _this = this;\n        this.is_running = false;\n        this.worker_queue = new queue_1[\"default\"]();\n        this.setupDatabase = function () {\n            mongoose.connect(\"mongodb://127.0.0.1:27017/test\", {\n                useNewUrlParser: true\n            });\n        };\n        this.setupRouting = function () {\n            app.listen(3000, function () {\n                console.log(\"server started at http://localhost:3000\");\n            });\n            var router = new index_router_1[\"default\"](_this.worker_queue);\n            router.setupRoutes();\n            app.use('/', router.getRouter());\n        };\n    }\n    return Main;\n}());\nexports[\"default\"] = Main;\nvar main = new Main();\nmain.setupDatabase();\nmain.setupRouting();\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/utils/feed.worker.ts":
/*!**********************************!*\
  !*** ./src/utils/feed.worker.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nexports.__esModule = true;\nvar Parser = __webpack_require__(/*! rss-parser */ \"rss-parser\");\nvar schema_1 = __webpack_require__(/*! ./schema */ \"./src/utils/schema.ts\");\nvar logger_1 = __webpack_require__(/*! ./logger */ \"./src/utils/logger.ts\");\nvar FeedWorker = /** @class */ (function () {\n    function FeedWorker(name, url) {\n        var _this = this;\n        this.is_executing = false;\n        this.is_finished = false;\n        this.parser = new Parser();\n        this.parse = function () { return __awaiter(_this, void 0, void 0, function () {\n            var feed, feed_object, e_1;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        this.logger.info(\"Parsing feed: \" + this.feed_url);\n                        _a.label = 1;\n                    case 1:\n                        _a.trys.push([1, 3, , 4]);\n                        return [4 /*yield*/, this.parser.parseURL(this.feed_url)];\n                    case 2:\n                        feed = _a.sent();\n                        feed_object = new schema_1.Feed({\n                            name: feed.title,\n                            url: feed.feedUrl\n                        });\n                        feed_object.save();\n                        this.logger.success(\"Parsed successfully: \" + this.feed_url);\n                        return [3 /*break*/, 4];\n                    case 3:\n                        e_1 = _a.sent();\n                        console.log(e_1);\n                        this.logger.error(\"Parse Error: \" + this.feed_url);\n                        this.cb_on_finish();\n                        return [3 /*break*/, 4];\n                    case 4: return [2 /*return*/];\n                }\n            });\n        }); };\n        this.writeArticlesToDatabase = function (items) {\n            _this.logger.info(\"Adding articles from: \" + _this.feed_url);\n            items.forEach(function (item) {\n                var article_object = new schema_1.Article({\n                    title: item.title,\n                    content: item.content,\n                    content_snippet: item.contentSnippet,\n                    link: item.link\n                });\n                article_object.save().then(function () {\n                    if (items.indexOf(item) == items.length - 1) {\n                        _this.logger.success(\"Articles added from: \" + _this.feed_url);\n                        _this.cb_on_finish();\n                        _this.is_executing = false;\n                        _this.is_finished = true;\n                    }\n                });\n            });\n        };\n        this.execute = function (cb) {\n            _this.is_executing = true;\n            _this.cb_on_finish = cb;\n            _this.parse();\n        };\n        this.name = name;\n        this.feed_url = url;\n        this.logger = new logger_1[\"default\"]();\n    }\n    return FeedWorker;\n}());\nexports[\"default\"] = FeedWorker;\n\n\n//# sourceURL=webpack:///./src/utils/feed.worker.ts?");

/***/ }),

/***/ "./src/utils/logger.ts":
/*!*****************************!*\
  !*** ./src/utils/logger.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar schema_1 = __webpack_require__(/*! ./schema */ \"./src/utils/schema.ts\");\nvar Logger = /** @class */ (function () {\n    function Logger() {\n        this.info = function (desciprtion) {\n            var log_object = new schema_1.Log({\n                desciprtion: desciprtion,\n                type: 'INFO'\n            });\n            log_object.save();\n        };\n        this.success = function (description) {\n            var log_object = new schema_1.Log({\n                desciprtion: description,\n                type: 'SUCCESS'\n            });\n            log_object.save();\n        };\n        this.error = function (description) {\n            var log_object = new schema_1.Log({\n                desciprtion: description,\n                type: 'ERROR'\n            });\n            log_object.save();\n        };\n    }\n    return Logger;\n}());\nexports[\"default\"] = Logger;\n\n\n//# sourceURL=webpack:///./src/utils/logger.ts?");

/***/ }),

/***/ "./src/utils/queue.ts":
/*!****************************!*\
  !*** ./src/utils/queue.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar WorkerQueue = /** @class */ (function () {\n    function WorkerQueue() {\n        this.is_running = false;\n        this.workers = [];\n        this.next = this.next.bind(this);\n    }\n    WorkerQueue.prototype.next = function () {\n        this.is_running = true;\n        var worker = this.workers.shift();\n        if (worker) {\n            worker.execute(this.next);\n        }\n    };\n    WorkerQueue.prototype.add_worker = function (worker) {\n        this.workers.push(worker);\n        if (!this.is_running) {\n            this.next();\n        }\n    };\n    return WorkerQueue;\n}());\nexports[\"default\"] = WorkerQueue;\n\n\n//# sourceURL=webpack:///./src/utils/queue.ts?");

/***/ }),

/***/ "./src/utils/schema.ts":
/*!*****************************!*\
  !*** ./src/utils/schema.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nvar FeedSchema = new mongoose.Schema({\n    name: String,\n    url: String,\n    added: {\n        type: Date,\n        \"default\": Date.now()\n    },\n    id: String\n});\nexports.Feed = mongoose.model('Feed', FeedSchema);\nvar ArticleSchema = new mongoose.Schema({\n    title: String,\n    content: String,\n    content_snippet: String,\n    link: String\n});\nexports.Article = mongoose.model('Article', ArticleSchema);\nvar LogSchema = new mongoose.Schema({\n    description: String,\n    type: {\n        type: String,\n        \"enum\": ['INFO', 'ERROR', 'SUCCESS'],\n        \"default\": 'INFO'\n    },\n    timestamp: {\n        type: Date,\n        \"default\": Date.now()\n    }\n});\nexports.Log = mongoose.model('Log', LogSchema);\n\n\n//# sourceURL=webpack:///./src/utils/schema.ts?");

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