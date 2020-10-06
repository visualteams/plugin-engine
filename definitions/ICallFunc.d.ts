export interface ICallFunc {
    (method: string, ...args: any[]): Promise<any>;
}
