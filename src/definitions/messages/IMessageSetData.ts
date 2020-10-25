import { MessageType } from "./MessageType";
import { IMessageBase } from "./IMessageBase";

export interface IMessageSetData extends IMessageBase {
  type: MessageType.SET_DATA;
  id: string;
  key: string;
  data: string;
}
