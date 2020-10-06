// @ts-ignore
import React from "react";
// @ts-ignore
import ReactDOM from "react-dom";
import { TComponentRoute } from "../definitions/client/TComponentRoute";
import MessageHandler from "./MessageHandler";
// @ts-ignore
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "@visualteams/ui-kit/theme";

const provideComponents = (config: TComponentRoute[]) => {
  const routeToDisplay = config.find((route) => {
    const regex = new RegExp(route.route);

    return regex.test(window.location.pathname);
  });

  ReactDOM.render(
    <React.StrictMode>
      <MessageHandler />
      <MuiThemeProvider theme={theme}>
        {routeToDisplay?.component}
      </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

export default provideComponents;
