import { IMessageCall } from "./IMessageCall";
import { IMessageGetData } from "./IMessageGetData";
import { IMessageEventsRegister } from "./IMessageRegisterEvent";
import { IMessageProvideComponents } from "./IMessageProvideComponents";
import { IMessageSetData } from "./IMessageSetData";
import { IMessageToast } from "./IMessageToast";

export type TMessage =
  | IMessageCall
  | IMessageGetData
  | IMessageEventsRegister
  | IMessageProvideComponents
  | IMessageSetData
  | IMessageToast;
