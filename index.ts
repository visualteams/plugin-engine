import { nanoid } from "nanoid";

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

type TSetting = {
  id: string;
  i18nLabel: string;
  i18nDescription: string;
  required: boolean;
  type: "string" | "boolean" | "number";
};

interface IProvideSettingsFunc {
  (settings: TSetting[]): void;
}

type TCallbacksList = Record<string, ICallbackFunc>;

class Plugin {
  private callbacks: TCallbacksList = {};
  public settings: Record<string, string | boolean | number> = {};

  constructor() {
    require("net").createServer().listen();

    process.on("message", (message) => {
      if (message.type === "call")
        this.callbacks[message.id](message.err, message.res);
    });
  }

  provideSettings: IProvideSettingsFunc = (settings) => {
    if (process?.send) process.send({ type: "settings", settings });
  };

  call: ICallFunc = (method, data, cb) => {
    const id: string = nanoid();

    this.callbacks[id] = cb;

    if (process?.send) process.send({ type: "call", id, method, data });
  };
}

export const SettingType = {
  STRING: "string",
  BOOLEAN: "boolean",
  NUMBER: "number",
};

export default Plugin;
