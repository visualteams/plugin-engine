import { MessageType } from "./MessageType";
import { TSettingDeclaration } from "../settings/TSettingDeclaration";
export interface IMessageSettings {
    type: MessageType.SETTINGS;
    settings: TSettingDeclaration[];
}
