import { ToastLevel } from "../definitions/client/ToastLevel";
import { MessageType } from "../definitions/messages/MessageType";
import sendMessage from "../both/sendMessage";
import { IMessageToast } from "../definitions/messages/IMessageToast";

const sendToast = (level: ToastLevel, message: string) => {
  const _message: IMessageToast = {
    type: MessageType.TOAST,
    level,
    message,
  };

  sendMessage(_message);
};

export default sendToast;
