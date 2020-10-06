import { MessageType } from "./MessageType";
import { ToastLevel } from "../client/ToastLevel";

export interface IMessageToast {
  type: MessageType.TOAST;
  level: ToastLevel;
  message: string;
}
