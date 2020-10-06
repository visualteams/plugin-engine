import { MessageType } from "./MessageType";
export interface IMessageResponseSettings {
    type: MessageType.GET_SETTINGS;
    id: string;
    err: string;
    res: string;
}
