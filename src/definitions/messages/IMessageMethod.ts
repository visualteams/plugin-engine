import { MessageType } from "./MessageType";
import { IMessageBase } from "./IMessageBase";

export interface IMessageMethod extends IMessageBase {
  type: MessageType.METHODS;
  id: string;
  method: string;
  data: any;
}
