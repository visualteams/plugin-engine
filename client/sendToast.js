"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MessageType_1 = require("../definitions/messages/MessageType");
var sendMessage_1 = __importDefault(require("../both/sendMessage"));
var sendToast = function (level, message) {
    var _message = {
        type: MessageType_1.MessageType.TOAST,
        level: level,
        message: message,
    };
    sendMessage_1.default(_message);
};
exports.default = sendToast;
//# sourceMappingURL=sendToast.js.map