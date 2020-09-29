import { nanoid } from "nanoid";

import { TSetting } from "./definitions/settings/TSetting";
import { TObjectSetting } from "./definitions/settings/TObjectSetting";
import { MessageCall } from "./definitions/messages/IMessageCall";
import { MessageResponse } from "./definitions/messages/IMessageResponse";

interface ICallbackFunc {
  (err: string, res: any): any;
}

interface ICallFunc {
  (
    method: string,
    data: string | number | Record<any, any>,
    cb: ICallbackFunc
  ): void;
}

interface IProvideSettingsFunc {
  (settings: TSetting[]): void;
}

interface IOnSettingsChangeFunc {
  (oldSettings: TObjectSetting, newSettings: TObjectSetting): void;
}

type TCallbacksList = Record<string, ICallbackFunc>;

class Plugin {
  private callbacks: TCallbacksList = {};
  public settings: TObjectSetting = {};

  constructor() {
    require("net").createServer().listen();

    process.on("message", (message: MessageResponse): void => {
      if (message.type === "call")
        this.callbacks[message.id](message.err, message.res);
      else if (message.type === "settings") {
        const oldSettings = this.settings;
        this.settings = message.settings;

        if (this.onSettingsChange) {
          this.onSettingsChange(oldSettings, this.settings);
        }
      }
    });
  }

  onSettingsChange: IOnSettingsChangeFunc = () => {};

  provideSettings: IProvideSettingsFunc = (settings) => {
    if (process?.send) process.send({ type: "settings", settings });
  };

  call: ICallFunc = (method, data, cb) => {
    const id: string = nanoid();

    this.callbacks[id] = cb;

    const message: MessageCall = { type: "call", id, method, data };

    if (process?.send) process.send(message);
  };
}

export default Plugin;
