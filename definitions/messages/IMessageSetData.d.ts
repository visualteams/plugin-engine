import { MessageType } from "./MessageType";
export interface IMessageSetData {
    type: MessageType.SET_DATA;
    id: string;
    key: string;
    data: string;
}
