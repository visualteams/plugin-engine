import { MessageType } from "./MessageType";
import { TObjectSetting } from "../settings/TObjectSetting";

export interface IMessageResponseSettings {
  type: MessageType.SETTINGS;
  id: string;
  err: string;
  res: TObjectSetting[];
}
