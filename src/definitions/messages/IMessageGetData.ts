import { MessageType } from "./MessageType";
import { IMessageBase } from "./IMessageBase";

export interface IMessageGetData extends IMessageBase {
  type: MessageType.GET_DATA;
  id: string;
  key: string | RegExp;
  options: Record<string, any>;
}
