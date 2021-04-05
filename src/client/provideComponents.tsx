// @ts-ignore
import React from "react";
// @ts-ignore
import ReactDOM from "react-dom";
import { TComponentRoute } from "../definitions/client/TComponentRoute";
import MessageHandler from "./MessageHandler";
// @ts-ignore
import { MuiThemeProvider } from "@material-ui/core/styles";
// @ts-ignore
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "@visualteams/ui-kit/theme";

const provideComponents = (config: TComponentRoute[]) => {
  const routeToDisplay = config.find((route) => {
    const regex = new RegExp(route.route);

    return regex.test(window.location.pathname);
  });

  // We force transparent background to avoid CSS issue zhen the component is loaded in cards
  theme.palette.background.default = "transparent";

  ReactDOM.render(
    <React.StrictMode>
      <MessageHandler />
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {routeToDisplay?.component}
      </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

export default provideComponents;
