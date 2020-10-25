import { MessageType } from "./MessageType";
import { ToastLevel } from "../client/ToastLevel";
import { IMessageBase } from "./IMessageBase";

export interface IMessageToast extends IMessageBase {
  type: MessageType.TOAST;
  level: ToastLevel;
  message: string;
}
