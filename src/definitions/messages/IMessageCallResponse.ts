export interface IMessageCallResponse {
  type: "call";
  id: string;
  err: string;
  res: any;
}
