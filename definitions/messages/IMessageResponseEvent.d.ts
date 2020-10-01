import { MessageType } from "./MessageType";
export interface IMessageResponseEvent {
    type: MessageType.EVENTS;
    id: string;
    res: Record<string, any>;
}
