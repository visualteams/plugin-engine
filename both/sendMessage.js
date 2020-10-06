"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sendMessage = function (message) {
    if (typeof window !== "undefined")
        window.parent.postMessage(message, window.parent.origin);
    else
        process.send(message);
};
exports.default = sendMessage;
//# sourceMappingURL=sendMessage.js.map