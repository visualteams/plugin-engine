import { TMessage } from "../definitions/messages/TMessage";

const sendMessage = (message: TMessage) => {
  if (typeof window !== "undefined")
    window.parent.postMessage(message, window.parent.origin);
  else process.send(message);
};

export default sendMessage;
