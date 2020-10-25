import { IMessageBase } from "./IMessageBase";

export interface IMessageProvideComponents extends IMessageBase {
  routes: string[];
}
