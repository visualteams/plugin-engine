import { IMessageResponseGeneric } from "./IMessageResponseGeneric";
import { IMessageResponseSettings } from "./IMessageResponseSettings";

export type IMessageResponse =
  | IMessageResponseSettings
  | IMessageResponseGeneric;
