import { IMessageCall } from "./IMessageCall";
import { IMessageGetData } from "./IMessageGetData";
import { IMessageProvideComponents } from "./IMessageProvideComponents";
import { IMessageMethodsRegister } from "./IMessageRegisterMethod";
import { IMessageSetData } from "./IMessageSetData";
import { IMessageToast } from "./IMessageToast";
import { IMessageResponse } from "./TMessageResponse";

export type TMessage =
  | IMessageCall
  | IMessageGetData
  | IMessageMethodsRegister
  | IMessageProvideComponents
  | IMessageSetData
  | IMessageToast
  | IMessageResponse;
