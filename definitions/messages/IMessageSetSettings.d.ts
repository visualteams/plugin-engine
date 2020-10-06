import { MessageType } from "./MessageType";
export interface IMessageSetSettings {
    type: MessageType.SET_DATA;
    id: string;
    key: string;
    data: string;
}
