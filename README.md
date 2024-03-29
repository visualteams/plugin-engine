![VisualTeams](https://www.visualteams.fr/images/logo.png)

# @visualteams/plugin-engine

> Create your own plugin for VisualTeams App !

[![npm package](https://img.shields.io/npm/v/@visualteams/plugin-engine/latest.svg)](https://www.npmjs.com/package/@visualteams/plugin-engine)
[![NPM Downloads](https://img.shields.io/npm/dm/@visualteams/plugin-engine.svg?style=flat)](https://npmcharts.com/compare/@visualteams/plugin-engine?minimal=true)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

## Installation

Follow instructions on [VisualTeams Plugins Documentation](https://documentation.visualteams.eu)

## Usage

A VisualTeams Plugin can modify/improve the core module on the server side as well as on the client side

### Server side

Create a server directory which contains the following `index.ts` file.

This is the main file of your server side plugin. You must extend the Plugin class of this package then run a new instance of your class.

```javascript
import Plugin from "@visualteams/plugin-engine";

class ExamplePlugin extends Plugin {
  constructor() {
    super();

    this.registerEvents({
      MY_SUPER_SYNC: this.sync,
    });
  }

  sync() {
    console.log("Hello world !");
  }
}

new ExamplePlugin();
```

#### registerEvents

The Plugin class provides a method `registerEvents` to add a listener on [VisualTeams Events](https://documentation.visualteams.eu/plugins/events) or to add a listener on your specific event.

```javascript
this.registerEvents({
  MY_SUPER_SYNC: this.sync,
});
```

You can fire your event or any VisualTeams Event with :

```javascript
import callMethod from "@visualteams/plugin-engine/both/callMethod";

callMethod("plugins.dispatch", "MY_SUPER_SYNC", { myBestArgs: "isHere" });
```

#### registerHooks

The Plugin class provides / (supplies) a method `registerHooks` to attach a component to VisualTeams UI. Follow this link [VisualTeams Hooks](https://documentation.visualteams.eu/plugins/hooks) to see a list of all available hooks.

```javascript
import { Hooks } from "@visualteams/plugin-engine/definitions/hooks";

this.registerHooks([Hooks.ProjectConfiguration]);
```

Be careful, you must register your hooks on the server side **and** you must pass in `provideComponents` on the client side too.

#### registerMethods

You can register your module specific method to :

- Exchange data between your server side module and your client side module
- Let others modules to ask data or make actions in your module.

```javascript
this.registerMethods({
  getAccessToken: this.getAccessToken,
});
```

All of your methods will be available in the VisualTeams instance with your module name as prefix

You can call your method or others plugins methods with the following code :

```javascript
import callMethod from "@visualteams/plugin-engine/both/callMethod";

callMethod("PLUGIN_NAME.getAccessToken", {
  email: "email",
  password: "password",
});
```

See the callMethod documentation for more details

#### registerWebListeners

You can register web listeners from your plugin to stay in touch in real time from another service (webhooks)

```javascript
this.registerMethods({
  notifications: async (req) => {
    console.log(req); // The request and params associated

    return {
      statusCode: 200,
      body: "Hello World !",
    };
  },
});
```

Your web listener is available ac `https://app.visualteams.fr/plugins/PLUGIN_NAME/weblisteners/TEAM_ID/notifications`

Note :

- Your function must return a promise which resolve to the following object :
- The teamId is available in `process.env.teamId`

```javascript
{
  "statusCode": YOUR_HTTP_CODE_RESULT,
  "body": "YOUR_HTTP_BODY_RESULT"
}
```

### Client Side

#### provideComponents

Create a src directory which contain the following `index.js` file.

This file is the main file of your client side plugin. You must provide your components by specifying an associated route.

```javascript
import provideComponents from "@visualteams/plugin-engine/client/provideComponents";
import { Hooks } from "@visualteams/plugin-engine/definitions/hooks";

const Settings = () => <div>Settings Page</div>;
const HookProjectConfiguration = () => (
  <div>Attach my component to VisualTeams UI</div>
);
provideComponents([
  { route: "settings", component: <Settings /> },
  {
    route: Hooks.ProjectConfiguration,
    component: <HookProjectConfiguration />,
  },
]);
```

Be careful, all hooks must be also registered with `registerHooks` on the server side

Your route will be available on `/embed/plugins/PLUGIN_NAME/YOUR_ROUTE_NAME` and you must use `getParams` to get the querystring

#### Specific routes

All routes associated at a hookname is reserved and can not be used.

There are also some route to provide some specific functionality :

| Route    | Description                                                  |
| -------- | ------------------------------------------------------------ |
| settings | Required if you want provide a page to configure your plugin |

## Helpers

Some helpers are available to communicate easily with the core module

### getData and setData

The core module provides functions for storing key/value pairs. You can persistently save everything useful for your plugin.

**Available on server and client**

```javascript
import getData from "@visualteams/plugin-engine/both/getData";
import setData from "@visualteams/plugin-engine/both/setData";

// You can save any string in the database. You must stringify your object
setData("settings", JSON.stringify({ myBestSetting: "isStoredHere" }));

// You can get a single value
getData("syncInProgress").then((data) => console.log(data)); // 'true'

// You can get multiple values using regex
getData(".*logs-.*", { multi: true }).then((data) => console.log(data));
/*
[
  {key: "logs-date", value: '{"foo": "bar"}'},
  {key: "logs-date2", value: '{"foo2": "bar2"}'},
]
*/
```

Your data can be protected from a fetch in client side. Add `private.` in front of your variable name

```javascript
// Server side
setData("private.var_name", "secret");
getData("private.var_name"); // secret

// Client side
getData("private.var_name").then((data) => console.log(data)); // throw error
getData(/.*\.var_name/i).then((data) => console.log(data)); // return empty array
setData("private.var_name", "try to override"); // throw error
```

If you want to remove your key/value, simply setData with empty string

```javascript
setData("private.token", "");
```

### callMethod

The core module provides a bridge to call method of the [VisualTeams Internal API]() or others plugins methods

**Available on server and client**

```javascript
import callMethod from "@visualteams/plugin-engine/both/callMethod";

const invoiceObject = {
  /* TInvoiceObject */
};

callMethod("invoices.add", invoiceObject)
  .then(() => console.log("Success !"))
  .catch(() => console.error("Failed !"));
```

### sendToast

You can use the toaster of the core module to keep in touche the user

**Available on client only**

```javascript
import sendToast from "@visualteams/plugin-engine/client/sendToast";
import { ToastLevel } from "@visualteams/plugin-engine/definitions/client/ToastLevel";

// Send a success message
sendToast(ToastLevel.SUCCESS, "Saved");

// Send an error message
sendToast(ToastLevel.ERROR, "Failed");
```

### getParams

When you register some hooks to attach component, the server may send context to your component. This helper will return an object which can help you to do its work

```javascript
import getParams from "@visualteams/plugin-engine/client/getParams";

const params = getParams();

console.log(params); // { projectId: '42' }
```

**Available on client only**

## Contributors

Contributions, issues and feature requests are welcome!
Feel free to check the issues page.

### Code Contributors

[//]: contributor-faces

<a href="https://github.com/Sylchauf"><img src="https://avatars.githubusercontent.com/u/5569487?v=4" title="Sylchauf" width="80" height="80"></a>

[//]: contributor-faces

### Financial Contributors

<a href="https://github.com/techexmachina"><img src="https://avatars3.githubusercontent.com/u/36532333?v=4" title="Tech Ex Machina" width="80" height="80"></a>

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
