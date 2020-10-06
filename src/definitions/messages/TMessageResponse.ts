import { MessageType } from "./MessageType";

export type IMessageResponse = {
  type: MessageType;
  id: string;
  err: string;
  res: any;
};
