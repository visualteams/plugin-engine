import { IMessage } from "../definitions/messages/IMessage";

const sendMessage = (message: IMessage) => {
  if (typeof window !== "undefined")
    window.parent.postMessage(message, window.parent.origin);
  else process.send(message);
};

export default sendMessage;
