import { MessageType } from "./MessageType";
export interface IMessageCall {
    type: MessageType.CALL;
    id: string;
    method: string;
    data: any;
}
