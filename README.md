![VisualTeams](https://www.visualteams.fr/wp-content/uploads/2020/04/path14.png)

# @visualteams/plugin-engine

> Create your own plugin for VisualTeams App !

[![npm package](https://img.shields.io/npm/v/@visualteams/plugin-engine/latest.svg)](https://www.npmjs.com/package/@visualteams/plugin-engine)
[![NPM Downloads](https://img.shields.io/npm/dm/@visualteams/plugin-engine.svg?style=flat)](https://npmcharts.com/compare/@visualteams/plugin-engine?minimal=true)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

## Installation

Follow instructions on [VisualTeams Plugins Documentation]()

## Usage

A VisualTeams Plugin can modify/improve the core module on the server side as well as on the client side

### Server side

Create a server directory which contain the following `index.ts` file.

This is the main file of your server side plugin. You must extends the Plugin class of this package then run a new instance of your class.

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

### registerEvents

The Plugin class provides a method `registerEvents` to add a listener on [VisualTeams Events]()

You can fire yours event or any VisualTeams Event with :

```javascript
import callMethod from "@visualteams/plugin-engine/both/callMethod";

callMethod("plugins.dispatch", "MY_SUPER_SYNC", { myBestArgs: "isHere" });
```

### Client Side

Create a src directory which contain the following `index.js` file.

This file is the mail file of your client side plugin. You must provide your components by specifying an associated route.

```javascript
import provideComponents from "@visualteams/plugin-engine/client/provideComponents";

const Settings = () => <div>Settings Page</div>;

provideComponents([{ route: "settings", component: <Settings /> }]);
```

#### Specific routes

| Route    | Description                                                  |
| -------- | ------------------------------------------------------------ |
| settings | Required if you want provide a page to configure your plugin |

## Helpers

Some helpers are available to communicate with the core module

### getData and setData

The core module provides functions for storing key/value pairs. You can persistently save everything useful for your plugin.

**Available on server and client**

```javascript
import getData from "@visualteams/plugin-engine/both/getData";
import setData from "@visualteams/plugin-engine/both/setData";

// You can save any string un the database. You must stringify your object
setData("settings", JSON.stringify({ myBestSetting: "isStoredHere " }));

// You can get a single value
getData("syncInProgress").then((data) => console.log(data)); // 'true'

// You can get multiple values
getData(/.*logs-.*/i, { multi: true }).then((data) => console.log(data));
/*
[
  {key: "logs-date", value: '{"foo": "bar"}'},
  {key: "logs-date2", value: '{"foo2": "bar2"}'},
]
*/
```

### callMethod

The core module provides a bridge to call method of the [VisualTeams Internal API]()

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

## Contributors

Contributions, issues and feature requests are welcome!
Feel free to check the issues page.

### Code Contributors

[//]: contributor-faces

<a href="https://github.com/Sylchauf"><img src="https://avatars2.githubusercontent.com/u/5569487?v=4" title="Sylchauf" width="80" height="80"></a>

[//]: contributor-faces

### Financial Contributors

<a href="https://github.com/techexmachina"><img src="https://avatars3.githubusercontent.com/u/36532333?v=4" title="Tech Ex Machina" width="80" height="80"></a>

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
