import { IMessageMethod } from "./definitions/messages/IMessageMethod";
import { IMessageMethodsRegister } from "./definitions/messages/IMessageRegisterMethod";
import { MessageType } from "./definitions/messages/MessageType";
import { IMessageResponse } from "./definitions/messages/TMessageResponse";
import { TEvents } from "./definitions/events/TEvents";
import sendMessage from "./both/sendMessage";
import { CALLBACKS } from "./both/callMethod";
import { IMessageProvideComponents } from "./definitions/messages/IMessageProvideComponents";
import { TMethods } from "./definitions/methods/TMethods";
import { TWebListeners } from "./definitions/webListeners/TWebListeners";

class Plugin {
  private events: TEvents = {};
  private methods: TMethods = {};
  private webListeners: TWebListeners = {};

  constructor() {
    require("net").createServer().listen();

    process.on("message", (message: IMessageResponse): void => {
      if (CALLBACKS[message.id]) {
        CALLBACKS[message.id](message.err, message.res);
      } else if (message.type === MessageType.EVENTS) {
        if (this.events[message.id]) this.events[message.id](message.res);
      } else if (message.type === MessageType.METHODS) {
        const _message = (message as unknown) as IMessageMethod;
        const methodSplitted = _message.method.split(".");
        methodSplitted.shift();
        const method = methodSplitted.join(".");

        if (this.methods[method]) {
          try {
            this.methods[method](..._message.data).then((res: any) => {
              sendMessage(this._forgeMethodResponse(_message.id, null, res));
            });
          } catch (error) {
            sendMessage(this._forgeMethodResponse(_message.id, error, null));
          }
        }
      } else if (message.type === MessageType.WEB_HOOK) {
        const route = message.res.baseUrl.replace("/weblisteners/", ""); // remove the prefix

        if (this.webListeners[route]) {
          this.webListeners[route](message.res).then((result: any) => {
            sendMessage(this._forgeWebhookResponse(message.id, null, result));
          });
        } else {
          sendMessage(
            this._forgeWebhookResponse(message.id, "Endpoint not found", null)
          );
        }
      }
    });
  }

  private _forgeMethodResponse = (
    id: string,
    err: any,
    res: any
  ): IMessageResponse => {
    return {
      type: MessageType.METHODS,
      id,
      err: err ? JSON.stringify(err) : undefined,
      res: res ? JSON.stringify(res) : undefined,
    };
  };

  private _forgeWebhookResponse = (
    id: string,
    err: any,
    res: any
  ): IMessageResponse => {
    return {
      type: MessageType.WEB_HOOK,
      id,
      err: undefined,
      res: res ? JSON.stringify(res) : undefined,
    };
  };

  registerEvents = (events: TEvents) => {
    this.events = events;
  };

  registerHooks = (routes: string[]) => {
    const message: IMessageProvideComponents = {
      type: MessageType.PROVIDE_COMPONENTS,
      routes,
    };

    sendMessage(message);
  };

  registerMethods = (methods: TMethods) => {
    this.methods = methods;

    const message: IMessageMethodsRegister = {
      type: MessageType.METHODS_REGISTER,
      methodsName: Object.keys(methods),
    };

    sendMessage(message);
  };

  registerWebListeners = (webListeners: any) => {
    this.webListeners = webListeners;
  };
}

export default Plugin;
