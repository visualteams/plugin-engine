"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nanoid_1 = require("nanoid");
var Plugin = /** @class */ (function () {
    function Plugin() {
        var _this = this;
        this.callbacks = {};
        this.settings = {};
        this.onSettingsChange = function () { };
        this.provideSettings = function (settings) {
            if (process === null || process === void 0 ? void 0 : process.send)
                process.send({ type: "settings", settings: settings });
        };
        this.call = function (method, data, cb) {
            var id = nanoid_1.nanoid();
            _this.callbacks[id] = cb;
            var message = { type: "call", id: id, method: method, data: data };
            if (process === null || process === void 0 ? void 0 : process.send)
                process.send(message);
        };
        require("net").createServer().listen();
        process.on("message", function (message) {
            if (message.type === "call")
                _this.callbacks[message.id](message.err, message.res);
            else if (message.type === "settings") {
                var oldSettings = _this.settings;
                _this.settings = message.settings;
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