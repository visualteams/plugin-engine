export interface MessageCallResponse {
  type: "call";
  id: string;
  err: string;
  res: any;
}
