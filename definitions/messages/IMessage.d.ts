import { IMessageCall } from "./IMessageCall";
import { IMessageGetData } from "./IMessageGetData";
import { IMessageEventsRegister } from "./IMessageRegisterEvent";
import { IMessageToast } from "./IMessageToast";
import { IMessageSetData } from "./IMessageSetData";
export declare type IMessage = IMessageCall | IMessageGetData | IMessageSetData | IMessageEventsRegister | IMessageToast;
