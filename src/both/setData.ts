import { MessageType } from "../definitions/messages/MessageType";
import sendMessage from "./sendMessage";
import { CALLBACKS } from "./callMethod";
import { IMessageSetData } from "../definitions/messages/IMessageSetData";
import { nanoid } from "nanoid";

const setData = async (key: string, data: string): Promise<any> => {
  const id: string = nanoid();

  return new Promise((resolve, reject) => {
    CALLBACKS[id] = (err, res) => {
      if (err) reject(err);
      else resolve(res);
    };

    const message: IMessageSetData = {
      type: MessageType.SET_DATA,
      id,
      key,
      data,
    };

    sendMessage(message);
  });
};

export default setData;
