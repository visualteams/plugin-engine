"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var react_1 = __importDefault(require("react"));
// @ts-ignore
var react_dom_1 = __importDefault(require("react-dom"));
var MessageHandler_1 = __importDefault(require("./MessageHandler"));
// @ts-ignore
var styles_1 = require("@material-ui/core/styles");
var theme_1 = __importDefault(require("@visualteams/ui-kit/theme"));
var provideComponents = function (config) {
    var routeToDisplay = config.find(function (route) {
        var regex = new RegExp(route.route);
        return regex.test(window.location.pathname);
    });
    react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
        react_1.default.createElement(MessageHandler_1.default, null),
        react_1.default.createElement(styles_1.MuiThemeProvider, { theme: theme_1.default }, routeToDisplay === null || routeToDisplay === void 0 ? void 0 : routeToDisplay.component)), document.getElementById("root"));
};
exports.default = provideComponents;
//# sourceMappingURL=provideComponents.js.map