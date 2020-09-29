interface ICallbackFunc {
    (err: string, res: any): any;
}
interface ICallFunc {
    (method: string, data: string | number | Record<any, any>, cb: ICallbackFunc): void;
}
declare class Plugin {
    private callbacks;
    constructor();
    call: ICallFunc;
}
export default Plugin;
