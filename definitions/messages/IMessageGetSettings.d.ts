import { MessageType } from "./MessageType";
export interface IMessageGetSettings {
    type: MessageType.GET_DATA;
    id: string;
    key: string;
}
