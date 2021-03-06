"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nanoid_1 = require("nanoid");
var react_1 = __importDefault(require("react"));
var server_1 = __importDefault(require("react-dom/server"));
var MessageType_1 = require("./definitions/messages/MessageType");
var Plugin = /** @class */ (function () {
    function Plugin() {
        var _this = this;
        this.callbacks = {};
        this.settings = {};
        this.events = {};
        this.onSettingsChange = function (oldSettings, newSettings) { };
        this._sendMessage = function (message) {
            if (process === null || process === void 0 ? void 0 : process.send)
                process.send(message);
        };
        /** Settings */
        this.getSettings = function () { return _this.settings; };
        this.provideSettingsDeclaration = function (settingsDeclaration) {
            _this._sendMessage({
                type: MessageType_1.MessageType.SETTINGS,
                settingsDeclaration: settingsDeclaration,
            });
        };
        /** Events */
        this.registerEvents = function (events) {
            _this.events = events;
            _this._sendMessage({
                type: MessageType_1.MessageType.EVENTS_REGISTER,
                eventsName: Object.keys(events),
            });
        };
        this.registerSettingsPage = function (Component) {
            console.log("Component:", Component);
            var test = react_1.default.createElement(Component, null);
            console.log("test:", test);
            _this._sendMessage({
                type: "settings-page",
                component: server_1.default.renderToString(test),
            });
        };
        this.callMethod = function (method) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var id = nanoid_1.nanoid();
                            _this.callbacks[id] = function (err, res) {
                                if (err)
                                    reject(err);
                                else
                                    resolve(res);
                            };
                            _this._sendMessage({
                                type: MessageType_1.MessageType.CALL,
                                id: id,
                                method: method,
                                data: args,
                            });
                        })];
                });
            });
        };
        require("net").createServer().listen();
        process.on("message", function (message) {
            if (message.type === MessageType_1.MessageType.CALL) {
                _this.callbacks[message.id](message.err, message.res);
            }
            else if (message.type === MessageType_1.MessageType.SETTINGS) {
                var oldSettings = _this.settings;
                _this.settings = message.res;
                if (_this.onSettingsChange) {
                    _this.onSettingsChange(oldSettings, _this.settings);
                }
            }
            else if (message.type === MessageType_1.MessageType.EVENTS) {
                if (_this.events[message.id]) {
                    _this.events[message.id](message.res);
                }
            }
        });
    }
    return Plugin;
}());
exports.default = Plugin;
