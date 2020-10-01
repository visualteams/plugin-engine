import { MessageType } from "./MessageType";
export interface IMessageResponseGeneric {
    type: MessageType;
    id: string;
    err: string;
    res: any;
}
