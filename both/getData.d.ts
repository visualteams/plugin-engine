import { IMultipleData } from "../definitions/settings/IMultipleData";
declare type Options = {
    multi: boolean;
};
declare const getData: (key: string | RegExp, options?: Options) => Promise<string | IMultipleData[]>;
export default getData;
