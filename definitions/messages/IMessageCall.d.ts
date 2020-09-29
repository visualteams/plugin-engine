export interface IMessageCall {
    type: "call";
    id: string;
    method: string;
    data: any;
}
