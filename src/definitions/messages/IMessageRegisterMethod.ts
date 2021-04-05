import { MessageType } from "./MessageType";
import { IMessageBase } from "./IMessageBase";

export interface IMessageMethodsRegister extends IMessageBase {
  type: MessageType.METHODS_REGISTER;
  methodsName: string[];
}
