import { MessageType } from "./MessageType";
import { IMessageBase } from "./IMessageBase";

export interface IMessageEventsRegister extends IMessageBase {
  type: MessageType.EVENTS_REGISTER;
  eventsName: string[];
}
