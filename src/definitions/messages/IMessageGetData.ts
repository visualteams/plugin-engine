import { MessageType } from "./MessageType";

export interface IMessageGetData {
  type: MessageType.GET_DATA;
  id: string;
  key: string | RegExp;
  options: Record<string, any>;
}
