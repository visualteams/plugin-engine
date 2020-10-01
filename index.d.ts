import { TSettingDeclaration } from "./definitions/settings/TSettingDeclaration";
import { TObjectSetting } from "./definitions/settings/TObjectSetting";
import { TEvents } from "./definitions/events/TEvents";
interface ICallFunc {
    (method: string, data: string | number | Record<any, any>): void;
}
interface IProvideSettingsDeclarationFunc {
    (settings: TSettingDeclaration[]): void;
}
interface IOnSettingsChangeFunc {
    (oldSettings: TObjectSetting, newSettings: TObjectSetting): void;
}
declare class Plugin {
    private callbacks;
    private settings;
    private events;
    constructor();
    onSettingsChange: IOnSettingsChangeFunc;
    private _sendMessage;
    /** Settings */
    getSettings: () => Record<string, string | number | boolean>;
    provideSettingsDeclaration: IProvideSettingsDeclarationFunc;
    /** Events */
    registerEvents: (events: TEvents) => void;
    callMethod: ICallFunc;
}
export default Plugin;
