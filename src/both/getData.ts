import { MessageType } from "../definitions/messages/MessageType";
import sendMessage from "./sendMessage";
import { IMessageGetData } from "../definitions/messages/IMessageGetData";
import { CALLBACKS } from "./callMethod";
import { nanoid } from "nanoid";
import { IMultipleData } from "../definitions/settings/IMultipleData";

type Options = {
  multi: boolean;
};

const getData = async (
  key: string | RegExp,
  options: Options = {
    multi: false,
  }
): Promise<string | IMultipleData[]> => {
  const id: string = nanoid();

  return new Promise((resolve, reject) => {
    CALLBACKS[id] = (err, res) => {
      if (err) reject(err);
      else resolve(res);
    };

    const message: IMessageGetData = {
      type: MessageType.GET_DATA,
      id,
      key,
      options,
    };

    sendMessage(message);
  });
};

export default getData;
