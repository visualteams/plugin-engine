import { MessageType } from "./MessageType";

export interface IMessageEventsRegister {
  type: MessageType.EVENTS_REGISTER;
  eventsName: string[];
}
