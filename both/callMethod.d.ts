import { ICallFunc } from "../definitions/ICallFunc";
interface ICallbackFunc {
    (err: string, res: any): any;
}
declare type TCallbacksList = Record<string, ICallbackFunc>;
export declare const CALLBACKS: TCallbacksList;
declare const callMethod: ICallFunc;
export default callMethod;
