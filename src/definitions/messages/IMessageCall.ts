import { MessageType } from "./MessageType";
import { IMessageBase } from "./IMessageBase";

export interface IMessageCall extends IMessageBase {
  type: MessageType.CALL;
  id: string;
  method: string;
  data: any;
}
