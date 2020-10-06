import { MessageType } from "./MessageType";
export declare type IMessageResponse = {
    type: MessageType;
    id: string;
    err: string;
    res: any;
};
