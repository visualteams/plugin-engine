import { MessageType } from "./definitions/messages/MessageType";
import { IMessageResponse } from "./definitions/messages/TMessageResponse";
import { TEvents } from "./definitions/events/TEvents";
import sendMessage from "./both/sendMessage";
import { CALLBACKS } from "./both/callMethod";
import { IMessageEventsRegister } from "./definitions/messages/IMessageRegisterEvent";

class Plugin {
  private events: TEvents = {};

  constructor() {
    require("net").createServer().listen();

    process.on("message", (message: IMessageResponse): void => {
      if (CALLBACKS[message.id]) {
        CALLBACKS[message.id](message.err, message.res);
      } else if (message.type === MessageType.EVENTS) {
        if (this.events[message.id]) this.events[message.id](message.res);
      }
    });
  }

  /** Events */
  registerEvents = (events: TEvents) => {
    this.events = events;

    const message: IMessageEventsRegister = {
      type: MessageType.EVENTS_REGISTER,
      eventsName: Object.keys(events),
    };

    sendMessage(message);
  };
}

export default Plugin;
