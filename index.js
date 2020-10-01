"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nanoid_1 = require("nanoid");
var MessageType_1 = require("./definitions/messages/MessageType");
var Plugin = /** @class */ (function () {
    function Plugin() {
        var _this = this;
        this.callbacks = {};
        this.settings = {};
        this.onSettingsChange = function () { };
        this.provideSettings = function (settings) {
            var message = {
                type: MessageType_1.MessageType.SETTINGS,
                settings: settings,
            };
            if (process === null || process === void 0 ? void 0 : process.send)
                process.send(message);
        };
        this.call = function (method, data, cb) {
            var id = nanoid_1.nanoid();
            _this.callbacks[id] = cb;
            var message = { type: MessageType_1.MessageType.CALL, id: id, method: method, data: data };
            if (process === null || process === void 0 ? void 0 : process.send)
                process.send(message);
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
        });
    }
    return Plugin;
}());
exports.default = Plugin;
//# sourceMappingURL=index.js.map