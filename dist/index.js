"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nanoid_1 = require("nanoid");
var Plugin = /** @class */ (function () {
    function Plugin() {
        var _this = this;
        this.callbacks = {};
        this.call = function (method, data, cb) {
            var id = nanoid_1.nanoid();
            _this.callbacks[id] = cb;
            if (process === null || process === void 0 ? void 0 : process.send)
                process.send({ type: 'call', id: id, method: method, data: data });
        };
        require('net').createServer().listen();
        process.on('message', function (message) {
            if (message.type === 'call')
                _this.callbacks[message.id](message.err, message.res);
        });
    }
    return Plugin;
}());
exports.default = Plugin;
