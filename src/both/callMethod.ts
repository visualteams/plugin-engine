import { ICallFunc } from "../definitions/ICallFunc";
import { MessageType } from "../definitions/messages/MessageType";
import { nanoid } from "nanoid";
import sendMessage from "./sendMessage";
import { IMessageCall } from "../definitions/messages/IMessageCall";

interface ICallbackFunc {
  (err: string, res: any): any;
}

type TCallbacksList = Record<string, ICallbackFunc>;

export const CALLBACKS: TCallbacksList = {};

const callMethod: ICallFunc = async (method, ...args) => {
  return new Promise((resolve, reject) => {
    const id: string = nanoid();

    CALLBACKS[id] = (err, res) => {
      if (err) reject(err);
      else resolve(res);
    };

    const message: IMessageCall = {
      type: MessageType.CALL,
      id,
      method,
      data: args,
    };

    sendMessage(message);
  });
};

export default callMethod;
