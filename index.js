"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nanoid_1 = require("nanoid");
var MessageType_1 = require("./definitions/messages/MessageType");
var Plugin = /** @class */ (function () {
    function Plugin() {
        var _this = this;
        this.callbacks = {};
        this.settings = {};
        this.events = {};
        this.onSettingsChange = function () { };
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
        this.call = function (method, data, cb) {
            var id = nanoid_1.nanoid();
            _this.callbacks[id] = cb;
            _this._sendMessage({
                type: MessageType_1.MessageType.CALL,
                id: id,
                method: method,
                data: data,
            });
        };
        require("net").createServer().listen();
        process.on("message", function (message) {
            if (message.type === MessageType_1.MessageType.CALL)
                _this.callbacks[message.id](message.err, message.res);
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
//# sourceMappingURL=index.js.map