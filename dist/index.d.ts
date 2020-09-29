interface ICallbackFunc {
    (err: string, res: any): any;
}
interface ICallFunc {
    (method: string, data: string | number | Record<any, any>, cb: ICallbackFunc): void;
}
declare type TSetting = {
    id: string;
    i18nLabel: string;
    i18nDescription: string;
    required: boolean;
    type: 'string' | 'boolean' | 'number';
};
interface IProvideSettingsFunc {
    (settings: TSetting[]): void;
}
export interface IConfiguration {
    settings: {
        provideSettings: IProvideSettingsFunc;
    };
}
declare class Plugin {
    private callbacks;
    configuration: IConfiguration;
    constructor();
    _provideSettings: (settings: TSetting[]) => void;
    call: ICallFunc;
}
export declare const SettingType: {
    STRING: string;
    BOOLEAN: string;
    NUMBER: string;
};
export default Plugin;
