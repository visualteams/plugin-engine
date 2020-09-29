import { TSetting } from "./definitions/settings/TSetting";
import { TObjectSetting } from "./definitions/settings/TObjectSetting";
interface ICallbackFunc {
    (err: string, res: any): any;
}
interface ICallFunc {
    (method: string, data: string | number | Record<any, any>, cb: ICallbackFunc): void;
}
interface IProvideSettingsFunc {
    (settings: TSetting[]): void;
}
interface IOnSettingsChangeFunc {
    (oldSettings: TObjectSetting, newSettings: TObjectSetting): void;
}
declare class Plugin {
    private callbacks;
    settings: TObjectSetting;
    constructor();
    onSettingsChange: IOnSettingsChangeFunc;
    provideSettings: IProvideSettingsFunc;
    call: ICallFunc;
}
export default Plugin;
