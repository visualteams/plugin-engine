"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var react_1 = require("react");
var callMethod_1 = require("../both/callMethod");
var MessageHandler = function () {
    react_1.useEffect(function () {
        var handleEvent = function (event) {
            var message = event.message, data = event.data;
            var _message = message || data;
            if (callMethod_1.CALLBACKS[_message.id]) {
                callMethod_1.CALLBACKS[_message.id](_message.err, _message.res);
            }
        };
        window.addEventListener("message", handleEvent, false);
        return function () {
            window.removeEventListener("message", handleEvent);
        };
    });
    return null;
};
exports.default = MessageHandler;
//# sourceMappingURL=MessageHandler.js.map