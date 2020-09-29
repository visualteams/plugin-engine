import { nanoid } from "nanoid";

import { TSettingDeclaration } from "./definitions/settings/TSettingDeclaration";
import { TObjectSetting } from "./definitions/settings/TObjectSetting";
import { IMessageCall } from "./definitions/messages/IMessageCall";
import { MessageType } from "./definitions/messages/MessageType";
import { IMessageSettings } from "./definitions/messages/IMessageSettings";
import { IMessageResponse } from "./definitions/messages/TMessageResponse";

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
  (settings: TSettingDeclaration[]): void;
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

    process.on("message", (message: IMessageResponse): void => {
      if (message.type === MessageType.CALL)
        this.callbacks[message.id](message.err, message.res);

      else if (message.type === MessageType.SETTINGS) {
        const oldSettings = this.settings;
        this.settings = message.res;

        if (this.onSettingsChange) {
          this.onSettingsChange(oldSettings, this.settings);
        }
      }
    });
  }

  onSettingsChange: IOnSettingsChangeFunc = () => {};

  provideSettings: IProvideSettingsFunc = (settings) => {
    const message: IMessageSettings = {
      type: MessageType.SETTINGS,
      settings,
    };

    if (process?.send) process.send(message);
  };

  call: ICallFunc = (method, data, cb) => {
    const id: string = nanoid();

    this.callbacks[id] = cb;

    const message: IMessageCall = { type: MessageType.CALL, id, method, data };

    if (process?.send) process.send(message);
  };
}

export default Plugin;
