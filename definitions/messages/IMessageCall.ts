export interface MessageCall {
  type: "call";
  id: string;
  method: string;
  data: any;
}
