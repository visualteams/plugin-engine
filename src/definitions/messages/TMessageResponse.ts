import { IMessageResponseGeneric } from "./IMessageResponseGeneric";
import { IMessageResponseSettings } from "./IMessageResponseSettings";
import { IMessageResponseEvent } from "./IMessageResponseEvent";

export type IMessageResponse =
  | IMessageResponseSettings
  | IMessageResponseEvent
  | IMessageResponseGeneric;
