"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MessageType_1 = require("./definitions/messages/MessageType");
var sendMessage_1 = __importDefault(require("./both/sendMessage"));
var callMethod_1 = require("./both/callMethod");
var Plugin = /** @class */ (function () {
    function Plugin() {
        var _this = this;
        this.events = {};
        /** Events */
        this.registerEvents = function (events) {
            _this.events = events;
            var message = {
                type: MessageType_1.MessageType.EVENTS_REGISTER,
                eventsName: Object.keys(events),
            };
            sendMessage_1.default(message);
        };
        require("net").createServer().listen();
        process.on("message", function (message) {
            if (callMethod_1.CALLBACKS[message.id]) {
                callMethod_1.CALLBACKS[message.id](message.err, message.res);
            }
            else if (message.type === MessageType_1.MessageType.EVENTS) {
                if (_this.events[message.id])
                    _this.events[message.id](message.res);
            }
        });
    }
    return Plugin;
}());
exports.default = Plugin;
//# sourceMappingURL=index.js.map