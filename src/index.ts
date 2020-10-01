import { nanoid } from "nanoid";

import { TSettingDeclaration } from "./definitions/settings/TSettingDeclaration";
import { TObjectSetting } from "./definitions/settings/TObjectSetting";
import { IMessageCall } from "./definitions/messages/IMessageCall";
import { MessageType } from "./definitions/messages/MessageType";
import { IMessageSettings } from "./definitions/messages/IMessageSettings";
import { IMessageResponse } from "./definitions/messages/TMessageResponse";
import { TEvents } from "./definitions/events/TEvents";

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

interface IProvideSettingsDeclarationFunc {
  (settings: TSettingDeclaration[]): void;
}

interface IOnSettingsChangeFunc {
  (oldSettings: TObjectSetting, newSettings: TObjectSetting): void;
}

type TCallbacksList = Record<string, ICallbackFunc>;

class Plugin {
  private callbacks: TCallbacksList = {};
  private settings: TObjectSetting = {};
  private events: TEvents = {};

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
      } else if (message.type === MessageType.EVENTS) {
        if (this.events[message.id]) {
          this.events[message.id](message.res);
        }
      }
    });
  }

  onSettingsChange: IOnSettingsChangeFunc = () => {};

  private _sendMessage = <T>(message: T) => {
    if (process?.send) process.send(message);
  };

  /** Settings */
  getSettings = () => this.settings;

  provideSettingsDeclaration: IProvideSettingsDeclarationFunc = (
    settingsDeclaration
  ) => {
    this._sendMessage<IMessageSettings>({
      type: MessageType.SETTINGS,
      settingsDeclaration,
    });
  };

  /** Events */
  registerEvents = (events: TEvents) => {
    this.events = events;

    this._sendMessage({
      type: MessageType.EVENTS_REGISTER,
      eventsName: Object.keys(events),
    });
  };

  call: ICallFunc = (method, data, cb) => {
    const id: string = nanoid();

    this.callbacks[id] = cb;

    this._sendMessage<IMessageCall>({
      type: MessageType.CALL,
      id,
      method,
      data,
    });
  };
}

export default Plugin;
